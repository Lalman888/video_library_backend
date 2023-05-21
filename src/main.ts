import express from 'express'

const Port = process.env.PORT || 4000

const app = express()

const server = app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`)
    }
)

const signals = ['SIGINT', 'SIGTERM']

const gracefulleShutdown = (signal: string) => {
    process.on(signal, async () => {
        console.log(`Received ${signal}`)
        server.close()
        console.log(`Server is shutting down due to ${signal}`)
        
        // disconnect from database
        process.exit(0)
    })
}

for (const signal of signals) {
    gracefulleShutdown(signal)
}