const Repo = require('../models/repoModel');
const RequestGitHub = require('../services/requestGitHubService');

const RepoController = {

  getRepoByName : (req,res) => {
    const token = req.headers['authorization'];  
    const projectId = req.params.id;
    const repoName = req.params.repoName;
    const login = req.query.login;
    
    if(!login){
      return res.status(400).send("Please Enter Username in the Query as '?login=user_name'");
    }
    Repo.findAll({
      where:{
        project_id:projectId,
        name:repoName,
        owner_name:login
      }
    })
    .then((repos) => {
      if(!repos.length){
        const Github = new RequestGitHub(token,login,repoName);
        return new Promise((success,error) => {
          Github.requestForRepo(projectId)
          .then((response) => success(res.status(201).send(response)))
          .catch((err) => error(err));
        });      
      }
      res.status(200).send(repos);        
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  },

  getRepos : (req,res) => {
    const projectId = req.params.id;

    Repo.findAll({
      where:{
        project_id:projectId
      }
    })
    .then((repos) => res.status(200).send(repos))
    .catch((err) => res.status(400).send(err));
  }
}

module.exports = RepoController;
