const express = require('express')
const router = express.Router();

//routes
router.get("/", (req, res) => {
    req.conn.query("SELECT * FROM todo", (error, result) => {
        if (error) {
            res.status(500).send("Error aayo")
        }
        res.render("index", { items: result.rows });
    })
})
router.post("/add-todo", (req, res) => {
    if (req.body.todo.trim() == '') res.redirect("/");
    else {
        req.conn.query("insert into todo (title) values ($1)", [req.body.todo], (error, result) => {
            if (error) {
                res.status(500).send("Error aayo  hai");
            }
            res.redirect('/');
        })
    }
})
router.post("/completed-todo", (req, res) => {
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
router.post("/remove-todo", (req, res) => {
    const id = parseInt(req.body.id);
    req.conn.query("delete from todo where id=$1", [id], (error, result) => {
        if (error) {
            res.sendStatus(500).send("error aayo")
        }
        res.redirect('/');
    })
})

module.exports = router;