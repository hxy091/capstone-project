import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Blog post title is required'],
    trim: true,
  },
  content: {
    type: String,
    required: [true, 'Blog post content is required'],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

export default BlogPost;
