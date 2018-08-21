const cron = require('node-cron');
const express = require('express');
const bodyParser = require('body-parser');
const repos = require('../models/repoModel');
const commit = require('../models/commitModel');
const commits = require('../models/commitModel');
const Request = require('request');
const _ = require('lodash');
const app = express();

app.use(express.json());
app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const cornCommitsService = cron.schedule("* * * * *", () => {
  console.log("Fetching Commits Every Minute!");
  const repoList = [];

  repos.findAll({
      attributes:["name"]
  })
  .then((repos) => {
    _.forEach(repos,(value) => {
      repoList.push(value.dataValues.name);
    });
    commits.findAll()
    .then((commits) => requestGitHub(commits, repoList));
  });  
});

const requestGitHub = (commits, repoList) => {
  const commitList = [];

  _.forEach(commits,(value) => {
    commitList.push(value.dataValues.id);
  });
  _.forEach(repoList,(repoName) => {
    Request.get({
      "headers": { 
        "content-type" : "application/json",
        "User-Agent":"sazeem",
        "Authorization" : "Basic c2F6ZWVtOjMxZTRmYmE2NWUzODgzMGQ1OWM0NDhlNmY0MzVlYjk5N2JlOTM1ZTA=" 
      },
      "url": "https://api.github.com/repos/sazeem/"+ repoName +"/commits"
    },(error, response, body) => {
      if(error) {
        return console.dir(error);
      }
      const myResponse = JSON.parse(body);  
      
      repos.findAll({
        attributes:["id"],
        where:{ name:repoName }
      })
      .then((repos) => storeCommits(repos,myResponse,repoName,commitList));
    });
  });
};

const storeCommits = (repos,myResponse,repoName) => {
  let myCommits = mapper(myResponse,repos,repoName);

  if(myCommits.length == 0){
    console.log("No Changes in Commits");
  }
  else{
    _.forEach(myCommits,(myCommit) => {
      commit.upsert(myCommit)
      .then(() => {
        console.log("Commit Added!");
        console.log(myCommit);
      })
      .catch((err) => {
        console.log(err);
      });
    })
  }
};

const mapper = (myResponse,repos,repoName) => {  
  let newRepository = [];
  try{
    _.forEach(myResponse, (value) => {      
      let obj = {};
      obj.id = value.sha;
      obj.committer = value.author.login;
      obj.message = value.commit.message;
      obj.repo_id = repos[0].dataValues.id;
      obj.repo_name = repoName;
      newRepository.push(obj);
    });
  }
  catch(error){
    console.log(error);
  }
  finally{
    return newRepository;
  }
};

module.exports = cornCommitsService;
