const express = require("express");
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');



// Create a User using POST "/api/auth/createuser". Doesn't require Auth
router.post("/", [
  body('email').isEmail(),
  body('name').isLength({ min: 5 }).withMessage('Name must be at least 5 characters long'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
],async (req, res) => {
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Check whether the user with this email exists already
  try{
  let user = await User.findOne({email : req.body.email});
    if(user){
      return res.status(400).json({error: "Sorry a user with this email already exists"})
    }
     user = await User.create({
    name : req.body.name,
    password: req.body.password,
    email: req.body.email
  })
  // .catch(err=> {console.log(err)
  // res.json({error: 'Please enter the unique email'})});
  // res.send(req.body);
  res.json(user)
}catch(error){
console.error(error.message);
  res.status(500).send("Some Error occured");
}
})

module.exports = router;