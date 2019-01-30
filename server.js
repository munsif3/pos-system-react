const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");

const items = require("./routes/items");
const orders = require("./routes/orders");
const orderDetails = require("./routes/orderItem");
const users = require("./routes/users");

require("./passport")(passport);

const port = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(cors());

app.use("/api/v1/items", items);
app.use("/api/v1/orders", orders);
app.use("/api/v1/order-details", orderDetails);
app.use("/api/v1/users", users);

app.listen(port, err => {
  if (err) {
    return console.error(`Error: ${err.message}`);
  }
  console.log(`Server started on port ${port}...`);
});
