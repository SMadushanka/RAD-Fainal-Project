import type { Response } from 'express';
import express from 'express';
import { authMiddleware, type AuthenticatedRequest } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';
import User from '../models/User';

const router = express.Router();

// Get user profile
router.get(
  '/profile',
  authMiddleware,
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const user = await User.findById(req.userId).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.json({
      success: true,
      user,
    });
  })
);

// Update user profile
router.put(
  '/profile',
  authMiddleware,
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { fullName, bio, profileImage } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        fullName,
        bio,
        profileImage,
      },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user,
    });
  })
);

// Get all users (sellers)
router.get(
  '/all',
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const users = await User.find().select('-password');

    res.json({
      success: true,
      count: users.length,
      users,
    });
  })
);

// Get user by ID
router.get(
  '/:userId',
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const user = await User.findById(req.params.userId).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.json({
      success: true,
      user,
    });
  })
);

export default router;
