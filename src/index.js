const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

// allows express parse incoming data
app.use(express.json());

app.post("/users", (req, res) => {
  console.log(req.body);
  res.send("Welcome to the app");
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
