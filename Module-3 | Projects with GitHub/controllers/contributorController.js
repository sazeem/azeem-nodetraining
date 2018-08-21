const Request = require("request");
const contributors = require('../models/contributorModel');
const repos = require('../models/repoModel');
const contributor = require('../models/contributorModel');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const _ = require('lodash');


exports.contributorList = (req,res) => {
  contributors.findAll().then(contributors => {
    res.send(contributors);
  });
}

exports.getContributorList = (req,res) => {
  contributors.findAll()
   .then((contributors) => requestGitHub(contributors,req,res) );
}

const requestGitHub = (contributors,req,res) => {
  const token = req.headers['authorization'];
  const login = req.body.userName;
  const repoName = req.body.repoName;

  let repoList = [];
  let ownerList = [];

  _.forEach(contributors,(value) => {
    repoList.push(value.dataValues.repo_name);
    ownerList.push(value.dataValues.name);
  });

  if(!(_.includes(ownerList,login)) || !(_.includes(repoList,repoName)) || (contributors.length == 0)){
    Request.get({
      "headers": { "content-type" : "application/json", "User-Agent":login, "Authorization" : token },
      "url": "https://api.github.com/repos/"+ login +"/"+ repoName +"/contributors"
    },(error, response, body) => {        
      if(error) {
        res.status(400).send(error);
        return;
      }
      const myResponse = JSON.parse(body);  

      repos.findAll({
        attributes:["id"],
        where:{ name: repoName}
      }).then((repos) => storeContributors(repos,myResponse,repoName,res));          
    });
  }
  else{
    res.send(contributors);  
  }
};

const storeContributors = (repos,myResponse,repoName,res) => {
  let myContributors = mapper(myResponse,repos,repoName,res);

  contributor.bulkCreate(myContributors)
   .then(() => {
    if(myContributors.length == 0){
      res.status(400).send(myResponse);
    }
    else{
      console.log("Contributors Added!");
      res.status(201).send(myContributors);
    }             
   })
   .catch((err) =>{
    res.status(400).send(err);
   });
};

const mapper = (repository,repos,repoName,res) => {
  let newRepository = [];
  try{
    _.forEach(repository,(value) => {
      let obj = {};
      obj.id = value.id;
      obj.name = value.login;              
      obj.repo_name = repoName;
      obj.repo_id = repos[0].dataValues.id;
      newRepository.push(obj);
    });
    return newRepository;
  }
  catch{
    if(Object.keys(repository[0]).length > 2)
      res.status(400).send("Repository Doesn't Exist in database!");
  }
  finally{
    return newRepository;
  }
};
