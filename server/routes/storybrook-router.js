const auth = require('../auth')
const express = require('express')
const WorkController = require('../controllers/work-controller')
const UserController = require('../controllers/user-controller')
const LibraryController=require('../controllers/library-controller')
require("dotenv").config()
const upload = require('../Cloudinary/multer')
const router = express.Router()

router.post('/work', auth.verify, WorkController.createWork)
router.put('/work/:id', WorkController.updateWork)
router.delete('/work/:id', auth.verify, WorkController.deleteWorkById)
router.get('/work/:id', WorkController.getWorkById)
router.get('/works', WorkController.getWorks)

router.post('/register', UserController.registerUser)
router.post('/login',UserController.loginUser)
router.get('/logout',UserController.logoutUser)
router.get('/loggedIn', UserController.getLoggedIn)


router.get('/getUserData/:id',UserController.getUserData)
router.put('/updateUser',auth.verify,UserController.updateUser)
router.put('/updateUserIcon', upload.single("icon"), UserController.updateUserIcon)


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
router.put('/getOneUser/:email',auth.verify,UserController.getOneUser)
router.get('/getUsers',UserController.getUsers)



module.exports = router