const { Router } = require('express');
const vihController = require('../controllers/vih-controller');

const router = Router();

router.get('/all',vihController.getAll ); //get every problem
//router.get('/:icpc2',problemListController ); //search by icpc2 string

module.exports = router;