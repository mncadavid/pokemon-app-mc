const Pokemon = require('../models').Pokemon;
const Player = require('../models').Player;
const {readdirSync} = require('fs');
const {rename} = require('fs');

const index = (req, res) => {
    Pokemon.findAll()
    .then(pokemon => {
        res.render('index.ejs', {
            pokemon: pokemon
          });
    })
}

const newRender = (req,res) => {
    res.render('new.ejs');
}

const show = (req,res) => {
    Pokemon.findByPk(req.params.index, {
        include: [
            { model: Player }
        ]
    })
    .then(foundPokemon => {
        res.render('show.ejs', {
            pokemon: foundPokemon
        });
    })
}

const editRender = (req,res) => {
    Pokemon.findByPk(req.params.index)
    .then(foundPokemon => {
        res.render('edit.ejs', {
            pokemon: foundPokemon
          })
    })
}

const newPokemon = (req, res) => {
    let extention = (req.file.originalname.split('.'))[1];
    let images = readdirSync('/Users/mc93195/wolves/week4/Pokemon-Express/public/uploads');
    images.forEach(image => {
        if (req.file.filename == image){
            rename(
                `/Users/mc93195/wolves/week4/Pokemon-Express/public/uploads/${image}`,
                `/Users/mc93195/wolves/week4/Pokemon-Express//public/uploads/${image}.${extention}`,
                err => console.log(err)
            )
        }
    })
    let filePath = `uploads/${req.file.filename}`;
    Pokemon.create({
        name: req.body.name,
        img: `/uploads/${req.file.filename}.${extention}`
    })
    .then(newPokemon => {
        res.redirect('/pokemon');
    })
}

const editPokemon = (req,res) => {
    Pokemon.update(req.body, {
        where: {id: req.params.index},
        returning: true
    })
    .then(updatedPokemon => {
        res.redirect('/pokemon');
    })
}

const deletePokemon = (req,res) => {
    Pokemon.destroy({
        where: {id: req.params.index}
    })
    .then(() => {
        res.redirect('/pokemon');
    })
}

module.exports = {
    index,
    newRender,
    show,
    editRender,
    newPokemon,
    editPokemon,
    deletePokemon
}