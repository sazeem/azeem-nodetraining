const Request = require('request');
const Repo = require('../models/repoModel');
const MapperService = require('./objectMapperService');
const StoreService = require('./storeService');
const _ = require('lodash');

class RequestGitHub {

  constructor(token,login,repoName){
    this.token = token;
    this.login = login;
    this.repoName = repoName;
  }

  requestForRepo(projectId,res){    
    Request.get({
      "headers": {
        "content-type":"application/json",
        "User-Agent":this.login,
        "Authorization":this.token
      },    
      "url":`https://api.github.com/repos/${this.login}/${this.repoName}`
    },(error, response, body) => {
      if(error) {
        return JSON.parse(error);
      }
      const myResponse = JSON.parse(body);

      try{
        const Mapper = new MapperService(myResponse);
        const Store = new StoreService(res);
        const myRepo = Mapper.repoMapper(projectId);

        Store.storeRepo(myRepo);
      }
      catch{
        res.status(400).send(myResponse);
      }    
    });
  }

  requestForCommits(res) {
    Request.get({     
      "headers": { 
        "content-type":"application/json",
        "User-Agent":this.login,
        "Authorization" :this.token 
      },
      "url": `https://api.github.com/repos/${this.login}/${this.repoName}/commits`
    },(error, response, body) => {
      if(error) {
        return JSON.parse(error);
      }
      const myResponse = JSON.parse(body);

      Repo.findAll({
        attributes:["id"],
        where:{
          name:this.repoName
        }
      })
      .then((repos) => {
        try{
          const Mapper = new MapperService(myResponse);
          const Store = new StoreService(res);

          const myCommits = Mapper.commitMapper(repos,this.repoName);

          Store.storeCommits(myCommits);
        }
        catch{
          res.status(400).send(myResponse);
        }
      });
    });
  }

  requestForContributors(res){
    Request.get({     
      "headers": { 
        "content-type":"application/json",
        "User-Agent":this.login,
        "Authorization" :this.token 
      },
      "url": `https://api.github.com/repos/${this.login}/${this.repoName}/contributors`
    },(error, response, body) => {
      if(error) {
        return JSON.parse(error);
      }
      const myResponse = JSON.parse(body);

      Repo.findAll({
        attributes:["id"],
        where:{
          name:this.repoName
        }
      })
      .then((repos) => {
        try{
          const Mapper = new MapperService(myResponse);
          const Store = new StoreService(res);

          const myContributors = Mapper.contributorMapper(repos,this.repoName);

          Store.storeContributors(myContributors);
        }
        catch{
          res.status(400).send(myResponse);
        }
      });
    });
  }

  requestForPullRequests(res){
    Request.get({     
      "headers": { 
        "content-type":"application/json",
        "User-Agent":this.login,
        "Authorization" :this.token
      },
      "url": `https://api.github.com/repos/${this.login}/${this.repoName}/pulls`
    },(error, response, body) => {
      if(error) {
        return JSON.parse(error);
      }
      const myResponse = JSON.parse(body);

      Repo.findAll({
        attributes:["id"],
        where:{
          name:this.repoName
        }
      })
      .then((repos) => {
        try{
          const Mapper = new MapperService(myResponse);
          const Store = new StoreService(res);

          const myPulls = Mapper.pullRequestMapper(repos,this.repoName);

          Store.storePullRequests(myPulls);
        }
        catch{
          res.status(400).send(myResponse);
        }      
      });
    });
  }

  cronRequestForCommits(login,repoName){
    Request.get({
      "headers": { 
        "content-type" : "application/json",
        "User-Agent":"sazeem",
        "Authorization" : "Basic c2F6ZWVtOjMxZTRmYmE2NWUzODgzMGQ1OWM0NDhlNmY0MzVlYjk5N2JlOTM1ZTA=" 
      },
      "url": `https://api.github.com/repos/${login}/${repoName}/commits`
    },(error, response, body) => {
      if(error) {
        return console.dir(error);
      }
      const myResponse = JSON.parse(body);  
      
      Repo.findAll({
        attributes:["id"],
        where:{ name:repoName }
      })
      .then((repos) => {
        try{
          const Mapper = new MapperService(myResponse);
          const Store = new StoreService();

          const myCommits = Mapper.commitMapper(repos,repoName);
          Store.cronStoreCommits(myCommits);
        }
        catch(error){
          console.log(error);
        }
      });
    });
  }
}

module.exports = RequestGitHub;
