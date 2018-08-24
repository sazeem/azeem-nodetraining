const _ = require('lodash');

class MapperService {
  
  constructor(myResponse){
    this.myResponse = myResponse;
  }

  repoMapper(projectId) {
    let newArray = [];  
    let obj = {};

    obj.id = this.myResponse.id;
    obj.name = this.myResponse.name;
    obj.owner_id = this.myResponse.owner.id;
    obj.owner_name = this.myResponse.owner.login;
    obj.project_id = projectId;

    newArray.push(obj);  

    return newArray;  
  }

  commitMapper(repos,repoName) {
    let newArray = [];
    
    _.forEach(this.myResponse,(value) => {
      let obj = {};

      obj.id = value.sha;
      obj.committer = value.author.login;
      obj.message = value.commit.message;
      obj.repo_id = repos[0].dataValues.id;
      obj.repo_name = repoName;    

      newArray.push(obj);
    });

    return newArray;
  }

  pullRequestMapper(repos,repoName) {
    let newArray = [];

    _.forEach(this.myResponse,(value) => {
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
  }

  contributorMapper(repos,repoName) {
    let newArray = [];

    _.forEach(this.myResponse,(value) => {
      let obj = {};

      obj.id = value.id;
      obj.name = value.login;              
      obj.repo_name = repoName;
      obj.repo_id = repos[0].dataValues.id;

      newArray.push(obj);
    });

    return newArray;  
  }
}

module.exports = MapperService;
