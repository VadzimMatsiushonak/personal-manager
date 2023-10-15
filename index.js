const express = require('express')
const {body, validationResult} = require('express-validator');
const app = express()
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const PORT = process.env.PORT || 3000
app.use(express.json())
app.listen(
    PORT,
    () => console.log(`App initialized on ${PORT}`)
)

app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany()
    res.status(200).send(users)
})

app.get('/users/:id', async (req, res) => {
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
})

app.post('/users', [
    body('email').notEmpty().withMessage('Email is required.'),
    body('password').notEmpty().withMessage('Password is required.')
], async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const user = await prisma.user.create({
        data: req.body,
    })

    res.status(200).send(user)
})


async function main() {
    // const users = await prisma.user.findMany()
    // console.log(users)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

function isNumeric(num) {
    return !isNaN(num)
}