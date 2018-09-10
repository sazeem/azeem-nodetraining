const cron = require('node-cron');
const repos = require('../models/repoModel');
const RequestGitHub = require('../services/requestGitHubService');
const _ = require('lodash');

const CronService = {

  commits : () => {
    cron.schedule("* * * * *", () => {
      console.log("Fetching Commits Every Minute!");

      repos.findAll({
        attributes:["name","owner_name"]
      })
      .then((repos) => {
        _.forEach(repos,(value) => {
          const Github = new RequestGitHub();
          Github.cronRequestForCommits(value.dataValues.owner_name,value.dataValues.name);
        });
      });
    });
  },

  pullRequests : () => {
    cron.schedule("* * * * *", () => {
      console.log("Fetching Pull Requests Every Minute!");

      repos.findAll({
        attributes:["name","owner_name"]
      })
      .then((repos) => {
        _.forEach(repos,(value) => {
          const Github = new RequestGitHub();
          Github.cronRequestForPullRequests(value.dataValues.owner_name,value.dataValues.name);
        });
      });
    });
  },

  contributors : () => {
    cron.schedule("* * * * *", () => {
      console.log("Fetching Contributors Every Minute!");

      repos.findAll({
        attributes:["name","owner_name"]
      })
      .then((repos) => {
        _.forEach(repos,(value) => {
          const Github = new RequestGitHub();
          Github.cronRequestForContributors(value.dataValues.owner_name,value.dataValues.name);
        });
      });
    });
  }
}

module.exports = CronService;
