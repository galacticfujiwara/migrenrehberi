const mongoose = require('mongoose');

module.exports = () => {
 
  mongoose.connection.on('open', () => {
    console.log('MongoDB: Connected');
  });

  mongoose.connection.on('error', () => {
    console.log('MongoDB: Failed');
  });
  mongoose.Promise = global.Promise;
};
