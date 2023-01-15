const Router = require('express')
const router = new Router()
const brandController = require('../controllers/BrandController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',brandController.create) //router.post('/',checkRole('ADMIN'),CategoryController.create)
router.get('/',brandController.getAll)
router.delete('/:id', brandController.delete);
module.exports = router