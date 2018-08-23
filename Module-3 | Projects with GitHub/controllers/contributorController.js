const Contributor = require('../models/contributorModel');
const Repo = require('../models/repoModel');
const RequestGitHub = require('../services/requestGitHubService');
const RequestGitHubForContributors = RequestGitHub.RequestGitHubForContributors;

exports.getContributors = (req,res) => {
  const token = req.headers['authorization'];
  const repoName = req.params.repoName;
  const login = req.query.login;

  Contributor.findAll({
    where:{
      repo_name:repoName,
      name:login
    }
  })
  .then((Contributors) => {
    if(Contributors.length == 0){
      RequestGitHubForContributors(token,repoName,login,res);
    }
    else{
      res.status(200).send(Contributors);
    }
  })
  .catch((err) => {
    res.status(400).send(err);
  });
}
