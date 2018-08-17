const Request = require("request");
const repos = require('../models/repoModel');
const repo = require('../models/repoModel');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const _ = require('lodash');

exports.getRepoList = (req,res) => {
  const token = req.headers['authorization'];
  const projectId = req.params.id;
  const login = req.body.userName;
  const repoName = req.body.repoName;

  let ownerList = [];
  let repoList =[];

  repos.findAll()
  .then(repos => {
    _.forEach(repos,(value) => {      
      ownerList.push(value.dataValues.owner_name);
      repoList.push(value.dataValues.name);
    });
    if(!(_.includes(ownerList,login)) || !(_.includes(repoList,repoName)) || (repos.length == 0)){
      Request.get({
        "headers": { "content-type" : "application/json", "User-Agent":login, "Authorization" : token },
        "url": "https://api.github.com/repos/"+ login + "/" + repoName
      },(error, response, body) => {
        if(error) {
          return console.dir(error);
        }
        const myResponse = JSON.parse(body);

        const mapper = (repository) => {
          let newRepository = [];
          try{            
            let obj = {};
            obj.id = repository.id;
            obj.name = repository.name;
            obj.owner_id = repository.owner.id;
            obj.owner_name = repository.owner.login;
            obj.project_id = projectId
            newRepository.push(obj);
            return newRepository;
          }
          catch{
            res.status(400).send(repository);
          }
          finally{
            return newRepository;
          }
        };

        let myRepos = mapper(myResponse);
        
        repo.bulkCreate(myRepos)
         .then(() => {
          if(myRepos.length == 0){
            console.log("Error in Request!");
          }
          else{
            console.log("New Repo Added!");
            res.status(201).send(myRepos);
          }
         })
         .catch((err) => {
            res.status(400).send(err.parent.detail);
         });
      });
    }
    else
      res.send(repos);
  });  
}

exports.repoList = (req,res) => {
  repos.findAll().then(repos => {
    res.send(repos);
  });
}