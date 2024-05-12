import winston from "winston"

const customLevels = {
    levels: {
        fatal: 0,
        error: 1,
        warn: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: 'red',
        error: 'magenta',
        warn: 'yellow',
        info: 'blue',
        http: 'green',
        debug: 'white'
    }
}

export const devLogger = winston.createLogger({
    levels: customLevels.levels,
    transports: [
        new winston.transports.Console({
            level: 'debug',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevels.colors }),
                winston.format.timestamp(),
                winston.format.cli(),
            )
        })
    ]
})

export const prodLogger = winston.createLogger({
    levels: customLevels.levels,
    transports: [
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize({colors: customLevels.colors }),
                winston.format.timestamp(),
                winston.format.cli(),
            )
        }),
        new winston.transports.File({
            level: 'info',
            filename: './src/logs/errors.log',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            )
        })
    ]
})