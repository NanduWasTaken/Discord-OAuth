
function connect() {

  const mongoose = require('mongoose');

  mongoose.connect(process.env.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });

}

module.exports = connect;
