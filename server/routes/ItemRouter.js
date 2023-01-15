const Router = require('express')
const router = new Router()
const itemController = require('../controllers/ItemController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',itemController.create) //router.post('/',checkRole('ADMIN'),CategoryController.create)
router.get('/',itemController.getAll)
router.get('/:id',itemController.getOne)
router.delete('/:id', itemController.delete);
module.exports = router