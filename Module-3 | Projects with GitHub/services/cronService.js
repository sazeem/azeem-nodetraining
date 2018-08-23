const cron = require('node-cron');
const repos = require('../models/repoModel');
const RequestGitHub = require('../services/requestGitHubService');
const CronRequestGitHubForCommits = RequestGitHub.CronRequestGitHubForCommits;
const _ = require('lodash');

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
    CronRequestGitHubForCommits(repoList);
  });  
});


module.exports = cornCommitsService;


