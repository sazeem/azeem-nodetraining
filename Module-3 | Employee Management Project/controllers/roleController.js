var roles = require('../models/roleModel');

exports.getRole = (req,res) => {
  roles.findAll()
  .then(roles => {
    res.send(roles);
  })
}

exports.createRole = (req,res) => {
  const data = {     
    "RoleName": req.body.RoleName    
  }; 
  roles.create({
    RoleName:data.RoleName
  })
  .then(() => {
    res.json("New Role Added!");
  })
}

