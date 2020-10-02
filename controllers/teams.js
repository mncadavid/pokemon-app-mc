const Team = require('../models').Team;
const Player = require('../models').Player;

const index = (req, res) => {
    Team.findAll()
    .then(teams => {
        res.render("teams/index.ejs", {
            teams: teams
        });
    })
}

const createRender = (req, res) => {
    res.render("teams/create.ejs");
}

const create = (req, res) => {
    Team.create(req.body)
    .then(team => {
        res.redirect('/teams');
    })
}

const show = (req, res) => {
    Team.findByPk(req.params.id, {
        include: [{model: Player}]
    })
    .then(team => {
        res.render('teams/show.ejs', {
            team: team
        })
    })
}
module.exports= {
    index,
    createRender,
    create,
    show
}