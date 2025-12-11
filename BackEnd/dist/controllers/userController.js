"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getAllUsers = exports.updateUserProfile = exports.getUserProfile = void 0;
const errorHandler_1 = require("../middleware/errorHandler");
const User_1 = __importDefault(require("../models/User"));
exports.getUserProfile = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const user = await User_1.default.findById(req.userId).select('-password');
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
exports.updateUserProfile = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { fullName, bio, profileImage } = req.body;
    const user = await User_1.default.findByIdAndUpdate(req.userId, {
        fullName,
        bio,
        profileImage,
    }, { new: true, runValidators: true });
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
exports.getAllUsers = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const users = await User_1.default.find().select('-password');
    res.json({
        success: true,
        count: users.length,
        users,
    });
});
exports.getUserById = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const user = await User_1.default.findById(req.params.userId).select('-password');
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
//# sourceMappingURL=userController.js.map