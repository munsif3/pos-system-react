const express = require("express");
const database = require("../config/database");
const router = express.Router();

/**
 * @route   GET api/v1/items
 * @desc    Get All Items
 * @access  Public
 */
router.get("/", (req, res) => {
  database
    .query("SELECT * FROM items")
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).send({ error: err }));
});

/**
 * @route   GET api/v1/items/:id
 * @desc    Get Item by ID
 * @access  Public
 */
router.get("/:id", (req, res) => {
  database
    .query("SELECT * FROM items WHERE item_id = ?", [req.params.id])
    .then(data => res.status(200).json(data[0]))
    .catch(err => res.status(500).send({ error: err }));
});

module.exports = router;
