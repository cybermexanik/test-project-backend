const Router = require('express')
const router = new Router()
const userRouter = require('./user.router')
const authRouter = require('./auth.router')

router.use('/auth', authRouter)
router.use('/users', userRouter)

module.exports = router