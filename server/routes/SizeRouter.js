const Router = require('express')
const router = new Router()
const sizeController = require('../controllers/SizeController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', sizeController.create) //router.post('/',checkRole('ADMIN'),CategoryController.create)
router.get('/', sizeController.getAll)
router.delete('/:id', checkRole('ADMIN'), sizeController.delete);
module.exports = router