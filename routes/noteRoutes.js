var express = require('express');
var router = express.Router();
var notes = require('../controller/notesController.js');

router.post("/create/", notes.createNote);
router.post("/update/:id/", notes.updateNote);
router.get("/:id/", notes.getNote);
router.get("/all/", notes.getAll);

module.exports = router;