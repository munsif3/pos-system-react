const express = require("express");
const util = require("util");
const database = require("../config/database");
const router = express.Router();

/**
 * @route   GET api/v1/order-details/:id
 * @desc    Get all Items for an Order
 * @access  Public
 */
router.get("/:id", (req, res) => {
  const sql = `SELECT d.order_no, d.item_id, d.qty, i.unit_price, i.name
              FROM items i, orders o, order_item_detail d
              WHERE o.order_no = ? 
              AND o.order_no = d.order_no 
              AND i.item_id = d.item_id`;
  database
    .query(sql, [req.params.id])
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).send({ error: err }));
});

/**
 * @route   PUT api/v1/order-details/id
 * @desc    Add items to an existing order or update the quantity
 * @access  Public
 */
router.put("/:id", (req, res) => {
  const orderNo = req.params.id;
  const items = req.body;
  let sql = "INSERT INTO order_item_detail (order_no,item_id, qty) VALUES ";
  items.forEach(element => {
    let x = util.format(
      "('%d','%d','%d'), ",
      orderNo,
      element["item_id"],
      element["qty"]
    );
    sql += x;
  });
  sql = sql.slice(0, -2);
  sql += " ON DUPLICATE KEY UPDATE qty = VALUES (qty);";

  database
    .query(sql)
    .then(data => res.status(204).json(data))
    .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;

// /**
//  * @route   POST api/v1/order-details
//  * @desc    Add items to a new order, id from last inserted order
//  * @access  Public
//  */
// router.post("/", (req, res) => {
//   const orderNo = req.body.orderNo;
//   const items = req.body.items;
//   let sql = "INSERT INTO order_item_detail (order_no,item_id,qty) VALUES ";
//   items.forEach(element => {
//     let x = util.format(
//       "('%d','%d','%d'), ",
//       orderNo,
//       element.itemId,
//       element.qty
//     );
//     sql += x;
//   });
//   sql = sql.slice(0, -2);

//   database
//     .query(sql)
//     .then(data => res.status(201).json(data))
//     .catch(err => res.status(500).send({ error: err }));
// });
