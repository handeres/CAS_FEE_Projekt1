var express = require('express');
var router = express.Router();
var notes = require('../controller/notesController.js');

router.post("/create/", notes.createNote);
router.post("/update/:id/", notes.updateNote);
router.post("/remove/:id/", notes.delete);
router.get("/all/", notes.getAll);
router.get("/:id/", notes.getNote);

module.exports = router;