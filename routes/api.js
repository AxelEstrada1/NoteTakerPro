const express = require('express');
const router = express.Router()
const uniqid = require('uniqid');
const fs = require("fs").promises;
// const { readAndAppend, readFromFile } = require("../helpers/readWrite")
// // GET Route for retrieving all the tips
router.get('/notes', (req, res) => {
    console.info(`${req.method} request received for tips`);
    fs.readFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});
router.post("/notes", (req, res) => {
    req.body.id = uniqid()
    console.log(req.body)
    fs.readFile('./db/db.json')
        .then((data) => {
            let note = JSON.parse(data)
            note.push(req.body)
            return note
        }).then((notes) => {
            fs.writeFile("./db/db.json", JSON.stringify(notes))
                .then(() => res.json(notes))
        })
})




module.exports = router;