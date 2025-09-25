require('dotenv').config()
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const router = require('./routes/index')

const port = process.env.PORT || 8080

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router)

app.get('/', (req, res) => {
    res.send('Hello World!');
})

const startApp = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(port, () => console.log(`Сервер запущен на ${port} порту`))
    } catch (err) {
        console.log(err);
    }
}

startApp();