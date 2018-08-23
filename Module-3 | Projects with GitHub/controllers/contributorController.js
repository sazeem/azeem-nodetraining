const Contributor = require('../models/contributorModel');
const Repo = require('../models/repoModel');
const RequestGitHub = require('../services/requestGitHubService');

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
    if(!repos.length){
      return res.status(400).send("Repository doesn't exist in database.");
    }    
    Contributor.findAll({
      where:{
        repo_name:repoName,
        name:login
      }
    })
    .then((contributors) => {
      if(!contributors.length){
        const Github = new RequestGitHub(token,login,repoName);
        return Github.requestForContributors(res);
      }
      res.status(200).send(contributors);
    })
    .catch((err) => {
      res.status(400).send(err);
    });    
  })
  .catch((err) => {
    res.status(400).send(err);
  });
}
