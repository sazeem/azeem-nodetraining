const Repo = require('../models/repoModel');
const Commit = require('../models/commitModel');
const Contributor = require('../models/contributorModel');
const PullRequest = require('../models/pullRequestModel');
const _ = require('lodash');

class StoreService {

  constructor(res){
    this.res = res;
  }  

  storeRepo(myRepo) {  
    Repo.bulkCreate(myRepo)
    .then((myRepo) => {      
      this.res.status(201).send(myRepo);
      console.log("New Repo Added!");
    })
    .catch((err) => {
      this.res.status(400).json({
        "detail":err.parent.detail
      });
    });  
  }

  storeCommits(myCommits) {
    if(!myCommits.length){
      return this.res.status(200).send("Uh.Oh. No Commits Yet!");
    }
    Commit.bulkCreate(myCommits)
    .then((myCommits) => {
      this.res.status(201).send(myCommits);
      console.log("Commits Added!");
    })
    .catch((err) => {
      this.res.status(400).send(err);
    });
  }
  storeContributors(myContributors) {
    if(!myContributors.length){
      return this.res.status(200).send("Uh.Oh. No Contributors Yet!");
    }
    Contributor.bulkCreate(myContributors)
    .then((myContributors) => {    
      this.res.status(201).send(myContributors);
      console.log("Contributors Added!");    
    })
    .catch((err) => {
      this.res.status(400).send(err);
    }); 
  }
  storePullRequests(myPulls) {
    if(!myPulls.length){
      return this.res.status(200).send("Uh.Oh. No Pull Requests Yet!");
    }  
    PullRequest.bulkCreate(myPulls)
    .then((myPulls) => {    
      this.res.status(201).send(myPulls);
      console.log("Pull Requests Added!");    
    })
    .catch((err) => {
      this.res.status(400).send(err);
    });
  }
  cronStoreCommits(myCommits) {
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
}

module.exports = StoreService;
