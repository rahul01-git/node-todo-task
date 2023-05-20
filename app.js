//require
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser")

//init
dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
const APP_PORT = process.env.PORT || 8000;

//routes
let todos = [{ label: 'goto college', completed: true }, { label: 'cook your food', completed: false }];
app.get("/", (req, res) => {
    res.render("index", { items: todos });
})

app.post("/add-todo", (req, res) => {
    if (req.body.todo == '') res.redirect("/")
    else {
        todos = [...todos, { label: req.body.todo, completed: false }];
        res.redirect('/');
    }
})
app.post("/completed-todo", (req, res) => {
    const id = parseInt(req.body.id);
    todos[id].completed = !todos[id].completed
    res.redirect('/');
})
app.post("/remove-todo", (req, res) => {
    todos = todos.filter((todo, index) => index != req.body.delete)
    res.redirect('/');
})

//server activation
app.listen(APP_PORT, () => {
    console.log('server is running in port ' + APP_PORT);
});