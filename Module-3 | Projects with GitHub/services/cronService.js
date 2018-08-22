const cron = require('node-cron');
const repos = require('../models/repoModel');
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
    requestGitHub(repoList);
  });  
});


module.exports = cornCommitsService;


