const express = require('express');
const router = new express.Router();

const auth = require('../middleware/auth');
const universityController = require('../controllers/universityController');



router.get('/all', auth.authenticateUniversity, universityController.getAllUniversities);

router.post('/signUp', universityController.signUp);

router.post('/signIn', universityController.signIn);

router.post('/logout', auth.authenticateUniversity, universityController.logOut);

router.get('/profile', auth.authenticateUniversity, universityController.profile);

router.put('/update', auth.authenticateUniversity, universityController.update);

router.delete('/delete', auth.authenticateUniversity, universityController.deleteUniversity);












module.exports = router;