const Request = require("request");
const commits = require('../models/commitModel');
const commit = require('../models/commitModel');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const _ = require('lodash');


exports.commitList = (req,res) => {
  
  const token = req.headers['campaign'];
  const login = req.params.login;
  const repo = req.params.repo;
  
  commits.findAll().then(commits => {
    if(commits.length == 0){
        Request.get({     
          "headers": { "content-type" : "application/json", "User-Agent":login, "Authorization" : token },
          "url": "https://api.github.com/repos/"+ login +"/"+ repo +"/commits"
        },(error, response, body) => {
          if(error) {
            return console.dir(error);
          }
          const my_response = JSON.parse(body);        
          const my_function = (repository) => {
          let new_repository = [];
          _.forEach(repository, function(value) {
            let obj = {};
            obj.id = value.sha;
            obj.committer = value.commit.committer.name;
            obj.message = value.commit.message;
            obj.repo_name = repo;
            new_repository.push(obj);
          });
          return new_repository;
        };
        const my_repos = my_function(my_response);
        commit.bulkCreate(my_repos)
         .then(() => {
          console.log("Commits Added!");
          res.send(my_response);
         })
         .catch((err) =>{
          res.status(400).send(err.parent.detail);
         });
      });
    }
    else
      res.send(commits);
  });  
}
