import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import logger from './utils/logger'
import { connectToDatabase, disconnectFromDatabase } from './utils/database'
import { CORS_ORIGIN } from './constants'
import helment from 'helmet'
import userRoute from './modules/user/user.route' 
import authRoute from './modules/auth/auth.route'

const Port = process.env.PORT || 4000

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: CORS_ORIGIN,
    credentials: true
}))

app.use(helment())

app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)

const server = app.listen(Port,async () => {
    await connectToDatabase()
    logger.info(`Server is running on port ${Port}`)
    }
)

const signals = ['SIGINT', 'SIGTERM']

const gracefulleShutdown = (signal: string) => {
    process.on(signal, async () => {
        logger.info(`Received ${signal}`)
        server.close()

        // disconnect from database
        await disconnectFromDatabase()
        logger.info(`Server is shutting down due to ${signal}`)
        
        process.exit(0)
    })
}

for (const signal of signals) {
    gracefulleShutdown(signal)
}