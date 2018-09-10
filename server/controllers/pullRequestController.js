const PullRequest = require('../models/pullRequestModel');
const Repo = require('../models/repoModel');
const RequestGitHub = require('../services/requestGitHubService');

exports.getPullRequests = (req,res) => {
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
      return res.status(400).send("Repository doesn't exist in database.");
    }
    PullRequest.findAll({
      where:{
        repo_name:repoName,
        user_name:login
      }
    })
    .then((pullRequests) => {
      if(!pullRequests.length){
        const Github = new RequestGitHub(token,login,repoName);
        return new Promise((success,error) => {
          Github.requestForPullRequests()
          .then((response) => success(res.status(201).send(response)))
          .catch((err) => error(err));
        });
      }
      res.status(200).send(pullRequests);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  })
  .catch((err) => {
    res.status(400).send(err);
  });  
}
