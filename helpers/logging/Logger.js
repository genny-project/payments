/* Include dependencies */
const winston = require( 'winston' );

/* Create and export the logger */
module.exports = winston.createLogger({
  level: 'info',
  format: winston.format.combine( winston.format.timestamp(), winston.format.json()),
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ],
});
