const repos = require('../models/repoModel');
const Sequelize = require('sequelize');

exports.repoList = (req,res) => {
  
  const token = req.headers['campaign'];
  
  Request.get({     
    "headers": { "content-type" : "application/json", "Authorization" : token },
    "url": "https://api.github.com/users/:login/repos"
  },(error, response, body) => {    
    if(error) {
      return console.dir(error);
    }
    const myResp = JSON.parse(body);        
    res.send(myResp);        
  });
  repos.findAll().then(repos => {
    res.send(repos);
  });
  
}


