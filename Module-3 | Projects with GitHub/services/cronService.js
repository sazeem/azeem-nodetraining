const cron = require('node-cron');
const repos = require('../models/repoModel');
const RequestGitHub = require('../services/requestGitHubService');
const CronRequestGitHubForCommits = RequestGitHub.CronRequestGitHubForCommits;
const _ = require('lodash');

const cornCommitsService = cron.schedule("* * * * *", () => {
  console.log("Fetching Commits Every Minute!");

  repos.findAll({
      attributes:["name","owner_name"]
  })
  .then((repos) => {
    _.forEach(repos,(value) => {
      CronRequestGitHubForCommits(value.dataValues.owner_name,value.dataValues.name);
    });
  });
});


module.exports = cornCommitsService;


