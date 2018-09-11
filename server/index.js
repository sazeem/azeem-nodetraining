const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const routes =require('./routes');
const CronService = require('./services/cronService');
const app = express();
const paginate = require('express-paginate');

app.use(bodyParser.urlencoded({ 
  extended: true 
}));
app.use(bodyParser.json());

CronService.commits();
CronService.pullRequests();
CronService.contributors();
app.use(paginate.middleware(25, 50));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);  
  next();
});
  
routes(app);

const server = http.createServer(app);
const port = process.env.PORT || 3000;
server.listen(port);
console.log("Listening on port %s :", server.address().port);
