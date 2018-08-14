const Request = require("request");
const pullRequests = require('../models/pullRequestModel');
const pullRequest = require('../models/pullRequestModel');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const _ = require('lodash');


exports.pullRequestList = (req,res) => {
  
  const token = req.headers['campaign'];
  const login = req.params.login;
  const repo = req.params.repo;
  
  pullRequests.findAll().then(pullRequests => {
    if(pullRequests.length == 0){
        Request.get({     
          "headers": { "content-type" : "application/json", "User-Agent":login, "Authorization" : token },
          "url": "https://api.github.com/repos/"+ login +"/"+ repo +"/pulls"
        },(error, response, body) => {
          if(error) {
            return console.dir(error);
          }
          const my_response = JSON.parse(body);        
          const my_function = (repository) => {
          let new_repository = [];
          _.forEach(repository, function(value) {
            let obj = {};
            obj.id = value.id;
            obj.number = value.number;
            obj.user_id = value.user.id;
            obj.repo_name = repo;
            new_repository.push(obj);
          });
          return new_repository;
        };
        const my_repos = my_function(my_response);
        pullRequest.bulkCreate(my_repos)
         .then(() => {
          console.log("Pull Requests Added!");
          res.send(my_response);
         })
         .catch((err) =>{
          res.status(400).send(err.parent.detail);
         });
      });
    }
    else
      res.send(pullRequests);
  });  
}
