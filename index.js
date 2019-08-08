const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require('./routes/api/users');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//DB config
const db = require('./config/keys').mogoURI;
//connect to MongoDB
mongoose
    .connect(db)
    .then(() => console.log("done"))
    .catch(err => console.log("++++++++++++++++++++++++++++++++++++++++++++++++"));

//passport middleware
app.use(passport.initialize());

// passport config
require("./config/passport")(passport);

app.use("/api/user", users);

const port = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("Mohamed El-Samman"));

app.listen(port, () => {
    console.log(`server running on port => ${port}`)
});
