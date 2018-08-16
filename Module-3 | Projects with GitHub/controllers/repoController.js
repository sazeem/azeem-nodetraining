const Request = require("request");
const repos = require('../models/repoModel');
const repo = require('../models/repoModel');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const _ = require('lodash');

exports.repoList = (req,res) => {
  const token = req.headers['authorization'];
  const project_id = req.params.id;
  const login = req.params.login;
  repos.findAll().then(repos => {    
    if(repos.length == 0){
      Request.get({
        "headers": { "content-type" : "application/json","User-Agent":login ,"Authorization" : token },
        "url": "https://api.github.com/users/"+ login +"/repos"
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
            obj.name = value.name;
            obj.owner_id = value.owner.id;
            obj.owner_name = value.owner.login;
            obj.project_id = project_id
            new_repository.push(obj);
          });
          return new_repository;
        };
        const my_repos = my_function(my_response);

        repo.bulkCreate(my_repos)
         .then(() => {
          console.log("New Employee Added!");
          res.send(my_response);
         })
         .catch((err) =>{
          res.status(400).send(err.parent.detail);
         });
      });
    }
    else
      res.send(repos);
  });  
}