const express = require("express");
const app = express()
const {startDB} = require('./prisma')
const userRoutes = require('../routes/userRoutes')
const transactionRoutes = require('../routes/transactionRoutes')
const pdfRoutes = require('../routes/pdfRoutes')

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await startDB(); // Call the initDB function

        app.use(express.json());
        app.listen(PORT, () => {
            console.log(`App initialized on ${PORT}`);
        });

        app.use('/users', userRoutes)
        app.use('/transactions', transactionRoutes)
        app.use('/pdf', pdfRoutes)
    } catch (error) {
        console.error('Failed to initialize the database:', error);
        process.exit(1);
    }
}


module.exports = {
    startServer
};