const Router = require('express')
const router = new Router()
const userController = require('../controller/user.controller')
const roleMiddleware = require('../middleware/role.middleware')
const authMiddleware = require("../middleware/auth.middleware");
const accessMiddleware = require("../middleware/access.middleware");

router.use(authMiddleware)

router.get('/', roleMiddleware('Админ'), userController.getAllUsers)
router.get('/:id', accessMiddleware, userController.getOneUser)
router.patch('/:id/change-access', userController.changeUserAccess)


module.exports = router;