const Commit = require('../models/commitModel');
const Repo = require('../models/repoModel');
const RequestGitHub = require('../services/requestGitHubService');
const RequestGitHubForCommits = RequestGitHub.RequestGitHubForCommits;

exports.getCommits = (req,res) => {
  const token = req.headers['authorization'];
  const repoName = req.params.repoName;
  const login = req.query.login;

  Commit.findAll({
    where:{
      repo_name:repoName,
      committer:login
    }
  })
  .then((commits) => {
    if(commits.length == 0){
      RequestGitHubForCommits(token,repoName,login,res);
    }
    else{
      res.status(200).send(commits);
    }
  })        
  .catch((err) => {
    res.status(400).send(err);
  });
}
