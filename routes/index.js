const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');
const { catchErrors } = require('./utils/catchErrors')

router.get('/', urlController.homePage);
router.get('/new/:url', catchErrors(urlController.createUrl));
router.get('/:url', catchErrors(urlController.goToUrl));

module.exports = router;
