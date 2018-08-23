const PullRequest = require('../models/pullRequestModel');
const Repo = require('../models/repoModel');
const RequestGitHub = require('../services/requestGitHubService');
const RequestGitHubForPullRequests = RequestGitHub.RequestGitHubForPullRequests;

exports.getPullRequests = (req,res) => {
  const token = req.headers['authorization'];
  const repoName = req.params.repoName;
  const login = req.query.login;
  
  PullRequest.findAll({
    where:{
      repo_name:repoName,
      user_name:login
    }
  })
  .then((PullRequests) => {
    if(PullRequests.length == 0){
      RequestGitHubForPullRequests(token,repoName,login,res);
    }
    else{
      res.status(200).send(PullRequests);
    }
  })  
  .catch((err) => {
    res.status(400).send(err);
  });
}
