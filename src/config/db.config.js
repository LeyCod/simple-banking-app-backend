const mongoose = require('mongoose');
require('dotenv').config();



mongoose.connect('mongodb+srv://emmanuelleyan:Kec5rn8CSu2E9P6h@cluster0.p2axgok.mongodb.net/?retryWrites=true&w=majority').then(()=>{
  console.log('Database Connected')
}).catch((error) => {
  console.log('Database not connected')
});

module.exports = mongoose;