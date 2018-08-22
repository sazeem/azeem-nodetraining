const Repo = require('../models/repoModel');
const Commit = require('../models/commitModel');
const Contributor = require('../models/contributorModel');
const PullRequest = require('../models/pullRequestModel');

exports.StoreRepo = (myRepo,res) => {
  Repo.bulkCreate(myRepo)
  .then((myRepo) => {      
    res.status(201).send(myRepo);
    console.log("New Repo Added!");
  })
};

exports.StoreCommits = (myCommits,res) => {
  Commit.bulkCreate(myCommits)
  .then((myCommits) => {
    if(myCommits.length == 0){
      res.status(200).send("Uh.Oh. No Commits Yet!");
    }
    else{
      res.status(201).send(myCommits);
      console.log("Commits Added!");
    }
  })
};

exports.StoreContributors = (myContributors,res) => {
  Contributor.bulkCreate(myContributors)
  .then((myContributors) => {
    if(myContributors.length == 0){
      res.status(200).send("Uh.Oh. No Contributors Yet!");
    }
    else{
      res.status(201).send(myContributors);
      console.log("Contributors Added!");
    }
  })
};

exports.StorePullRequests = (myPulls,res) => {
  PullRequest.bulkCreate(myPulls)
  .then((myPulls) => {
    if(myPulls.length == 0){
      res.status(200).send("Uh.Oh. No Pull Requests Yet!");
    }
    else{
      res.status(201).send(myPulls);
      console.log("Pull Requests Added!");
    }
  })
};

/*
exports.CronStoreCommits = (myCommits,res) => {
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
*/