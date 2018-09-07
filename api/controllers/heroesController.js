const heroes = require('../model/heroesModel');
const _ = require('lodash');

const HeroesController = {

  getHeroes: (req,res) => {
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
    }, 500);
  },

  getHeroesById: (req,res) => {
    const id = req.params.id;  
    _.forEach(heroes,(value) => {
      if(value.id == id){
        return res.status(200).send(value);
      }
    })
  },

  addHeroes: (req,res) => {
    heroes.push(req.body);
    return res.status(201).send(req.body);
  },

  updateHeroes: (req,res) => {
    const id = req.body.id;
    _.forEach(heroes,(value) => {
      if(value.id == id){
        value.name = req.body.name;
        return res.status(201).send(req.body);
      }
    })
  },

  deleteHeroes: (req,res) => { 
    const id = req.params.id;
    let index = 0;

    _.forEach(heroes,(value) => {
      if(value.id == id){
        const hero = value;
        heroes.splice(index,1);
        res.status(200).send(hero);
      }
      index = index+1;
    })
  }
}

module.exports = HeroesController;
