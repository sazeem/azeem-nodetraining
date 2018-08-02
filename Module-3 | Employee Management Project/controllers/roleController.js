var Role = require('../models/roleModel');

exports.createRole = (req,res) => {
  const data = { 
    "RoleID":req.body.RoleID, 
    "RoleName": req.body.RoleName    
  }; 
  Role.create({RoleID:data.RoleID, RoleName:data.RoleName})
  .then(() => {
    res.send("added new row");
  })
}

exports.getRole = (req,res) => {
  Role.findAll()
  .then(role => {
    res.send(role);
  })
}
