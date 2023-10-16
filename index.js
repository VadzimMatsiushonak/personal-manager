const app = require('./config/express')
app.startServer().then(() => {
    console.log('Server started')
})