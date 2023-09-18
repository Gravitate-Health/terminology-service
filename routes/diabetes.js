const { Router } = require('express');
const diabetesController = require('../controllers/diabetes-controller');

const router = Router();

router.get('/all',diabetesController.getAll ); //get every problem
//router.get('/:icpc2',problemListController ); //search by icpc2 string

module.exports = router;