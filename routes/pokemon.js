const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const multer = require('multer');
const upload = multer({
    dest: 'public/uploads/'
});

router.get('/', ctrl.pokemon.index);
router.get('/new', ctrl.pokemon.newRender);
router.get('/:index', ctrl.pokemon.show);
router.get('/:index/edit', ctrl.pokemon.editRender);
router.post('/', upload.single('img'),ctrl.pokemon.newPokemon);
router.put('/:index', ctrl.pokemon.editPokemon);
router.delete('/:index', ctrl.pokemon.deletePokemon);

module.exports = router;