const mongoose = require('mongoose');

const mongodb_pass = process.env.DBPASS;

mongoose.connect(mongodb_pass).then(()=>{
  console.log('Database Connected')
}).catch((error) => {
  console.log('Database not connected')
});

module.exports = mongoose;