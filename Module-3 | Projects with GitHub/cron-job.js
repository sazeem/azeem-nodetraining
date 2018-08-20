const cron = require('node-cron');
const express = require('express');
const bodyParser = require('body-parser');
const repos = require('./models/repoModel');
const commit = require('./models/commitModel');
const commits = require('./models/commitModel');
const Request = require('request');
const _ = require('lodash');
const app = express();

app.use(express.json());
app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

cron.schedule("* * * * *", () => {

  console.log("running a task every minute");
  const repoName = 'project-1-sample-repo';
  const commitList = [];

  commits.findAll()
   .then((commits) => {
    _.forEach(commits,(value) => {
      commitList.push(value.dataValues.id);
    });
    Request.get({     
      "headers": { "content-type" : "application/json", "User-Agent":"sazeem", "Authorization" : "Basic c2F6ZWVtOjMxZTRmYmE2NWUzODgzMGQ1OWM0NDhlNmY0MzVlYjk5N2JlOTM1ZTA=" },
      "url": "https://api.github.com/repos/sazeem/"+ repoName +"/commits"
    },(error, response, body) => {
      if(error) {
        return console.dir(error);
      }
      const myResponse = JSON.parse(body);  
      
      repos.findAll({
        attributes:["id"],
        where:{ name: repoName}
      })
      .then((repos) => {
        const mapper = (repository) => {
          let newRepository = [];
          try{              
            _.forEach(repository, (value) => {
              if(!_.includes(commitList,value.sha)){
                let obj = {};
                obj.id = value.sha;
                obj.committer = value.author.login;
                obj.message = value.commit.message;
                obj.repo_id = repos[0].dataValues.id;
                obj.repo_name = repoName;
                newRepository.push(obj);
              }
            });
          }
          catch{
            if(Object.keys(repository[0]).length > 2)
              console.log("Repository Doesn't Exist in database!");
          }
          finally{
            return newRepository;
          }
        };

        let myCommits = mapper(myResponse);

        commit.bulkCreate(myCommits)
         .then(() => {
            if(myCommits.length == 0){
              console.log("No Changes in Commits");
            }
            else{
              console.log("Commits Added!");
              console.log(myCommits);
            }            
         })
         .catch((err) =>{
          console.log(err);
         });
      });        
    });    
  });
});
