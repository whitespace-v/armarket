const Router = require('express')
const router = new Router()
const categoryController = require('../controllers/CategoryController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',categoryController.create) //router.post('/',checkRole('ADMIN'),CategoryController.create)
router.get('/',categoryController.getAll)
router.delete('/:id', categoryController.delete);
module.exports = router