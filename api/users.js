// api/users.js
const express = require('express');
const usersRouter = express.Router();
// JWT
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = process.env;

const {getAllUsers, getUserByUsername} = require('../db');

usersRouter.use((req, res, next) => {
  console.log("A request is being made to /users");

  // res.send({ message: 'hello from /users! yeah' })
  next();
});

// first attempt at login
// usersRouter.post('/login', async(req, res) => {
//   console.log(req.body);
//   res.end();
// });

// check to see if someone is logged in
usersRouter.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  // request must have both
  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password"
    });
  }

  try {
    const user = await getUserByUsername(username); 

    if (user && user.password == password) {
      const newToken = jwt.sign({
        username: username //<<right?
      }, JWT_SECRET,{
        expiresIn:"1w"
      })
      // create token & return to user
      res.send({ message: "you're logged in!" });
    } else {
      next({ 
        name: 'IncorrectCredentialsError', 
        message: 'Username or password is incorrect'
      });
    }
  } catch(error) {
    console.log(error);
    next(error);
  }
});

usersRouter.get('/', async(req, res) =>{
  const users = await getAllUsers();
  console.log('where am i')
  res.send({
    users
  });
});

module.exports = usersRouter;