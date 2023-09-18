const { Router } = require('express');
const medinterController = require('../controllers/medication-interaction-controller');

const router = Router();

router.get('/all',medinterController.getAll ); //get every problem
//router.get('/:icpc2',problemListController ); //search by icpc2 string

module.exports = router;