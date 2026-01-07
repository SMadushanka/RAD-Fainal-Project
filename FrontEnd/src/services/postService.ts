import { api } from './api';

const BASE_URL = 'http://localhost:5000';

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

// Helper function to normalize image URLs
const normalizeImageUrl = (url: string | undefined): string => {
    if (!url) return '';
    if (url.startsWith('http') || url.startsWith('data:')) return url;
    return `${BASE_URL}${url}`;
};

// Normalize all image URLs in a post
const normalizePost = (post: Post): Post => {
    return {
        ...post,
        image: normalizeImageUrl(post.image),
        author: post.author ? {
            ...post.author,
            profileImage: normalizeImageUrl(post.author.profileImage)
        } : post.author,
        comments: post.comments?.map(comment => ({
            ...comment,
            user: comment.user ? {
                ...comment.user,
                profileImage: normalizeImageUrl(comment.user.profileImage)
            } : comment.user
        })) || []
    };
};

export const postService = {
    getAllPosts: async () => {
        const response = await api.get('/post');
        const posts = response.posts as Post[];
        return posts.map(normalizePost);
    },

    getPostById: async (id: string) => {
        const response = await api.get(`/post/${id}`);
        return normalizePost(response.post as Post);
    },

    getUserPosts: async (userId: string) => {
        const response = await api.get(`/post/user/${userId}`);
        const posts = response.posts as Post[];
        return posts.map(normalizePost);
    },

    createPost: async (data: FormData) => {
        const response = await api.post('/post', data);
        return normalizePost(response.post as Post);
    },

    updatePost: async (postId: string, data: FormData) => {
        const response = await api.put(`/post/${postId}`, data);
        return normalizePost(response.post as Post);
    },

    deletePost: async (postId: string) => {
        const response = await api.delete(`/post/${postId}`);
        return response;
    },
};

