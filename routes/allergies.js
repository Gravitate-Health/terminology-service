const { Router } = require('express');
const allergiesController = require('../controllers/allergies-controller');

const router = Router();

router.get('/all',allergiesController.getAll ); //get every problem
//router.get('/:icpc2',problemListController ); //search by icpc2 string

module.exports = router;