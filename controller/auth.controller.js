const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ApiError = require('../error/api.error')
const {User} = require('../models/models');

const generateJwt = (id, email, role) => {
    return jwt.sign({id, email, role},
        process.env.JWT_SECRET,
        {expiresIn: '24h'}
    )
}

class AuthController {
    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where:{email}})
        if (!user) {
            return next(ApiError.badRequest('Пользователь не найден в системе!'))
        }
        let confirmPassword = bcrypt.compareSync(password, user.password)
        if(!confirmPassword) {
            return next (ApiError.badRequest('Пароль неверный!'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async registration(req, res, next) {
        const { surname, first_name, patronymic, date_of_birth, email, status, password, role } = req.body;

        if(!surname || !first_name || !patronymic || !date_of_birth || !email || !status || !password || !role){
            return next (ApiError).badRequest('Некорректные данные!')
        }

        const user = await User.findOne({where: {email}})
        if(user){
            return next(ApiError.badRequest('Некорректные данные!'))
        }
        const hashedPassword = await bcrypt.hash(password, 3)

        const newUser = await User.create({
            surname,
            first_name,
            patronymic,
            date_of_birth,
            status,
            email,
            password: hashedPassword,
            role
        })

        const token = generateJwt(newUser.id, newUser.role, newUser.email) ;
        return res.json({token})
    }

    async authenticate(req, res, next) {
        const token = generateJwt(req.user.id, req.user.role, req.user.email)
        return res.json({token})
    }
}

module.exports = new AuthController()