const Contributor = require('../models/contributorModel');
const Repo = require('../models/repoModel');
const RequestGitHub = require('../services/requestGitHubService');
const RequestGitHubForContributors = RequestGitHub.RequestGitHubForContributors;

exports.getContributors = (req,res) => {
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
  })
  .catch((err) => {
    res.status(400).send(err);
  });
}
