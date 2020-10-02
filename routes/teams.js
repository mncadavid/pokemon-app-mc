const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/', ctrl.teams.index);
router.get('/create', ctrl.teams.createRender);
router.post('/create', ctrl.teams.create);
router.get('/:id', ctrl.teams.show);

module.exports = router;