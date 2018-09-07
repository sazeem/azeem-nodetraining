const roles = require('../models/roleModel');

exports.getRole = (req,res) => {
  roles.findAll()
  .then(roles => {
    res.send(roles);
  })
}

exports.createRole = (req,res) => {
  const data = {     
    "name":req.body.name
  }; 
  roles.create({
    name:data.name
  })
  .then(() => {
    res.status(201).json("New Role Added!");
  })
  .catch((err) =>{
    res.status(400).send(err.parent.detail);
  });
}

