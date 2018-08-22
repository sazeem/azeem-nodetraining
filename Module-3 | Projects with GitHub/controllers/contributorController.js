const Contributor = require('../models/contributorModel');
const Repo = require('../models/repoModel');
const RequestGitHub = require('../services/requestGitHubService');
const RequestGitHubForContributors = RequestGitHub.RequestGitHubForContributors;
const Mapper = require('../services/objectMapperService');
const ContributorMapper = Mapper.ContributorMapper;
const Store = require('../services/storeService');
const StoreContributors = Store.StoreContributors;


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
      RequestGitHubForContributors(token,repoName,login);
    }
    else{
      res.status(200).send(Contributors);
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
      ContributorMapper(myResponse,repos,repoName);
    })
    .then((myContributors) => {
      StoreContributors(myContributors,res);
    });    
  })
  .catch((err) => {
    res.status(400).send(err);
  });
}
