const Player = require('../models').Player;
const Team = require('../models').Team;
const Pokemon = require('../models').Pokemon;

const index = (req, res) => {
    res.render("players/index.ejs");
}
const signUpRender = (req, res) => {
    Team.findAll()
    .then(teams => {
        res.render("players/signup.ejs", {
            teams:teams
        });
    })
}
const signUp = (req,res) => {
    Player.create(req.body)
    .then(newPlayer => {
        res.redirect(`/players/profile/${newPlayer.id}`);
    })
}
const profileRender = (req,res) => {
    Player.findByPk(req.params.index, {
        include: [{
            model: Team},
            {model: Pokemon}]
    })
    .then(foundPlayer => {
        Team.findAll({raw: true}).then(results => {
            Pokemon.findAll()
            .then(pokemon => {
                res.render('players/profile.ejs', {
                    player: foundPlayer,
                    teams: results,
                    pokemon: pokemon
                })
            })
        })
    })
}
const editProfile = (req,res) => {
    console.log(req.body);
    Player.update(req.body, {
        where: {id: req.params.index},
        returning: true
    })
    .then(updatedPlayer => {
        Pokemon.findAll()
        .then(allPokemon => {
            for(let i=0; i<allPokemon.length; i++){
                let pname = allPokemon[i].name;
                if(`${pname}` in req.body){
                    Player.findByPk(req.params.index)
                    .then(foundPlayer => {
                        foundPlayer.addPokemon(allPokemon[i]);
                        })
                }
                else if(!(`${pname}` in req.body)){
                    Player.findByPk(req.params.index)
                    .then(foundPlayer => {
                        foundPlayer.removePokemon(allPokemon[i]);
                        })
                }
            }
            res.redirect(`/players/profile/${req.params.index}`);
        })
        // Pokemon.findByPk(req.body.pokemon)
        // .then(foundPokemon => {
        //     Player.findByPk(req.params.index)
        //     .then(foundPlayer => {
        //         foundPlayer.addPokemon(foundPokemon);
        //         res.redirect(`/players/profile/${req.params.index}`);
        //     })
        // })
    })
}
const deleteProfile = (req,res) => {
    Player.destroy({
        where: {id: req.params.index}
    })
    .then(() => {
        res.redirect('/players');
    })
}
const logInRender = (req, res) => {
    res.render('players/login.ejs');
}
const logIn = (req, res) => {
    Player.findAll()
    .then(players => {
        for(let i=0; i<players.length; i++){
            if(players[i].username === req.body.username){
                if(players[i].password === req.body.password){
                    res.redirect(`/players/profile/${players[i].id}`);
                    break;
                }
                else{
                    res.send("Incorrect Password")
                }
            }
        }
        res.send("Incorrect Username");
    })
}
module.exports= {
    index,
    signUpRender,
    signUp,
    profileRender,
    editProfile,
    deleteProfile,
    logInRender,
    logIn
}