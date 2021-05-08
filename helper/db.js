const mongoose = require('mongoose');

module.exports = () => {
  // mongoose.connect('mongodb+srv://keremy:Spordkit41@movie-api-oe8b1.mongodb.net/test?retryWrites=true&w=majority',{ useCreateIndex: true,useUnifiedTopology: true ,useNewUrlParser: true });
  mongoose.connect(
    'mongodb+srv://Admin:9wHO0i4SBYm8uqyl@migren.5rk2p.mongodb.net/MigrenDB?retryWrites=true&w=majority',
    {useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true},
  );
  mongoose.connection.on('open', () => {
    console.log('MongoDB: Connected');
  });

  mongoose.connection.on('error', () => {
    console.log('MongoDB: Failed');
  });
  mongoose.Promise = global.Promise;
};
