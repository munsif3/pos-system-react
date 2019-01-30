const express = require("express");
const database = require("../config/database");
const router = express.Router();

/**
 * @route   GET api/v1/orders
 * @desc    Get All Orders
 * @access  Public
 */
router.get("/", (req, res) => {
  database
    .query("SELECT * FROM orders WHERE is_open = true ORDER BY created_at DESC")
    .then(data => res.status(200).json(data))
    .catch(err =>
      res.status(500).send({
        error: err
      })
    );
});

/**
 * @route   POST api/v1/orders
 * @desc    Create an Order and recieve the order ID
 * @access  Public
 */
router.post("/", (req, res) => {
  const timestamp = new Date()
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  database
    .query("INSERT INTO orders (is_open,total_price,created_at) VALUES (?,?)", [
      1,
      0.0,
      timestamp
    ])
    .then(data => res.status(201).json(data.insertId))
    .catch(err =>
      res.status(500).send({
        error: err
      })
    );
});

router.put("/:id", (req, res) => {
  database
    .query("UPDATE orders SET total_price=? WHERE order_no=?", [
      req.body.total,
      req.params.id
    ])
    .then(data => res.status(204).json(data))
    .catch(err => res.status(500).json(err));
});

// @route   GET api/v1/orders/:id
// @desc    Get Order by ID
// @access  Public
router.get("/:id", (req, res) => {
  database
    .query("SELECT * FROM orders WHERE order_no = ?", [req.params.id])
    .then(data => res.status(200).json(data[0]))
    .catch(err => res.status(500).send({ error: err }));
});

module.exports = router;
