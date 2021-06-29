const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect(
    'mongodb+srv://Admin:9wHO0i4SBYm8uqyl@migren.5rk2p.mongodb.net/MigrenDB?retryWrites=true&w=majority',
    {useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true,poolSize:20},
  );
  mongoose.connection.on('open', () => {
    console.log('MongoDB: Connected');
  });

  mongoose.connection.on('error', () => {
    console.log('MongoDB: Failed');
  });
  mongoose.Promise = global.Promise;
};
