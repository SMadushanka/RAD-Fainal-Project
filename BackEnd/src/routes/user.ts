import express from 'express';
import {
  getAllUsers,
  getUserById,
  getUserProfile,
  updateUserProfile,
} from '../controllers/userController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// Get user profile
router.get('/profile', authMiddleware, getUserProfile);

// Update user profile
router.put('/profile', authMiddleware, updateUserProfile);

// Get all users (sellers)
router.get('/all', getAllUsers);

// Get user by ID
router.get('/:userId', getUserById);

export default router;
