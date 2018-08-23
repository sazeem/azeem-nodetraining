const Commit = require('../models/commitModel');
const Repo = require('../models/repoModel');
const RequestGitHub = require('../services/requestGitHubService');

exports.getCommits = (req,res) => {
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
    Commit.findAll({
      where:{
        repo_name:repoName,
        committer:login
      }
    })
    .then((commits) => {
      if(!commits.length){
        const Github = new RequestGitHub(token,login,repoName);
        return Github.requestForCommits(res);
      }    
      res.status(200).send(commits);      
    })        
    .catch((err) => {
      res.status(400).send(err);
    });    
  })
  .catch((err) => {
    res.status(400).send(err);
  });
}
