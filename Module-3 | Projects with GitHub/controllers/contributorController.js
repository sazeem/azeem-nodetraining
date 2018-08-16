const Request = require("request");
const contributors = require('../models/contributorModel');
const repos = require('../models/repoModel');
const contributor = require('../models/contributorModel');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const _ = require('lodash');

exports.contributorList = (req,res) => {

  const token = req.headers['authorization'];
  const login = req.params.login;
  const repo = req.params.repo;

  let repo_name = [];
  let owner_name = [];
 
  contributors.findAll()
   .then((contributors) => {
    _.forEach(contributors,(value) => {
      repo_name.push(value.dataValues.repo_name);
      owner_name.push(value.dataValues.name);
    });
    if(!(_.includes(owner_name,login)) || !(_.includes(repo_name,repo)) || (contributors.length == 0)){
      Request.get({     
        "headers": { "content-type" : "application/json", "User-Agent":login, "Authorization" : token },
        "url": "https://api.github.com/repos/"+ login +"/"+ repo +"/contributors"
      },(error, response, body) => {
        if(error) {
          return console.dir(error);
        }
        const my_response = JSON.parse(body);  
        console.log(my_response);
        repos.findAll({
          attributes:["id"],
          where:{ name: repo}
        }).then((repos) => {                
          const my_repos = (repository) => {
            let new_repository = [];
            _.forEach(repository, function(value) {
              let obj = {};
              obj.user_id = value.id;
              obj.name = value.login;              
              obj.repo_name = repo;
              obj.repo_id = repos[0].dataValues.id;
              new_repository.push(obj);
            });
            return new_repository;
          };
          contributor.bulkCreate(my_repos(my_response))
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
    else{
      res.send(contributors);  
    }
  });
}
