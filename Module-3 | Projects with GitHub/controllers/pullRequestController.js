const PullRequest = require('../models/pullRequestModel');
const Repo = require('../models/repoModel');
const RequestGitHub = require('../services/requestGitHubService');
const RequestGitHubForPullRequests = RequestGitHub.RequestGitHubForPullRequests;
const Mapper = require('../services/objectMapperService');
const PullRequestMapper = Mapper.PullRequestMapper;
const Store = require('../services/storeService');
const StorePullRequests = Store.StorePullRequests;


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
      RequestGitHubForPullRequests(token,repoName,login);
    }
    else{
      res.status(200).send(PullRequests);
    }
  })
  .then((myResponse) => {
    Repo.findAll({
      attributes:["id"],
      where:{
        name:repoName
      }
    })
    .then((repos) => {
      PullRequestMapper(myResponse,repos,repoName);
    })
    .then((myPullRequests) => {
      StorePullRequests(myPullRequests,res);
    });    
  })
  .catch((err) => {
    res.status(400).send(err);
  });
}
