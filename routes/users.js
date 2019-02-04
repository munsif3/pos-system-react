const express = require("express");
const database = require("../config/database");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const validateLoginInput = require("../validation/login");

/**
 * @route   POST api/v1/users/login
 * @desc    Authenticates the user
 * @access  Public
 */
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const username = req.body.username;
  const password = req.body.password;
  database
    .query("SELECT * FROM user WHERE username = ?", [username])
    .then(user => {
      if (user.length < 1) {
        errors.username = "User not found";
        return res.status(404).json(errors);
      }
      bcrypt.compare(password, user[0].password).then(same => {
        if (same) {
          const payload = {
            id: user[0].id,
            name: user[0].name
          };
          jwt.sign(payload, "secret", { expiresIn: "12h" }, (err, token) => {
            if (err) console.error("There is some error in token", err);
            else {
              res.json({
                success: true,
                token: `Bearer ${token}`
              });
            }
          });
        } else {
          errors.password = "Incorrect Password";
          return res.status(400).json(errors);
        }
      });
    });
});

router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
