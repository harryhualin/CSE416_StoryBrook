const auth = require('../auth')
const express = require('express')
const WorkController = require('../controllers/work-controller')
const UserController = require('../controllers/user-controller')
const LibraryController=require('../controllers/library-controller')
const userModel = require('../models/user-model')
const libraryModel = require('../models/library-model')
const router = express.Router()

router.post('/work', auth.verify, WorkController.createWork)
router.put('/work/:id', auth.verify, WorkController.updateWork)
router.delete('/work/:id', auth.verify, WorkController.deleteWork)
router.get('/work/:id', WorkController.getWorkById)
router.get('/works', WorkController.getWorks)

router.post('/register', UserController.registerUser)
router.post('/login',UserController.loginUser)
router.get('/logout',UserController.logoutUser)
router.get('/loggedIn', UserController.getLoggedIn)
router.get('/getUserData',UserController.getUserData)
router.put('/updateUser/:email',UserController.updateUser)

router.post('/library', auth.verify, LibraryController.createLibrary)
router.put('/library/:id', auth.verify, LibraryController.updateLibrary)
router.delete('/library/:id', auth.verify, LibraryController.deleteLibrary)
router.get('/library/:id', auth.verify, LibraryController.getLibraryById)
router.get('/library', auth.verify,LibraryController.getAllLibrary)
router.get('/library/:name', auth.verify,LibraryController.getLibrariesByName)

router.post('/requestPasswordReset', UserController.sendUserEmail)
router.put('/resetPassword/:token/:id',  UserController.resetPassword)
router.post('/verifyEmail',UserController.verifyEmail)
router.put('/changePassword',auth.verify,UserController.changePassword)
module.exports = router