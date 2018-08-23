const PullRequest = require('../models/pullRequestModel');
const Repo = require('../models/repoModel');
const RequestGitHub = require('../services/requestGitHubService');
const RequestGitHubForPullRequests = RequestGitHub.RequestGitHubForPullRequests;

exports.getPullRequests = (req,res) => {
  const token = req.headers['authorization'];
  const projectId = req.params.id;
  const repoName = req.params.repoName;
  const login = req.query.login;


  Repo.findAll({
    where:{
      project_id:projectId,
      name:repoName,
      owner_name:login
    }
  })
  .then((repos) => {
    if(repos.length == 0){
      res.status(400).send("Repository doesn't exist in database.");
    }
    else{
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
  })
  .catch((err) => {
    res.status(400).send(err);
  });  
}
