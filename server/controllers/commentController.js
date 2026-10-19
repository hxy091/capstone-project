import asyncHandler from 'express-async-handler';
import Comment from '../models/Comment.js';
import BlogPost from '../models/BlogPost.js';

// @desc    Get comments for a post
// @route   GET /api/blog/:postId/comments
// @access  Public
const getComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId })
    .populate('author', 'username')
    .sort({ createdAt: -1 });
  res.json(comments);
});

// @desc    Create a comment
// @route   POST /api/blog/:postId/comments
// @access  Private
const createComment = asyncHandler(async (req, res) => {
  const postExists = await BlogPost.findById(req.params.postId);
  if (!postExists) {
    res.status(404);
    throw new Error('Post not found');
  }

  const comment = await Comment.create({
    body: req.body.body,
    author: req.user._id,
    post: req.params.postId,
  });

  const populated = await comment.populate('author', 'username');
  res.status(201).json(populated);
});

export { getComments, createComment };
