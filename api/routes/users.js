var express = require('express');
const user = require('../models/user');
var router = express.Router();

// import model
const User = require('../models/user');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    const users = await User.find()
    res.json({users: users})
  } catch (error) {
    res.json({message: error})
  }
});

router.post('/', async (req, res) => {
  try {
    let new_user = new User(req.body);
    console.log(new_user)
    const savedPost = await new_user.save()
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      console.log(err)
      res.json({ message: err })
    })
    } catch (error) {
    res.json({message: error})
  }
})

// get entry for specific user
router.get('/:username', async function(req, res, next) {
  try {
    // initialize variables
    let username = req.params.username; // username
    let password = req.query.password;  // password
    // retrieve from databasen using username password as filter
    const users = await User.find({username: username, password: password})


    if (users.length === 1 ){ // user is found/verified
      res.status(200).json({ response: users });    
    }
    else{ // one or more credentials is not valid
      res.status(400).json({ response: null });
    }
  } catch (error) {
    res.status(400).json({ success: false });
  }
});

module.exports = router;
