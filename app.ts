import express from 'express';
import { PORT } from './config/env.ts'
import userRouter from './routes/user.routes.ts';
import subscriptionRouter from './routes/subscription.routes.ts';
import authRouter from './routes/auth.routes.ts';
import { connectToDatabase } from './database/postgres.ts';
import { errorMiddleware } from './middlewares/error.middleware.ts';

const app = express();

app.use(express.json)
app.use(express.urlencoded({extended: false}))

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/subscriptions', subscriptionRouter)

app.use(errorMiddleware)

app.get('/', (req, res) => {
    res.send('testewqeqw')
})

app.listen(PORT, async () => {
    console.log(`Server is running on ${PORT}`)

    await connectToDatabase()
})

