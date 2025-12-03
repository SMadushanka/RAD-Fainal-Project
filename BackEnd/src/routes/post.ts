import type { Response } from 'express';
import express from 'express';
import mongoose from 'mongoose';
import { authMiddleware, type AuthenticatedRequest } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';
import Post from '../models/Post';

const router = express.Router();

// Create post
router.post(
  '/',
  authMiddleware,
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { title, description, image } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title and description are required',
      });
    }

    const newPost = new Post({
      title,
      description,
      image,
      author: req.userId,
    });

    await newPost.save();
    await newPost.populate('author', 'username fullName profileImage');

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      post: newPost,
    });
  })
);

// Get all posts
router.get(
  '/',
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const posts = await Post.find()
      .populate('author', 'username fullName profileImage')
      .populate('comments.user', 'username fullName profileImage')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: posts.length,
      posts,
    });
  })
);

// Get user posts
router.get(
  '/user/:userId',
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const posts = await Post.find({ author: req.params.userId })
      .populate('author', 'username fullName profileImage')
      .populate('comments.user', 'username fullName profileImage')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: posts.length,
      posts,
    });
  })
);

// Get single post
router.get(
  '/:postId',
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const post = await Post.findById(req.params.postId)
      .populate('author', 'username fullName profileImage')
      .populate('comments.user', 'username fullName profileImage');

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    res.json({
      success: true,
      post,
    });
  })
);

// Update post
router.put(
  '/:postId',
  authMiddleware,
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { title, description, image } = req.body;

    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    if (post.author.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this post',
      });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      { title, description, image },
      { new: true, runValidators: true }
    )
      .populate('author', 'username fullName profileImage')
      .populate('comments.user', 'username fullName profileImage');

    res.json({
      success: true,
      message: 'Post updated successfully',
      post: updatedPost,
    });
  })
);

// Delete post
router.delete(
  '/:postId',
  authMiddleware,
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    if (post.author.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this post',
      });
    }

    await Post.findByIdAndDelete(req.params.postId);

    res.json({
      success: true,
      message: 'Post deleted successfully',
    });
  })
);

// Like post
router.post(
  '/:postId/like',
  authMiddleware,
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    const userId = new mongoose.Types.ObjectId(req.userId);
    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      post.likes = post.likes.filter((id) => !id.equals(userId));
    } else {
      post.likes.push(userId);
    }

    await post.save();
    await post.populate('author', 'username fullName profileImage');
    await post.populate('comments.user', 'username fullName profileImage');

    res.json({
      success: true,
      message: isLiked ? 'Post unliked' : 'Post liked',
      post,
    });
  })
);

// Add comment
router.post(
  '/:postId/comment',
  authMiddleware,
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        message: 'Comment text is required',
      });
    }

    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    post.comments.push({
      user: new mongoose.Types.ObjectId(req.userId),
      text,
      createdAt: new Date(),
    });

    await post.save();
    await post.populate('author', 'username fullName profileImage');
    await post.populate('comments.user', 'username fullName profileImage');

    res.json({
      success: true,
      message: 'Comment added successfully',
      post,
    });
  })
);

export default router;
