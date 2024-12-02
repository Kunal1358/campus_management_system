const express = require('express')
const router = new express.Router()

const auth = require('../middleware/auth')
const subjectController = require('../controllers/subjectController')



router.get('/all', auth.authenticateUniversity, subjectController.getAllSubjects)

router.post('/create', auth.authenticateUniversity, subjectController.createSubject)

router.delete('/delete/:id', auth.authenticateUniversity, subjectController.deleteSubject)

router.put('/update/:id', auth.authenticateUniversity, subjectController.updateSubject)
















module.exports = router