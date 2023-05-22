//require
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const getConnection = require('./config/db');

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
app.get("/", (req, res) => {
    req.conn.query("SELECT * FROM todo", (error, result) => {
        if (error) {
            res.status(500).send("Error aayo")
        }
        res.render("index", { items: result.rows });
    })


})

app.post("/add-todo", (req, res) => {
    if (req.body.todo == '') res.redirect("/")
    req.conn.query("insert into todo (title) values ($1)", [req.body.todo], (error, result) => {
        if (error) {
            res.status(500).send("Error aayo  hai");
        }
        res.redirect('/');
    })
})
app.post("/completed-todo", (req, res) => {
    const id = parseInt(req.body.id);
    req.conn.query("select * from todo where id=$1", [id], (error, result) => {
        if (error) {
            res.sendStatus(500).send("error aayo")
        }
        req.conn.query("UPDATE todo SET iscomplete=$1 where id=$2", [!result.rows[0].iscomplete, id], (error, result) => {
            if (error) {
                res.sendStatus(500).send("error aayo")
            }
            res.redirect('/');
        })
    })
})
app.post("/remove-todo", (req, res) => {
    const id = parseInt(req.body.id);
    req.conn.query("delete from todo where id=$1", [id], (error, result) => {
        if (error) {
            res.sendStatus(500).send("error aayo")
        }
        res.redirect('/');
    })
})

//server activation
app.listen(APP_PORT, () => {
    console.log('server is running in port ' + APP_PORT);
});