const Router = require('express')
const router = new Router()
const commentController = require('../controllers/CommentController')

router.post('/',commentController.create)
router.get('/',commentController.getAll)
router.delete('/:id', commentController.delete);
module.exports = router