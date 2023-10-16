const {prisma} = require('../config/prisma');

async function getAll(req, res) {
    try {
        const users = await prisma.user.findMany();
        res.status(200).send(users);
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Failed to get users'});
    }
}

async function getById(req, res) {
    try {
        const {id} = req.params

        if (!id || isNaN(id)) {
            res.status(400).send({message: `Unable to process the request with id ${id}`})
        }

        const user = await prisma.user.findUnique({
            where: {
                id: +id,
            },
        })

        res.status(200).send(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Failed to get user by id'});
    }
}

async function create(req, res) {
    try {
        const user = await prisma.user.create({
            data: req.body,
        })
        res.status(201).send(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Failed to create user'});
    }
}

module.exports = {
    getAll,
    getById,
    create
};