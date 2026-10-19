import asyncHandler from 'express-async-handler';
import BlogPost from '../models/BlogPost.js';
import Comment from '../models/Comment.js';

// @desc    Get all blog posts
// @route   GET /api/blog
// @access  Public
const getPosts = asyncHandler(async (req, res) => {
  const posts = await BlogPost.find({}).populate('author', 'username').sort({ createdAt: -1 });
  res.json(posts);
});

// @desc    Get single blog post with comments
// @route   GET /api/blog/:id
// @access  Public
const getPostById = asyncHandler(async (req, res) => {
  const post = await BlogPost.findById(req.params.id).populate('author', 'username');

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  const comments = await Comment.find({ post: req.params.id })
    .populate('author', 'username')
    .sort({ createdAt: -1 });

  res.json({ post, comments });
});

// @desc    Create a blog post
// @route   POST /api/blog
// @access  Private
const createPost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  const post = await BlogPost.create({
    title,
    content,
    author: req.user._id,
  });

  res.status(201).json(post);
});

// @desc    Update a blog post
// @route   PUT /api/blog/:id
// @access  Private / Author only
const updatePost = asyncHandler(async (req, res) => {
  const post = await BlogPost.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  if (post.author.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to update this post');
  }

  post.title = req.body.title || post.title;
  post.content = req.body.content || post.content;

  const updatedPost = await post.save();
  res.json(updatedPost);
});

// @desc    Delete a blog post
// @route   DELETE /api/blog/:id
// @access  Private / Author only
const deletePost = asyncHandler(async (req, res) => {
  const post = await BlogPost.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  if (post.author.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to delete this post');
  }

  await Comment.deleteMany({ post: req.params.id });
  await post.deleteOne();
  res.json({ message: 'Post removed' });
});

export { getPosts, getPostById, createPost, updatePost, deletePost };
