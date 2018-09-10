const roles = require('../models/roleModel');

exports.getRole = (req,res) => {
  roles.findAll()
  .then(roles => {
    res.send(roles);
  })
}

exports.createRole = (req,res) => {
  const data = {
    "id":req.body.id,
    "name":req.body.name
  }; 
  roles.create({
    id:data.id,
    name:data.name
  })
  .then(() => {
    res.status(201).send(req.body);
  })
  .catch((err) =>{
    res.status(400).send(err.parent.detail);
  });
}

