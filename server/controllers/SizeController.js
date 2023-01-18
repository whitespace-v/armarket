const {ItemSizes} = require('../models/models')


class SizeController {
    async create(req,res){
        const {id, size} = req.body
        const response = await ItemSizes.create({size, itemId: id})
        return res.json(response)
    }
    async getAll(req,res){
        const sizes = await ItemSizes.findAll()
        return res.json(sizes)
    }
    async delete(req,res){
        try{
            const {id} = req.params;
            await ItemSizes.findOne({where: {id}})
                .then( async data => {
                    if (data) {
                        await ItemSizes
                            .destroy({where: {id}})
                            .then(() => res.json('[-] Size deleted'))
                    } else return res.json(`[!] Doesn't exist in data base`)
                })
        } catch (e) {
            return res.json(e);
        }
    }
}

module.exports = new SizeController()