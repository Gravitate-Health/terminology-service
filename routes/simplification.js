const { Router } = require('express');
const simplificationController = require('../controllers/simplification-controller');

const router = Router();

router.get('/all', simplificationController.getAll ); //get every simplification
//router.get('/:icpc2',problemListController ); //search by icpc2 string

module.exports = router;