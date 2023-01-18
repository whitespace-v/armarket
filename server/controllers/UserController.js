const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const {User} = require('../models/models')
const jwt = require('jsonwebtoken')

const generateJWT = (id, login, role) => {
    return jwt.sign(
        {id, login, role}, process.env.SECRET_KEY, {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {                                //USER REGISTRATION
        const {login, password} = req.body                         //get number, password, role from request
        if (!login || !password) {                                         //if empty number and empty password - throw error
            return next(ApiError.badRequest('Некорректные данные! :( '))
        }

        const candidate = await User.findOne({where: {number: login}})                 //create candidate to authorization by finding his number in db

        if (candidate) {                                                        // if number of candidate already exist - > throw error
            return next(ApiError.badRequest('Этот номер телефона уже зарегестрирован! :( '))
        }

        const hashPassword = await bcrypt.hash(password, 5)                             //hashing password 5 times
        const user = await User.create({number: login, role: 'User', password: hashPassword})       //CREATE USER in db with number,role & hashed Password
        const token = generateJWT(user.id, user.login, user.role)                       //generate token with user id, number & role
        return res.json({token})                                                        //return JWT to client
    }

    async login(req, res, next) {
        const {login, password} = req.body                                                 //get number and password from request
        const user = await User.findOne({where: {number: login}})                                 //create this user
        if (!user) {                                                                      //check user in database by number
            return next(ApiError.internal('Пользователь не найден! :( '))                 //doesn't exist ? -> throw internal error
        }

        let comparePassword = bcrypt.compareSync(password, user.password)               //user exist? -> compare entered password with (decrypted) password in database

        if (!comparePassword){                                                         //passwords different ? -> throw internal error
            return next(ApiError.internal('Указан неверный пароль! :( '))
        }
        const token = generateJWT(user.id, user.number, user.role)                   //generate JWT with users id,number,role
        return res.json({token})                                                    //return JWT to client
    }

    async check(req, res, next) {                                                     //check authorization
        const token = generateJWT(req.user.id, req.user.login, req.user.role)      //generate JWT with users id,number,role
        return res.json({token})                                                  //return JWT to client
    }
}

module.exports = new UserController()