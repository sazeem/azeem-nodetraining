const http = require('http');
const bodyParser = require('body-parser');
const paginate = require('express-paginate');
const express = require('express');
const routes =require('./routes');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
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
const port = process.env.PORT || 3001;
server.listen(port);
console.log("Listening on port %s :", server.address().port);
