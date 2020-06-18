const { Router } = require('express');
const { logger } = require('../config');

const TestController = require('../controllers/Test.controller');

const testRules = require('../validators/test.rule');


const dependencies = { logger /* Poor boy, no deps for now */ };
const router = new Router();

const testController = new TestController(dependencies);


router.post('/v1/test', testRules, testController.test);

module.exports = router;
