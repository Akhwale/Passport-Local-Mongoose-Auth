const express = require("express");
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);
const mongoose = require("mongoose");
const dotenv = require('dotenv').config();
const passport = require('passport'); 
const cors = require("cors");
require('./passport');


const app = express();

app.use(
  cors({
    origin: `http://localhost:3000`,
    credentials: true, // Enable cookies and sessions
  })
);

app.use(express.json());



const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

const store = new MongoDBSession({
  uri: uri,
  collection: "sessions"
});

app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      secure: true,
      maxAge: 1800000, // 1 hour
      httpOnly: true,
      sameSite: 'strict', // Set the secure option to true
    },
  })
);


app.use(passport.initialize());
app.use(passport.session());


const userRouter = require('./routes/user.js');
app.use('/user', userRouter);



mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("You are connected to the database successfully");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(error => {
    console.error("Error connecting to the database:", error);
});


