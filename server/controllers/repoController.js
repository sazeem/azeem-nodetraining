const Repo = require('../models/repoModel');
const RequestGitHub = require('../services/requestGitHubService');

const RepoController = {

  getRepoByName : (req,res) => {
    const token = req.headers['authorization'];
    const tok = req.query.token;
    const projectId = req.params.id;
    const repoName = req.params.repoName;
    const login = req.query.login;
    let limit = req.query.limit;
    let page = req.query.page;
    let totalItems = 0;
    
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
        const Github = new RequestGitHub(tok || token,login,repoName);
        return new Promise((success,error) => {
          Github.requestForRepo(projectId)
          .then((response) => {
            totalItems = response.length;
            Repo.findAll({
              limit: limit,
              offset: (page-1)*(limit),
              where:{
                name:repoName,
                project_id:projectId,
                owner_name:login
              }
            })
            .then((repos) => {
              let data = {};
              data.totalItems = totalItems;
              data.items = repos;
              success(res.status(201).send(data));
            })
            .catch((err) => error(err));                    
          })
        })
      }

      totalItems = repos.length;
      Repo.findAll({        
        limit: limit,
        offset: (page-1)*(limit),
        where:{
          name:repoName,
          project_id:projectId,
          owner_name:login
        },
      })
      .then((repos) => {
        let data = {};
        data.totalItems = totalItems;
        data.items = repos;
        res.status(200).send(data);
      });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  },

  getRepos : (req,res) => {
    const projectId = req.params.id;
    let limit = req.query.limit;
    let page = req.query.page;
    let totalItems = 0;

    Repo.findAll()
    .then(totalRepos => {
      totalItems = totalRepos.length;
      Repo.findAll({
        limit: limit,
        offset: (page-1)*(limit),
        where:{          
          project_id:projectId
        }
      })
      .then((repos) => {
        let data = {};
        data.totalItems = totalItems;
        data.items = repos;
        res.status(200).send(data);
      })
      .catch((err) => res.status(400).send(err));
    });
  }
}

module.exports = RepoController;
