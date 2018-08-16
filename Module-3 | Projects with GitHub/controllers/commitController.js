const Request = require("request");
const commits = require('../models/commitModel');
const commit = require('../models/commitModel');
const repos = require('../models/repoModel');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const _ = require('lodash');


exports.commitList = (req,res) => {

  const token = req.headers['authorization'];
  const login = req.params.login;
  const repo = req.params.repo;

  let repo_name = [];
  let owner_name = [];
 
  commits.findAll()
   .then((commits) => {
    _.forEach(commits,(value) => {
      repo_name.push(value.dataValues.repo_name);
      owner_name.push(value.dataValues.committer);
    });
    if(!(_.includes(owner_name,login)) || !(_.includes(repo_name,repo)) || (commits.length == 0)){
      Request.get({     
        "headers": { "content-type" : "application/json", "User-Agent":login, "Authorization" : token },
        "url": "https://api.github.com/repos/"+ login +"/"+ repo +"/commits"
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
              obj.id = value.sha;
              obj.committer = value.commit.committer.name;
              obj.message = value.commit.message;
              obj.repo_id = repos[0].dataValues.id;
              obj.repo_name = repo;
              new_repository.push(obj);
            });
            return new_repository;
          };
          commit.bulkCreate(my_repos(my_response))
           .then(() => {
            console.log("Commits Added!");
            res.send(my_response);
           })
           .catch((err) =>{
            res.status(400).send(err);
           });
        });          
      });
    }
    else{
      res.send(commits);  
    }
  });
}