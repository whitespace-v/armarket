const {Category} = require('../models/models')


class CategoryController {
    async create(req,res){
        const {name} = req.body
        const category = await Category.create({name})
        return res.json(category)
    }
    async getAll(req,res){
        const categories = await Category.findAll()
        return res.json(categories)
    }
    async delete(req,res){
        try{
            const {id} = req.params;
            await Category.findOne({where: {id}})
                .then( async data => {
                    if (data) {
                        await Category
                            .destroy({where: {id}})
                            .then(() => res.json('[-] Category deleted'))
                    } else return res.json(`[!] Doesn't exist in data base`)
                })
        } catch (e) {
            return res.json(e);
        }
    }
}

module.exports = new CategoryController()