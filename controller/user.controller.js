const {User} = require("../models/models");

class UserController {
    async getAllUsers(req, res) {
        const users = await User.findAll();
        return res.json(users);
    }

    async getOneUser (req, res) {
        const {id} = req.params;
        const user = await User.findOne({
            where: {id}
        })
        return res.json(user)
    }

    async changeUserAccess(req, res) {

        try {
            const {id} = req.params;
            const {status} = req.body;
            const currentUser = req.user;

            if(status === 'Online' && currentUser.role !== 'Админ'){
                return res.status(403).json({
                    message: 'У вас отсутствуют права администратора'
                })
            }

            if(status === 'Заблокирован' && currentUser.role !== 'Админ' && String(currentUser.id) !== String(id)){
                return res.status(403).json({
                    message: 'Нет доступа!'
                })
            }

            const user = await User.findByPk(id)
            if (!user) {
                return res.status(404).json({
                    message: 'Пользователь не найден'
                })
            }

            user.status = status;
            await user.save();

            return res.json(
                {
                    message: `Пользователь ${user.surname} ${user.first_name} ${user.patronymic} ${status.toLowerCase()}`
                }
            )

        } catch (err) {
            return res.status(500).json({
                message: 'Ошибка работы сервера!',
                error: err.message
            })
        }
    }
}

module.exports = new UserController()