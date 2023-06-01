const express = require("express");
const router = express.Router();


// Create a User using POST "/api/notes/". Doesn't require Auth
router.get("/", (req, res) => {
  obj =   {
    a: "thios",
    number : 34
  }
  res.json(obj)
})

module.exports = router;