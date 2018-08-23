const Repo = require('../models/repoModel');
const RequestGitHub = require('../services/requestGitHubService');
const RequestGitHubForRepo = RequestGitHub.RequestGitHubForRepo;

exports.getRepoByName = (req,res) => {
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
      RequestGitHubForRepo(token,projectId,repoName,login,res);
    }
    else{
      res.status(200).send(repos);
    }
  })
  .catch((err) => {
    res.status(400).send(err);
  });
}

exports.getRepos = (req,res) => {
  const projectId = req.params.id;

  Repo.findAll({
    where:{
      project_id:projectId
    }
  })
  .then((repos) => {
    res.status(200).send(repos);  
  })
  .catch((err) => {
    res.status(400).send(err);
  });
}
