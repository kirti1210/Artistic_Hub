const express = require('express');
const router = express.Router();
const auth=require('./auth');


router.post('/register', auth.register);
router.post('/login', auth.login);
router.post('/feedback', auth.feedback);

module.exports = router;