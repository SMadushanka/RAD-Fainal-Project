import { api } from './api';

const BASE_URL = 'http://localhost:5000';

export interface User {
    _id: string;
    username: string;
    fullName: string;
    email: string;
    phone?: string;
    profileImage?: string;
    bio?: string;
    isVerified?: boolean;
    createdAt?: string;
}

// Helper function to normalize profile image URLs
const normalizeProfileImage = (user: User): User => {
    if (user.profileImage && !user.profileImage.startsWith('http') && !user.profileImage.startsWith('data:')) {
        return {
            ...user,
            profileImage: `${BASE_URL}${user.profileImage}`
        };
    }
    return user;
};

export const userService = {
    getAllSellers: async () => {
        const response = await api.get('/user/all');
        const users = response.users as User[];
        return users.map(normalizeProfileImage);
    },

    getUserById: async (id: string) => {
        const response = await api.get(`/user/${id}`);
        return normalizeProfileImage(response.user as User);
    },

    getUserProfile: async () => {
        const response = await api.get('/user/profile');
        return normalizeProfileImage(response.user as User);
    },

    updateProfile: async (data: Partial<User>) => {
        const response = await api.put('/user/profile', data);
        return normalizeProfileImage(response.user as User);
    },

    uploadProfilePhoto: async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append('photo', file);
        const response = await api.post('/user/upload-photo', formData);
        // Convert relative URL to full URL
        const photoUrl = response.photoUrl;
        return photoUrl.startsWith('http') ? photoUrl : `${BASE_URL}${photoUrl}`;
    },
};

