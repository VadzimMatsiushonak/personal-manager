const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

let users = [
    {
        login: 'root',
        password: 'pass'
    },
    {
        login: 'vadzim',
        password: 'pass'
    }
]

app.get('/users', (req, res) => {
    res.status(200).send(users)
})

app.get('/users/:id', (req, res) => {
    const {id} = req.params

    if (!id || id >= users.length) {
        res.status(200).send({message: `No user found with id ${id}`})
    }
    res.status(200).send(users[id])
})

app.post('/users/:id', (req, res) => {
    const {id} = req.params
    const {login} = req.body
    const {password} = req.body

    if (!id || id >= users.length) {
        res.status(200).send({message: `No user found with id ${id}`})
    }

    let user = users[id];
    if (login) {
        user.login = login
    }
    if (password) {
        user.password = password
    }
    res.status(200).send(user)
})

app.listen(
    PORT,
    () => console.log(`App initialized on ${PORT}`)
)