const { connect } = require('mongoose');
const { url } = require('./config');
console.log(url)
const dbConnection = async () => {
  try {
    await connect(url);
    console.log('DB conectada');
  } catch (err) {
    console.log('No se puede conectar a MongoDB:', err);
    process.exit(1);
  }
};

module.exports = { dbConnection };
