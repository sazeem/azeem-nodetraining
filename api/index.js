const express = require ('express');
const bodyParser = require ('body-parser');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(bodyParser());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);  
  next();
});

routes(app);

const port = process.env.PORT || 3500;
app.listen(port, () => console.log(`Listening on port ${port}..`));

