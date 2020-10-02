const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/', ctrl.players.index);
router.get('/signup', ctrl.players.signUpRender);
router.post('/signup', ctrl.players.signUp);
router.get('/profile/:index', ctrl.players.profileRender);
router.put('/profile/:index/edit', ctrl.players.editProfile);
router.delete('/profile/:index', ctrl.players.deleteProfile);
router.get('/login', ctrl.players.logInRender);
router.post('/login', ctrl.players.logIn);

module.exports = router;