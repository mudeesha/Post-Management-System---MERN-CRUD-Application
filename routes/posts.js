const express = require('express');
const Posts = require('../models/posts');

const router = express.Router();

//save posts
router.post('/post/save', async (req, res) => {
    try {
      const newPost = new Posts(req.body);
      await newPost.save();
  
      return res.status(200).json({
        success: "Post saved successfully"
      });
    } catch (err) {
      return res.status(400).json({
        error: err.message
      });
    }
  });

  //get posts 
  router.get('/posts', (req, res) => {
    Posts.find()
      .exec()
      .then((posts) => {
        return res.status(200).json({
          success: true,
          existingPosts: posts,
        });
      })
      .catch((err) => {
        return res.status(400).json({
          error: err,
        });
      });
  });

  //get a spefic post
  router.get('/post/:id', (req, res) => {
    const postId = req.params.id;
  
    Posts.findById(postId)
      .exec()
      .then((post) => {
        if (!post) {
          return res.status(404).json({
            success: false,
            message: "Post not found",
          });
        }
  
        return res.status(200).json({
          success: true,
          post
        });
      })
      .catch((err) => {
        return res.status(400).json({
          error: err,
        });
      });
  });
  

  
  //update post
  router.put('/post/update/:id', (req, res) => {
    const postId = req.params.id;
    const updatedPost = req.body;
  
    Posts.findByIdAndUpdate(postId, { $set: updatedPost })
      .exec()
      .then(() => {
        return res.status(200).json({
          success: true,
          message: "Post updated successfully",
        });
      })
      .catch((err) => {
        return res.status(400).json({
          error: err,
        });
      });
  });

  //delete a post
  router.delete('/post/delete/:id', (req, res) => {
    const postId = req.params.id;
  
    Posts.findByIdAndDelete(postId)
      .exec()
      .then(() => {
        return res.status(200).json({
          success: true,
          message: "Post deleted successfully",
        });
      })
      .catch((err) => {
        return res.status(400).json({
          error: err,
        });
      });
  });

module.exports = router;