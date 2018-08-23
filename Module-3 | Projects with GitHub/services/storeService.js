const Repo = require('../models/repoModel');
const Commit = require('../models/commitModel');
const Contributor = require('../models/contributorModel');
const PullRequest = require('../models/pullRequestModel');
const _ = require('lodash');

exports.StoreRepo = (myRepo,res) => {
  Repo.bulkCreate(myRepo)
  .then((myRepo) => {      
    res.status(201).send(myRepo);
    console.log("New Repo Added!");
  })
};

exports.StoreCommits = (myCommits,res) => {
  if(myCommits.length == 0){
    console.log("Uh, Oh. No Commits Yet!");
  }
  else{
    Commit.bulkCreate(myCommits)
    .then((myCommits) => {
      res.status(201).send(myCommits);
      console.log("Commits Added!");
    })
    .catch((err) => {
      console.log(err);
    });
  }
};

exports.CronStoreCommits = (myCommits) => {
  if(myCommits.length == 0){
    console.log("Uh, Oh. No Commits Yet!");
  }
  else{
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
};

exports.StoreContributors = (myContributors,res) => {
  if(myContributors.length == 0){
    res.status(200).send("Uh.Oh. No Contributors Yet!");
  }
  else{
    Contributor.bulkCreate(myContributors)
    .then((myContributors) => {    
      res.status(201).send(myContributors);
      console.log("Contributors Added!");    
    })  
  }
};

exports.StorePullRequests = (myPulls,res) => {
  if(myPulls.length == 0){
    res.status(200).send("Uh.Oh. No Pull Requests Yet!");
  }  
  else{
    PullRequest.bulkCreate(myPulls)
    .then((myPulls) => {    
      res.status(201).send(myPulls);
      console.log("Pull Requests Added!");    
    })
  }
};
