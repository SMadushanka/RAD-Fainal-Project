import type { Response } from 'express';
import type { AuthenticatedRequest } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';
import User from '../models/User';

export const getUserProfile = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
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
});

export const updateUserProfile = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
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
});

export const getAllUsers = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const users = await User.find().select('-password');

    res.json({
        success: true,
        count: users.length,
        users,
    });
});

export const getUserById = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
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
});
