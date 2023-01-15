const {Subcategory} = require('../models/models')


class SubcategoryController {
    async create(req,res){
        const {name, category} = req.body
        const subcategory = await Subcategory.create({name, itemCategoryId: category.id})
        return res.json(subcategory)
        // console.log(category.id)
    }
    async getAll(req,res){
        if (req.query.id) {
            const subcategories = await Subcategory.findAll({where: {itemCategoryId: req.query.id}})
            return res.json(subcategories)
        } else {
            const subcategories = await Subcategory.findAll()
            return res.json(subcategories)
        }

    }
    async delete(req,res){
        try{
            const {id} = req.params;
            await Subcategory.findOne({where: {id}})
                .then( async data => {
                    if (data) {
                        await Subcategory
                            .destroy({where: {id}})
                            .then(() => res.json('[-] Subcategory deleted'))
                    } else  return res.json(`[!] Doesn't exist in data base`)
                })
        } catch (e) {
            return res.json(e);
        }
    }
}

module.exports = new SubcategoryController()