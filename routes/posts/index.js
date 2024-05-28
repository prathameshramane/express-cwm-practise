const express = require("express");

const router = express.Router();

// Sample API
router.get("/:year/:month", (req, res) => {
  // Params consists of url variables such as year, month, etc
  console.log(req.params);
  // Query consists of additional optional query params
  // eg ?sortBy=name&&search=App
  console.log(req.query);
  res.status(200).send("OK");
});

module.exports = router;
