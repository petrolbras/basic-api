import { Router } from 'express'

const userRouter = Router()

userRouter.get('/', (req, res) => {
    res.send({title: 'GET all users'})
})

userRouter.get('/:id', (req, res) => {
    res.send({title: 'GET user details'})
})

userRouter.post('/', (req, res) => {
    res.send({title: 'CREATE new user'})
})

userRouter.put('/', (req, res) => {
    res.send({title: 'UPDATE a user'})
})

userRouter.delete('/', (req, res) => {
    res.send({title: 'DELETE a user'})
})

export default userRouter