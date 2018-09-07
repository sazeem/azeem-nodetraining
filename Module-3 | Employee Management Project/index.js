const http = require('http');
const bodyParser = require('body-parser');
const paginate = require('express-paginate');
const express = require('express');
const routes =require('./routes');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(paginate.middleware(1, 3));

routes(app);

const server = http.createServer(app);
const port = process.env.PORT || 3001;
server.listen(port);
console.log("Listening on port %s :", server.address().port);
