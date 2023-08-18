const { Router } = require('express');
const pregnancyController = require('../controllers/pregnancy-controller');

const router = Router();

router.get('/all',pregnancyController.getAll ); //get every problem
//router.get('/:icpc2',problemListController ); //search by icpc2 string

module.exports = router;