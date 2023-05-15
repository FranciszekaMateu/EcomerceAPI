const express = require('express');
const logger = require('../utils/logger');

const app = express();

app.get('/loggerTest', (req, res) => {
  logger.debug('debug log');
  logger.http('http log');
  logger.info('info log');
  logger.warning('warning log');
  logger.error('error log');
  logger.fatal('fatal log');
  res.send('Prueba de error completada, checkea tus logs');
});
