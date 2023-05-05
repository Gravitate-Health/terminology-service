const { Router } = require('express');
const problemListController = require('../controllers/problem-list-controller');

const router = Router();

router.get('/all',problemListController.getAll ); //get every problem
//router.get('/:icpc2',problemListController ); //search by icpc2 string

module.exports = router;