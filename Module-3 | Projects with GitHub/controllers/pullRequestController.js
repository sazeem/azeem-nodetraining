const Request = require("request");
const pullRequests = require('../models/pullRequestModel');
const repos = require('../models/repoModel');
const pullRequest = require('../models/pullRequestModel');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const _ = require('lodash');

exports.pullRequestList = (req,res) => {
  pullRequests.findAll().then(pullRequests => {
    res.send(pullRequests);
  });
}

exports.getPullRequestList = (req,res) => {
  pullRequests.findAll()
   .then((pullRequests) => requestGitHub(pullRequests,req,res));
}

const requestGitHub = (pullRequests,req,res) => {
  const token = req.headers['authorization'];
  const login = req.body.userName;
  const repoName = req.body.repoName;  
 
  let repoList = [];
  let ownerList = [];

  _.forEach(pullRequests,(value) => {
    repoList.push(value.dataValues.repo_name);
    ownerList.push(value.dataValues.user_name);
  });

  if(!(_.includes(ownerList,login)) || !(_.includes(repoList,repoName)) || (pullRequests.length == 0)){
    Request.get({     
      "headers": { "content-type" : "application/json", "User-Agent":login, "Authorization" : token },
      "url": "https://api.github.com/repos/"+ login +"/"+ repoName +"/pulls"
    },(error, response, body) => {
      if(error) {
        res.status(400).send(err);
        return;
      }
      const myResponse = JSON.parse(body);  
      
      repos.findAll({
        attributes:["id"],
        where:{ name: repoName}
      }).then((repos) => storePullRequests(repos,myResponse,repoName,res));          
    });
  }
  else{
    res.send(pullRequests);  
  }
};

const storePullRequests = (repos,myResponse,repoName,res) => { 
  let myPullRequests = mapper(myResponse,repos,repoName,res);

  pullRequest.bulkCreate(myPullRequests)
   .then(() => {
    if(myPullRequests.length == 0){
      res.status(200).send("Oh.Uh. No Pull Requests Yet!");
    }
    else{
      console.log("Pull Requests Added!");
      res.status(201).send(myPullRequests);
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
      obj.number = value.number;
      obj.user_id = value.user.id;
      obj.user_name = value.user.login;
      obj.repo_id = repos[0].dataValues.id;
      obj.repo_name = repoName;
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
