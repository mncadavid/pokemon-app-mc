const express = require('express');
const app = express();
const methodOverride = require('method-override');
const multer = require('multer');
const upload = multer({dest: 'public/uploads/'});
const routes = require('./routes');
require('dotenv').config();

//Middleware
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use('/pokemon', routes.pokemon);
app.use('/players', routes.players);
app.use('/teams', routes.teams);

app.listen(process.env.PORT, () => {
    console.log("Listening");
})

module.exports = {
    upload
}