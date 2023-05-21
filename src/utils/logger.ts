import  pino  from "pino";

// pino is used for logging in the application 
// Create a logger instance
const logger = pino({
    transport: {
        target: 'pino-pretty', 
        options: {
            colorize: true,
        }
    }
});

export default logger;