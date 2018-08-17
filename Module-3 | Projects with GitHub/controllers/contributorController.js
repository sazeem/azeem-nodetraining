const Request = require("request");
const contributors = require('../models/contributorModel');
const repos = require('../models/repoModel');
const contributor = require('../models/contributorModel');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const _ = require('lodash');

exports.getContributorList = (req,res) => {

  const token = req.headers['authorization'];
  const login = req.body.userName;
  const repoName = req.body.repoName;

  let repoList = [];
  let ownerList = [];
 
  contributors.findAll()
   .then((contributors) => {
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
          return console.dir(error);
        }
        const myResponse = JSON.parse(body);  

        repos.findAll({
          attributes:["id"],
          where:{ name: repoName}
        }).then((repos) => {                
          const mapper = (repository) => {
            try{
              let newRepository = [];
              _.forEach(repository, function(value) {
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
              res.status(400).send("Error in Request!");
            }
          };

          let myContributors = mapper(myResponse);

          contributor.bulkCreate(myContributors)
           .then(() => {
            console.log("Contributors Added!");
            res.status(201).send(myContributors);
           })
           .catch((err) =>{
            res.status(400).send(err);
           });
        });          
      });
    }
    else{
      res.send(contributors);  
    }
  });
}
exports.contributorList = (req,res) => {
  contributors.findAll().then(contributors => {
    res.send(contributors);
  });
}