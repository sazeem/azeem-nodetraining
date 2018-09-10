const roles = require('../models/roleModel');

const RoleController = {
  getRoles : (req,res) => {
    let limit = req.query.limit;
    let page = req.query.page;
    let totalItems = 0;

    roles.findAll()
    .then(totalRoles => {
      totalItems = totalRoles.length;
      roles.findAll({
        limit: limit,
        offset: (page-1)*(limit)
      }).then(roles => {
        let data = {};
        data.totalItems = totalItems;
        data.items = roles;
        res.send(data);
      })
    }); 
  },
  createRole : (req,res) => {
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
}

module.exports = RoleController;
