// API ROUTER
// api/index.js
const express = require('express');
const apiRouter = express.Router();

// JWT
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = process.env;
require('dotenv').config();

const {getUserById, createUser} = require('../db')

apiRouter.use(async(req, res, next) =>{
  const prefix = "Bearer";
  const auth = req.header('Authorization');
  // auth required to continue
  if(!auth){
    next();
  } else if (auth.startsWith(prefix)){
    const token = auth.slice(prefix.length); //prefix.length=7=BEARER.length
    try{

      const {id} = jwt.verify(token, JWT_SECRET);
      if(id){
        req.user = await getUserById(id);
        next();
      }
    } catch({name, message}) {
      next ({name, message});
    }
  } else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${prefix}`
    })
  }
});

apiRouter.use((req, res, next) => {
  if (req.user) {
    console.log("User is set:", req.user);
  }

  next();
});

const usersRouter = require('./users');
const postsRouter = require('./posts');
const tagsRouter = require('./tags');

apiRouter.use('/users', usersRouter);
apiRouter.use('/posts', postsRouter);
apiRouter.use('/tags', tagsRouter);





apiRouter.use((error, req, res, next)=>{
  res.send({
    name: error.name,
    message: error.massage
  })
})

module.exports = apiRouter;