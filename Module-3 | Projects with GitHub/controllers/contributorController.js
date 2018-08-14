const Request = require("request");
const contributors = require('../models/contributorModel');
const repos = require('../models/repoModel');
const contributor = require('../models/contributorModel');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const _ = require('lodash');

exports.contributorList = (req,res) => {
  const token = req.headers['campaign'];
  const login = req.params.login;
  const repo = req.params.repo;
  
  contributors.findAll().then(contributors => {
    if(contributors.length == 0){
        Request.get({     
          "headers": { "content-type" : "application/json", "User-Agent":login, "Authorization" : token },
          "url": "https://api.github.com/repos/"+ login +"/"+ repo +"/contributors"
        },(error, response, body) => {
          if(error) {
            return console.dir(error);
          }
          const my_response = JSON.parse(body);          
          repos.findAll({
            attributes:["id"],
            where:{ name: repo}
          }).then(repos => {            
            const my_function = (repository) => {
            let new_repository = [];
            _.forEach(repository, function(value) {
              let obj = {};
              obj.id = value.id;
              obj.name = value.login;
              obj.repo_id = repos[0].dataValues.id;
              new_repository.push(obj);
            });
            return new_repository;
            };
            const my_repos = my_function(my_response);
            console.log(my_repos);
            contributor.bulkCreate(my_repos)
             .then(() => {
              console.log("Contributors Added!");
              res.send(my_response);
             })
             .catch((err) =>{
              res.status(400).send(err);
             });
          });          
        });
    }
    else
      res.send(contributors);
  });
  
}


exports.commitList = (req,res) => {
  
  
  commits.findAll().then(commits => {
    
  });  
}
