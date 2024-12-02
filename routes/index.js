const express = require('express');
const router = new express.Router();

router.use('/university', require('./university'));
router.use('/branch', require('./branch'));
router.use('/subject', require('./subject'));
router.use('/faculty', require('./faculty'));
router.use('/student', require('./student'));


module.exports = router;