const Router = require('express')
const router = new Router()
const availabilityController = require('../controllers/AvailabilityController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',availabilityController.create) //router.post('/',checkRole('ADMIN'),CategoryController.create)
router.get('/',availabilityController.getAll)
router.delete('/:id', availabilityController.delete);
module.exports = router