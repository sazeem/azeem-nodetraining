const Request = require("request");
const pullRequests = require('../models/pullRequestModel');
const repos = require('../models/repoModel');
const pullRequest = require('../models/pullRequestModel');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const _ = require('lodash');


exports.pullRequestList = (req,res) => {

  const token = req.headers['authorization'];
  const login = req.params.login;
  const repo = req.params.repo;

  let repo_name = [];
  let owner_name = [];
 
  pullRequests.findAll()
   .then((pullRequests) => {
    _.forEach(pullRequests,(value) => {
      repo_name.push(value.dataValues.repo_name);
      owner_name.push(value.dataValues.user_name);
    });
    if(!(_.includes(owner_name,login)) || !(_.includes(repo_name,repo)) || (pullRequests.length == 0)){
      Request.get({     
        "headers": { "content-type" : "application/json", "User-Agent":login, "Authorization" : token },
        "url": "https://api.github.com/repos/"+ login +"/"+ repo +"/pulls"
      },(error, response, body) => {
        if(error) {
          return console.dir(error);
        }
        const my_response = JSON.parse(body);  
        
        repos.findAll({
          attributes:["id"],
          where:{ name: repo}
        }).then((repos) => {                
          const my_repos = (repository) => {
            let new_repository = [];
            _.forEach(repository, function(value) {
              let obj = {};
              obj.id = value.id;
              obj.number = value.number;
              obj.user_id = value.user.id;
              obj.user_name = value.user.login;
              obj.repo_id = repos[0].dataValues.id;
              obj.repo_name = repo;
              new_repository.push(obj);
            });
            return new_repository;
          };
          pullRequest.bulkCreate(my_repos(my_response))
           .then(() => {
            console.log("Pull Requests Added!");
            res.send(my_response);
           })
           .catch((err) =>{
            res.status(400).send(err);
           });
        });          
      });
    }
    else{
      res.send(pullRequests);  
    }
  });
}

