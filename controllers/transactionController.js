const {prisma} = require('../config/prisma');

async function getAll(req, res) {
    try {
        const transactions = await prisma.transaction.findMany();
        res.status(200).send(transactions);
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Failed to get transactions'});
    }
}

async function getById(req, res) {
    try {
        const {id} = req.params

        if (!id || isNaN(id)) {
            res.status(400).send({message: `Unable to process the request with id ${id}`})
        }

        const transaction = await prisma.transaction.findUnique({
            where: {
                id: +id,
            },
        })

        res.status(200).send(transaction)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Failed to get transaction by id'});
    }
}

async function getByUserId(req, res) {
    try {
        const {id} = req.params

        if (!id || isNaN(id)) {
            res.status(400).send({message: `Unable to process the request with id ${id}`})
        }

        const transactions = await prisma.transaction.findMany({
            where: {
                userId: +id // Replace `userId` with the actual user ID you want to query
            }
        });

        res.status(200).send(transactions)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Failed to get transactions by userId'});
    }
}

async function create(req, res) {
    try {
        const transaction = await prisma.transaction.create({
            data: req.body,
        })
        res.status(201).send(transaction)
    } catch (error) {
        console.log(error)
        if (error.meta) {
            res.status(500).json(error.meta);
        }
        res.status(500).json({error: 'Failed to create transaction'});
    }
}


module.exports = {
    getAll,
    getById,
    getByUserId,
    create
};