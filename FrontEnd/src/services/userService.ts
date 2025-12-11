import { api } from './api';

export interface User {
    _id: string;
    username: string;
    fullName: string;
    email: string;
    profileImage?: string;
    bio?: string;
}

export const userService = {
    getAllSellers: async () => {
        const response = await api.get('/user/all');
        return response.users as User[];
    },

    getUserById: async (id: string) => {
        const response = await api.get(`/user/${id}`);
        return response.user as User;
    },
};
