const express = require('express');
const winston = require('winston');
const app = express();
const port = 3001;

// Winston logger setup
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculator-microservice' },
    transports: [
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
});

// Function to perform calculations
function calculate(operation, num1, num2) {
    num1 = parseFloat(num1);
    num2 = num2 !== undefined ? parseFloat(num2) : undefined;

    if (isNaN(num1)) {
        return { error: 'Invalid input parameters' };
    }

    let result;
    switch (operation) {
        case 'add':
            if (isNaN(num2)) return { error: 'Invalid input parameters' };
            result = num1 + num2;
            break;
        case 'subtract':
            if (isNaN(num2)) return { error: 'Invalid input parameters' };
            result = num1 - num2;
            break;
        case 'multiply':
            if (isNaN(num2)) return { error: 'Invalid input parameters' };
            result = num1 * num2;
            break;
        case 'divide':
            if (isNaN(num2)) return { error: 'Invalid input parameters' };
            if (num2 === 0) return { error: 'Cannot divide by zero' };
            result = num1 / num2;
            break;
        case 'exponent':
            if (isNaN(num2)) return { error: 'Invalid input parameters' };
            result = Math.pow(num1, num2);
            break;
        case 'sqrt':
            if (num1 < 0) return { error: 'Cannot calculate square root of a negative number' };
            result = Math.sqrt(num1);
            break;
        case 'modulo':
            if (isNaN(num2)) return { error: 'Invalid input parameters' };
            result = num1 % num2;
            break;
        default:
            return { error: 'Invalid operation' };
    }
    return { result };
}

// API endpoint
app.get('/:operation', (req, res) => {
    const operation = req.params.operation;
    const num1 = req.query.num1;
    const num2 = req.query.num2;

    const calculation = calculate(operation, num1, num2);

    if (calculation.error) {
        logger.error(calculation.error);
        return res.status(400).json(calculation);
    }

    logger.info(`New ${operation} operation requested: ${num1} ${num2 !== undefined ? operation + ' ' + num2 : ''}`);
    res.json(calculation);
});

// Start the server
app.listen(port, () => {
    console.log(`Calculator microservice listening at http://localhost:${port}`);
});
