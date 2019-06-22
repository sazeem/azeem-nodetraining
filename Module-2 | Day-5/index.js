const Request = require("request");
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(express.json());
app.use(bodyParser());

app.get('/clients', (req,res) => {
  
  const token = req.headers['authorization'];
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
  const token = req.headers['authorization'];
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
  const token = req.headers['authorization'];
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

app.delete('/clients/:clientId', (req,res) => {

  const clientId = req.params.clientId;
  const token = req.headers['authorization'];
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

app.post('/client', (req,res) => {   

  const token = req.headers['authorization'];
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
