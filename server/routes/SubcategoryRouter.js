const Router = require('express')
const router = new Router()
const subcategoryController = require('../controllers/SubcategoryController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',subcategoryController.create) //router.post('/',checkRole('ADMIN'),CategoryController.create)
router.get('/',subcategoryController.getAll)
router.delete('/:id', subcategoryController.delete);
module.exports = router