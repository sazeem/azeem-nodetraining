const Request = require("request");
const Repo = require('../models/repoModel');
const Mapper = require('./objectMapperService');
const Store = require('./storeService');
const RepoMapper = Mapper.RepoMapper;
const CommitMapper = Mapper.CommitMapper;
const ContributorMapper = Mapper.ContributorMapper;
const StoreRepo = Store.StoreRepo;
const StoreCommits = Store.StoreCommits;
const StoreContributors = Store.StoreContributors;

exports.RequestGitHubForRepo = (token,projectId,repoName,login,res) => {
  console.log(`https://api.github.com/repos/${login}/${repoName}`);
  Request.get({
    "headers": {
      "content-type":"application/json",
      "User-Agent":login,
      "Authorization":token
    },    
    "url":`https://api.github.com/repos/${login}/${repoName}`
  },(error, response, body) => {
    if(error) {
      return JSON.parse(error);
    }
    const myResponse = JSON.parse(body);  
    const myRepo = RepoMapper(myResponse,projectId);
    StoreRepo(myRepo,res);
  });
};

exports.RequestGitHubForCommits = (token,repoName,login,res) => {
  Request.get({     
    "headers": { 
      "content-type":"application/json",
      "User-Agent":login,
      "Authorization" : token 
    },
    "url": `https://api.github.com/repos/${login}/${repoName}/commits`
  },(error, response, body) => {
    if(error) {
      return JSON.parse(error);
    }
    const myResponse = JSON.parse(body);
    Repo.findAll({
      attributes:["id"],
      where:{
        name:repoName
      }
    })
    .then((repos) => {
      const myCommits = CommitMapper(myResponse,repos,repoName);
      StoreCommits(myCommits,res);
    });
  });
};

exports.RequestGitHubForContributors = (token,repoName,login,res) => {
  Request.get({     
    "headers": { 
      "content-type":"application/json",
      "User-Agent":login,
      "Authorization" : token 
    },
    "url": `https://api.github.com/repos/${login}/${repoName}/contributors`
  },(error, response, body) => {
    if(error) {
      return JSON.parse(error);
    }
    const myResponse = JSON.parse(body);
    Repo.findAll({
      attributes:["id"],
      where:{
        name:repoName
      }
    })
    .then((repos) => {
      const myContributors = ContributorMapper(myResponse,repos,repoName);
      console.log(myContributors);
      StoreContributors(myContributors,res);
    });
  });
};

exports.RequestGitHubForPullRequests = (token,repoName,login) => {
  Request.get({     
    "headers": { 
      "content-type":"application/json",
      "User-Agent":login,
      "Authorization" : token 
    },
    "url": `https://api.github.com/repos/${login}/${repoName}/pulls`
  },(error, response, body) => {
    if(error) {
      return JSON.parse(error);
    }
    else{
      return JSON.parse(body);
    }
  });
};

/*
exports.CronRequestGitHubForCommits = (repoList) => {
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
      .then((repos) => storeCommits(repos,myResponse,repoName));
    });
  });
};*/