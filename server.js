const app = require("./app");

const port = process.env.PORT || 5000;

app.listen(port, err => {
  if (err) {
    return console.error(`Error: ${err.message}`);
  }
  console.log(`Server started on port ${port}...`);
});
