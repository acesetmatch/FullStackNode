const express = require('express');
const mongoose = require("mongoose");
const cookieSession = require("cookie-session")
const passport = require("passport")
require("./models/User");
require('./services/passport');
const bodyParser = require("body-parser")
const keys = require("./config/keys");

mongoose.connect(keys.mongoURI)

const app = express();

/** middlewares to intercept every incoming requests. */

// user application/json.
app.use(bodyParser.json());

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);


app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets
    // like our main.js file or main.css file!

    app.use(express.static('client/build')); // If any get requests come in and express doesn't understand then look into client/build to see if there is a file at main.js

    const path = require('path');

    // if the route we don't know about in express, do a catch all and return back index.html
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })

} 

const PORT = process.env.PORT || 5000;
app.listen(PORT);
