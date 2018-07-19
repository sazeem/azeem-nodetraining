const Request = require("request");
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(express.json());
app.use(bodyParser());

const middleware = function(req,res,next){

  const auth = req.headers['authorization'];  

  if(!auth) {              
    res.status(401).send("Need Proper Credentials!");    
  }
  else if(auth) {
    const tmp = auth.split(' ');
    const buf = Buffer.from(tmp[1], 'base64');
    const plain_auth = buf.toString();
    const creds = plain_auth.split(':');
    const username = creds[0];
    const password = creds[1];

    if((username == 'admin') && (password == 'campaignm')) {         
      next();
    }
    else {
      res.status(401).send("Invalid Credentials!");    
    }
  }  
};

app.get('/clients', (req,res) => {
  
  const token = req.headers['campaign'];
  Request.get({     
    "headers": { "content-type" : "application/json", "Authorization" : token },
    "url": "https://api.createsend.com/api/v3.1/clients.json"
  },(error, response, body) => {
    if(error) {
      return console.dir(error);
    }
    const myResp = JSON.parse(body);        
    res.send(myResp);        
  });
});

app.get('/clients/:clientId', (req,res) => {

  const clientId = req.params.clientId;
  const token = req.headers['campaign'];
  Request.get({
    "headers": { "content-type": "application/json", "Authorization" : token },
    "url": "https://api.createsend.com/api/v3.2/clients/"+clientId+".json"    
  },(error, response, body) => {
    if(error)
      return console.dir(error);
    const myResp = JSON.parse(body);      
    res.send(myResp);
  });
});

app.get('/clients/lists/:clientId', (req,res) => {

  const clientId = req.params.clientId;
  const token = req.headers['campaign'];
  Request.get({
    "headers": { "content-type": "application/json", "Authorization": token },
    "url": "https://api.createsend.com/api/v3.2/clients/"+clientId+"/lists.json"
  },(error, response, body) => {
    if(error)
      return console.dir(error); 
    else
      res.send(body);
  });
});

app.delete('/clients/:clientId', [middleware], (req,res) => {

  const clientId = req.params.clientId;
  const token = req.headers['campaign'];
  Request.delete({
    "headers": { "content-type": "application/json", "Authorization": token },
    "url": "https://api.createsend.com/api/v3.2/clients/"+clientId+".json"      
  },(error, response, body) => {
    if(error)
      return console.dir(error);  
    else
      res.send("The Client With the ClientId: "+clientId+ " deleted");   
  });
});

app.post('/client', [middleware], (req,res) => {   

  const token = req.headers['campaign'];
  const companyname = req.body["CompanyName"];
  const country = req.body["Country"];
  const timezone = req.body["TimeZone"];
    
  Request.post({
    "headers": { "content-type": "application/json", "Authorization": token },
    "url": "https://api.createsend.com/api/v3.2/clients.json",
    "body": JSON.stringify({
      "CompanyName": companyname,
      "Country": country,
      "TimeZone":timezone
    })
  },(error, response, body) => {
    if(error)
      return console.dir(error);      
    else
      res.send(body);    
  });  
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}..`));
