const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = validateLoginInput = data => {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!validator.isAlphanumeric(data.username)) {
    errors.username = "Username is invalid";
  }

  if (validator.isEmpty(data.username)) {
    errors.username = "Username is required";
  }

  if (!validator.isLength(data.password, { min: 5, max: 30 })) {
    errors.password = "Password must have 5 character";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
