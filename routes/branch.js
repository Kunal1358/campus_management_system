const express = require('express')
const router = new express.Router()

const auth = require('../middleware/auth')
const branchController = require('../controllers/branchController')





router.get('/all', auth.authenticateUniversity,branchController.getAllBranches)

router.post('/create', auth.authenticateUniversity,branchController.createBranch)

router.delete('/delete/:id', auth.authenticateUniversity,branchController.deleteBranch)

router.put('/update/:id', auth.authenticateUniversity,branchController.updateBranch)


















module.exports = router