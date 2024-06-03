

const mongoose = require('mongoose');



const dbUrl = process.env.CONNNECTION_STRING; 

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
//mongoose.connect('mongodb://127.0.0.1/rentcardb')
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));



 

  