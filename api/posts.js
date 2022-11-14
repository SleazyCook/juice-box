const express = require('express');
const postsRouter = express.Router();
const { requireUser } = require('./utility');
const {getAllPosts, updatePost, getPostById, createPost} = require('../db');

postsRouter.post('/', requireUser, async (req, res, next) => {
  const {title, content, tags = ""} = req.body;
  const tagArr = tags.trim().split(/\s+/);
  const postData = {authorId, title, content};
  if(tagArr.length) {
    postData.tags = tagArr;
  }
  try {
    const post = await createPost(postData);
  } catch ({name, message}) {
    next({name, message});
  }
  res.send({ message: 'under construction' });
});

postsRouter.use((req, res, next) => {
  console.log("A request is being made to /posts");

  // res.send({ message: 'hello from /posts! fuckers yeah' })
  next();
});

postsRouter.patch('/:postId', requireUser, async (req, res, next) => {
  const { postId } = req.params;
  const { title, content, tags } = req.body;

  const updateFields = {};

  if (tags && tags.length > 0) {
    updateFields.tags = tags.trim().split(/\s+/);
  }

  if (title) {
    updateFields.title = title;
  }

  if (content) {
    updateFields.content = content;
  }

  try {
    const originalPost = await getPostById(postId);

    if (originalPost.author.id === req.user.id) {
      const updatedPost = await updatePost(postId, updateFields);
      res.send({ post: updatedPost })
    } else {
      next({
        name: 'UnauthorizedUserError',
        message: 'You cannot update a post that is not yours'
      })
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

postsRouter.get('/', async(req, res) =>{
  const posts = await getAllPosts();
  console.log('where am i')
  res.send({
    posts
  });
});

module.exports = postsRouter;