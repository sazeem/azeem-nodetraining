const Request = require("request");
const pullRequests = require('../models/pullRequestModel');
const repos = require('../models/repoModel');
const pullRequest = require('../models/pullRequestModel');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const _ = require('lodash');


exports.getPullRequestList = (req,res) => {

  const token = req.headers['authorization'];
  const login = req.body.userName;
  const repoName = req.body.repoName;

  let repoList = [];
  let ownerList = [];
 
  pullRequests.findAll()
   .then((pullRequests) => {
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
              res.status(400).send("Error in Request!");
            }
          };

          const myPullRequests = mapper(myResponse);

          pullRequest.bulkCreate(myPullRequests)
           .then(() => {
            console.log("Pull Requests Added!");
            res.status(201).send(myPullRequests);
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

exports.pullRequestList = (req,res) => {
  pullRequests.findAll().then(pullRequests => {
    res.send(pullRequests);
  });
}