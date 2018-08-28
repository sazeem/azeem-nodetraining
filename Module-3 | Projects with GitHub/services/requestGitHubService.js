const Request = require('request');
const Repo = require('../models/repoModel');
const MapperService = require('./objectMapperService');
const StoreService = require('./storeService');

class RequestGitHub {

  constructor(token,login,repoName){
    this.token = token;
    this.login = login;
    this.repoName = repoName;
  }

  headers(login,token){
    let myHeader = {
      "content-type":"application/json",
      "User-Agent":login,
      "Authorization":token
    };

    return myHeader;
  }

  requestForRepo(projectId){
    return new Promise((success,error) => {
      Request.get({
        "headers":this.headers(this.login,this.token),    
        "url":`https://api.github.com/repos/${this.login}/${this.repoName}`
      },(err, response, body) => {
        if(err) {
          return error(JSON.parse(err));
        }
        const myResponse = JSON.parse(body);
        const Mapper = new MapperService(myResponse);
        
        try{
          const myRepo = Mapper.repoMapper(projectId);
          const Store = new StoreService();

          Store.storeRepo(myRepo)
          .then((myRepo) => success(myRepo))
          .catch((err) => error(err.parent.detail));
        }
        catch{
          return error(myResponse);
        }                        
      });
    });    
  }

  requestForCommits(){
    return new Promise((success,error) => {
      Request.get({     
        "headers":this.headers(this.login,this.token),
        "url": `https://api.github.com/repos/${this.login}/${this.repoName}/commits`
      },(err, response, body) => {
        if(err) {
          return error(JSON.parse(err));
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
            const myCommits = Mapper.commitMapper(repos,this.repoName);
            const Store = new StoreService();

            Store.storeCommits(myCommits)
            .then((myCommits) => success(myCommits))
            .catch((err) => error(err));
          }
          catch{
            return error(myResponse);
          }
        });
      });
    });    
  }

  requestForContributors(){
    return new Promise((success,error) => {
      Request.get({     
        "headers":this.headers(this.login,this.token),
        "url": `https://api.github.com/repos/${this.login}/${this.repoName}/contributors`
      },(err, response, body) => {
        if(err) {
          return error(JSON.parse(err));
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
            const myContributors = Mapper.contributorMapper(repos,this.repoName);
            const Store = new StoreService();

            Store.storeContributors(myContributors)
            .then((myContributors) => success(myContributors))
            .catch((err) => error(err));
          }
          catch{
            return error(myResponse);
          }
        });
      });
    });    
  }

  requestForPullRequests(){
    return new Promise((success,error) => {
      Request.get({     
        "headers":this.headers(this.login,this.token),
        "url": `https://api.github.com/repos/${this.login}/${this.repoName}/pulls`
      },(err, response, body) => {
        if(err) {
          return error(JSON.parse(err));
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
            const myPulls = Mapper.pullRequestMapper(repos,this.repoName);
            const Store = new StoreService();

            Store.storePullRequests(myPulls)
            .then((myPulls) => success(myPulls))
            .catch((err) => error(err));
          }
          catch{
            return error(myResponse);
          }
        });
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
          const myCommits = Mapper.commitMapper(repos,repoName);
          const Store = new StoreService();

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
