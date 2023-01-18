const {Item, ItemReviews} = require('../models/models')


class CommentController {
    async create(req,res){
        const {item, comment, mark} = req.body
        const review = await ItemReviews.create({comment, mark, itemId: item.id})
        const itemReviews = await ItemReviews.findAll({where: {itemId: item.id}})
        // среднее арифметическое оценок
        let sum = 0
        for (let i in itemReviews){
            sum += itemReviews[i].mark
        }
        const UpdatedItem = await Item.findOne({where: {id: item.id}})

        await Item.update({marksCount: UpdatedItem.marksCount + 1, mark: Math.round(sum / itemReviews.length)},
            { where: {id: item.id}},
        )

        return res.json(review)
    }
    async getAll(req,res){
        const reviews = await ItemReviews.findAll({order: [['id', 'DESC']]})
        return res.json(reviews)
    }
    async delete(req,res){
        try{
            const {id} = req.params;
            await ItemReviews.findOne({where: {id}})
                .then( async data => {
                    if (data) {
                        await ItemReviews
                            .destroy({where: {id}})
                            .then(() => res.json('[-] Category deleted'))
                    } else return res.json(`[!] Doesn't exist in data base`)
                })
        } catch (e) {
            return res.json(e);
        }
    }
}

module.exports = new CommentController()