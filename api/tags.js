const express = require('express');
const tagsRouter = express.Router();

const {getAllTags} = require('../db'); //function name??

tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /tags");

  // res.send({ message: 'hello from /tags! fuckers yeah' })
  next();
});

tagsRouter.get('/', async(req, res) =>{
  const tags = await getAllTags(); //function name??
  console.log('where am i')
  res.send({
    tags
  });
});

module.exports = tagsRouter;