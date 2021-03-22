var express = require('express');
const user = require('../models/user');
var router = express.Router();

var passwordHash = require('password-hash');

// import model
const User = require('../models/user');

// function hashes password
function hashPassword(password){
  var hashedPassword = passwordHash.generate(password);
  return hashedPassword
}

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    const users = await User.find()
    res.json({users: users})
  } catch (error) {
    res.json({message: error})
  }
});


// add new user
router.post('/', async (req, res) => {
  try {
    // password must be hased before inserting user credentials in database
    req.body.password = hashPassword(req.body.password);  // hash password

    // Create new entry
    let newEntry = new User({
      username: req.body.username,
      password: req.body.password
    })

    // insert new entry into database
    const savedPost = await newEntry.save()
    .then(response => {
      res.status(200).json({ success:true })
    })
    .catch(err => {
      res.json({ success: false })
    })
    } catch (error) {
      console.log(error)
      res.status(400).json({ success:false })   
  }
})

// get entry for specific user
router.get('/:username', async function(req, res, next) {
  try {
    // initialize variables
    let username = req.params.username; // username
    let password = req.query.password;  // password

    // verify if password matches hashed database version
    // user entry is retrieved using username
    // the password is then verified using the "password-hash" library "verify" function
    const users = await User.find({ username: username })
    let passwordCheck = passwordHash.verify(password, users[0].password);

    // the user is verified only if there are no duplicate user ans
    // the password passes the hash verification.
    // Otherwise the 400 error is returned
    if (users.length === 1 && passwordCheck === true){ // user is found and verified
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
