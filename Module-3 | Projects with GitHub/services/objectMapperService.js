const _ = require('lodash');

exports.RepoMapper = (myResponse,projectId) => {
  let newArray = [];  
  let obj = {};

  obj.id = myResponse.id;
  obj.name = myResponse.name;
  obj.owner_id = myResponse.owner.id;
  obj.owner_name = myResponse.owner.login;
  obj.project_id = projectId;

  newArray.push(obj);  

  return newArray;  
};

exports.CommitMapper = (myResponse,repos,repoName) => {
  let newArray = [];
  
  _.forEach(myResponse,(value) => {
    let obj = {};

    obj.id = value.sha;
    obj.committer = value.author.login;
    obj.message = value.commit.message;
    obj.repo_id = repos[0].dataValues.id;
    obj.repo_name = repoName;    

    newArray.push(obj);
  });

  return newArray;
};

exports.PullRequestMapper = (myResponse,repos,repoName) => {
  let newArray = [];

  _.forEach(myResponse,(value) => {
    let obj = {};

    obj.id = value.id;
    obj.number = value.number;
    obj.user_id = value.user.id;
    obj.user_name = value.user.login;
    obj.repo_id = repos[0].dataValues.id;
    obj.repo_name = repoName;

    newArray.push(obj);
  });

  return newArray;  
};

exports.ContributorMapper = (myResponse,repos,repoName) => {
  let newArray = [];

  _.forEach(myResponse,(value) => {
    let obj = {};

    obj.id = value.id;
    obj.name = value.login;              
    obj.repo_name = repoName;
    obj.repo_id = repos[0].dataValues.id;

    newArray.push(obj);
  });

  return newArray;  
};
