const employees = require('../models/employeeModel');
const _ = require('lodash');

exports.middleware = (req, res, next) => {
  const auth = req.headers['authorization'];
  let myvalues = [];

  employees.findAll({attributes:["name"]})
   .then(employees => {
    _.forEach(employees, function(value) {
        myvalues.push(value.dataValues.name);
    });    
    if(!auth) {              
      res.status(403).send("Need Proper Credentials!");    
    }
    else if(auth) {
      const tmp = auth.split(' ');
      const buf = Buffer.from(tmp[1], 'base64');
      const plain_auth = buf.toString();
      const creds = plain_auth.split(':');
      const username = creds[0];
      const password = creds[1];
      if(( (_.includes(myvalues,username)) && (password == 123456)) || ((username == 'admin') && (password == 'iamboss'))) {
        next();
      }
      else {
        res.status(403).send("Invalid Credentials!");    
      }
    }  
   })
   .catch(() => console.log("Error!"));
}

exports.admin = (req, res, next) => {
  
  const auth = req.headers['authorization'];  

  if(!auth) {              
    res.status(403).send("Need Proper Credentials!");    
  }
  else if(auth) {
    const tmp = auth.split(' ');
    const buf = Buffer.from(tmp[1], 'base64');
    const plain_auth = buf.toString();
    const creds = plain_auth.split(':');
    const username = creds[0];
    const password = creds[1];

    if((username == 'admin') && (password == 'iamboss')) {         
      next();
    }
    else {
      res.status(403).send("Invalid Credentials!");    
    }
  }  

}
