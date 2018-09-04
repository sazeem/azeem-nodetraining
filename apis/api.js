const Request = require("request");
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const _ = require('lodash');

app.use(express.json());
app.use(bodyParser());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4250');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});
const heroes = [
  { id: 11, name: 'Mr. Nicest' },
  { id: 12, name: 'Narco' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' }
];

app.get('/heroes', (req,res) => {
  if(req.query.name){
    const term = req.query.name;
    let list = [];
    _.forEach(heroes,(value) => {
      if(_.includes(value.name.toLowerCase(),term.toLowerCase())){
        list.push(value);
      }
    });
    return res.status(200).send(list);
  }
  setTimeout(function() {
    return res.status(200).send(heroes);
  }, 1000);
});

app.get('/heroes/:id', (req,res) => {
  const id = req.params.id;  
  _.forEach(heroes,(value) => {
    if(value.id == id){
      return res.status(200).send(value);
    }
  })  
});

app.post('/heroes',(req,res) => {
  heroes.push(req.body);
  return res.status(201).send(req.body);
});

app.put('/heroes', (req,res) => {
  const id = req.body.id;
  _.forEach(heroes,(value) => {
    if(value.id == id){
      value.name = req.body.name;
      return res.status(201).send(req.body);
    }
  })
});

app.delete('/heroes/:id',(req,res) => { 
  const id = req.params.id;
  let index = 0;

  _.forEach(heroes,(value) => {
    if(value.id == id){
      const hero = value;
      heroes.splice(index,1);
      return res.status(200).send(hero);
    }
    index = index+1;
  })
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}..`));
