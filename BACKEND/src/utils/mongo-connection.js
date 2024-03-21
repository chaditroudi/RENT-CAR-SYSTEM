

const mongoose = require('mongoose');

const dbUrl = 'mongodb+srv://rentcardb:sh7okhYoFpJx6ePj@cluster0.dtsd3hx.mongodb.net/'; 

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));



