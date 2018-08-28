const Repo = require('../models/repoModel');
const Commit = require('../models/commitModel');
const Contributor = require('../models/contributorModel');
const PullRequest = require('../models/pullRequestModel');
const _ = require('lodash');

class StoreService {

  storeRepo(myRepo){
    return new Promise((success,error) => {
      Repo.bulkCreate(myRepo)
      .then((myRepo) => success(myRepo))
      .catch((err) => error(err));
    });    
  }

  storeCommits(myCommits){
    return new Promise((success,error) => {
      if(!myCommits.length){
        return error("Uh.Oh. No Commits Yet!");
      }
      Commit.bulkCreate(myCommits)
      .then((myCommits) => success(myCommits))
      .catch((err) => error(err));
    });
  }

  storeContributors(myContributors){
    return new Promise((success,error) => {
      if(!myContributors.length){
        return error("Uh.Oh. No Contributors Yet!");
      }
      Contributor.bulkCreate(myContributors)
      .then((myContributors) => success(myContributors))
      .catch((err) => error(err));
    });
  }

  storePullRequests(myPulls){
    return new Promise((success,error) => {
      if(!myPulls.length){
        return error("Uh.Oh. No Pull Requests Yet!");
      }  
      PullRequest.bulkCreate(myPulls)
      .then((myPulls) => success(myPulls))
      .catch((err) => error(err));
    });
  }

  cronStoreCommits(myCommits){
    if(!myCommits.length){
     return console.log("Uh, Oh. No Commits Yet!");
    }
    _.forEach(myCommits,(myCommit) => {
      Commit.upsert(myCommit)
      .then((changes) => {
        if(changes){
          console.log(myCommit);
          console.log("Commit Added!");  
        }
      })
      .catch((err) => {
        console.log(err);
      });
    })
  }

  cronStorePullRequests(myPulls){
    if(!myPulls.length){
     return console.log("Uh, Oh. No Pull Requests Yet!");
    }
    _.forEach(myPulls,(myPull) => {
      PullRequest.upsert(myPull)
      .then((changes) => {
        if(changes){
          console.log(myPull);
          console.log("Pull Request Added!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    })
  }

  cronStoreContributors(myContributors){
    if(!myContributors.length){
     return console.log("Uh, Oh. No Contributors Yet!");
    }
    _.forEach(myContributors,(myContributor) => {
      Contributor.upsert(myContributor)
      .then((changes) => {
        if(changes){
          console.log(myContributor);
          console.log("Contributor Added!");  
        }
      })
      .catch((err) => {
        console.log(err);
      });
    })
  }
}

module.exports = StoreService;
