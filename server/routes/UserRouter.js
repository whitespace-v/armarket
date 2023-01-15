const Router = require('express')
const router = new Router()
const UserController = require('../controllers/UserController')
const authMiddleware = require('../middleware/authMiddleware')

//router - controller
router.post('/registration', UserController.registration) //sign up
router.post('/login', UserController.login) //sign in
router.get('/auth',authMiddleware, UserController.check )  //check auth status

module.exports = router