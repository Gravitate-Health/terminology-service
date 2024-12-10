const { Router } = require('express');
const pregnancyController = require('../controllers/pregnancy-controller');

const router = Router();

router.get('/all',pregnancyController.getAll ); //get every problem-

module.exports = router;