module.exports = function (req, res, next) {
    if(req.method === 'OPTIONS') {
        return next ()
    }

    try {
        if (!req.user) {
            return res.status(401).json(
                {
                    message: 'Не авторизован!'
                }
            )
        }

        const reqId = req.params.id
        if (req.user.role === 'Админ' || String(req.user.id) === reqId) {
            return next()
        }

        return res.status(403).json({ message: 'Нет доступа!' });

    } catch(err) {
        return res.status(403).json(
            {
                message: 'Нет доступа!', error: err
            }
        )
    }
}