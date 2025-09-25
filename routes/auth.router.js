const Router = require('express')
const router = new Router()
const authController = require('../controller/auth.controller')
const authMiddleware = require('../middleware/auth.middleware')


router.post('/registration', authController.registration)
router.post('/login', authController.login)
router.get('/', authMiddleware, authController.authenticate)


module.exports = router;