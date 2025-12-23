import { api } from './api';

export interface Post {
    _id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    condition: string;
    location: string;
    image: string;
    author: {
        _id: string;
        username: string;
        fullName: string;
        phone?: string;
        profileImage: string;
    };
    likes: string[];
    comments: {
        user: {
            _id: string;
            username: string;
            fullName: string;
            profileImage: string;
        };
        text: string;
        createdAt: string;
    }[];
    createdAt: string;
}

export const postService = {
    getAllPosts: async () => {
        const response = await api.get('/post');
        return response.posts as Post[];
    },

    getPostById: async (id: string) => {
        const response = await api.get(`/post/${id}`);
        return response.post as Post;
    },

    createPost: async (data: FormData) => {
        const response = await api.post('/post', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.post as Post;
    },
};
