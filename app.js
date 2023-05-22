//require
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const getConnection = require('./config/db');
const todoRoutes = require('./routes/todo.routes.');

//init
dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
const APP_PORT = process.env.PORT || 8000;
const conn = getConnection();

//middleware
app.use((req, res, next) => {
    req.conn = conn;
    next();
});

//routes
app.use('/',todoRoutes);

//server activation
app.listen(APP_PORT, () => {
    console.log('server is running in port ' + APP_PORT);
});