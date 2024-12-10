const { Router } = require('express');
const codesController = require('../controllers/codes-controller');

const router = Router();

router.get('/all',codesController.getAll ); //get every problem-

module.exports = router;