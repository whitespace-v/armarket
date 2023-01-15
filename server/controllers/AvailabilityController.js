const {Availability} = require('../models/models')


class AvailabilityController {
    async create(req,res){
        const {name} = req.body
        const availability = await Availability.create({name})
        return res.json(availability)
    }
    async getAll(req,res){
        const availabilities = await Availability.findAll()
        return res.json(availabilities)
    }
    async delete(req,res){
        try{
            const {id} = req.params;
            await Availability.findOne({where: {id}})
                .then( async data => {
                    if (data) {
                        await Availability
                            .destroy({where: {id}})
                            .then(() => res.json('[-] Availability deleted'))
                    } else return res.json(`[!] Doesn't exist in data base`)
                })
        } catch (e) {
            return res.json(e);
        }
    }
}

module.exports = new AvailabilityController()