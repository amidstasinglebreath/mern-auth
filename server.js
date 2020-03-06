const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const http = require('http').Server(app);
const path = require('path');
//const io = require('socket.io')(http);

const passport = require("passport");
const users = require("./routes/api/users");

const uri = process.env.MONGODB_URI;

//const Message = require('./models/Messages');

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
// DB Config
const db = process.env.MONGODB_URI || require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);
app.use(express.static(path.join(__dirname, "/client/build/")));
app.use("/",(req, res) => {res.send('Root,')});

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));