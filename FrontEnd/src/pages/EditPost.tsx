import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { postService } from '../services/postService';

export default function EditPost() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        category: 'Car',
        condition: 'Used',
        location: '',
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!id) return;
        const fetchPost = async () => {
            try {
                const post = await postService.getPostById(id);
                setFormData({
                    title: post.title,
                    description: post.description,
                    price: post.price.toString(),
                    category: post.category,
                    condition: post.condition,
                    location: post.location,
                });
                setImagePreview(post.image);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch post details');
            } finally {
                setInitialLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;

        setLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            const data = new FormData();
            data.append('title', formData.title);
            data.append('description', formData.description);
            data.append('price', formData.price);
            data.append('category', formData.category);
            data.append('condition', formData.condition);
            data.append('location', formData.location);
            if (imageFile) {
                data.append('image', imageFile);
            }

            // Using postService updatePost
            await postService.updatePost(id, data);

            navigate('/my-posts');
        } catch (err: any) {
            setError(err.message || 'Failed to update post');
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) {
        return (
            <div className="bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black" />
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col font-sans">
            <Navbar />

            <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
                    <div>
                        <h2 className="text-center text-3xl font-extrabold text-gray-900 tracking-tight">
                            Edit Vehicle
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Update your vehicle details
                        </p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700 text-sm">
                                {error}
                            </div>
                        )}

                        <div className="rounded-md shadow-sm space-y-4">
                            {/* Title */}
                            <div>
                                <label htmlFor="title" className="block text-sm font-bold text-gray-700 mb-1">
                                    Vehicle Title
                                </label>
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    required
                                    className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                    placeholder="e.g. 2023 Porsche 911 GT3"
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Price */}
                                <div>
                                    <label htmlFor="price" className="block text-sm font-bold text-gray-700 mb-1">
                                        Price ($)
                                    </label>
                                    <input
                                        id="price"
                                        name="price"
                                        type="number"
                                        required
                                        className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                        placeholder="e.g. 150000"
                                        value={formData.price}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Location */}
                                <div>
                                    <label htmlFor="location" className="block text-sm font-bold text-gray-700 mb-1">
                                        Location
                                    </label>
                                    <input
                                        id="location"
                                        name="location"
                                        type="text"
                                        required
                                        className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                        placeholder="e.g. Los Angeles, CA"
                                        value={formData.location}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Category */}
                                <div>
                                    <label htmlFor="category" className="block text-sm font-bold text-gray-700 mb-1">
                                        Category
                                    </label>
                                    <select
                                        id="category"
                                        name="category"
                                        required
                                        className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 text-gray-900 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                        value={formData.category}
                                        onChange={handleChange}
                                    >
                                        <option value="Car">Car</option>
                                        <option value="SUV">SUV</option>
                                        <option value="Van">Van</option>
                                        <option value="Bike">Bike</option>
                                        <option value="Truck">Truck</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                {/* Condition */}
                                <div>
                                    <label htmlFor="condition" className="block text-sm font-bold text-gray-700 mb-1">
                                        Condition
                                    </label>
                                    <select
                                        id="condition"
                                        name="condition"
                                        required
                                        className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 text-gray-900 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                        value={formData.condition}
                                        onChange={handleChange}
                                    >
                                        <option value="Used">Used</option>
                                        <option value="New">New</option>
                                    </select>
                                </div>
                            </div>

                            {/* Image Upload */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">
                                    Vehicle Image
                                </label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-black transition cursor-pointer relative bg-gray-50">
                                    <input
                                        id="image-upload"
                                        name="image"
                                        type="file"
                                        accept="image/*"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        onChange={handleImageChange}
                                    />
                                    <div className="space-y-1 text-center">
                                        {imagePreview ? (
                                            <img src={imagePreview} alt="Preview" className="mx-auto h-48 object-cover rounded-md" />
                                        ) : (
                                            <>
                                                <svg
                                                    className="mx-auto h-12 w-12 text-gray-400"
                                                    stroke="currentColor"
                                                    fill="none"
                                                    viewBox="0 0 48 48"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                                <div className="flex text-sm text-gray-600 justify-center">
                                                    <span className="relative cursor-pointer bg-white rounded-md font-medium text-black hover:text-gray-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-black">
                                                        Upload a file
                                                    </span>
                                                    <p className="pl-1">or drag and drop</p>
                                                </div>
                                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-bold text-gray-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    required
                                    rows={4}
                                    className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                    placeholder="Describe features, history, and upgrades..."
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => navigate('/my-posts')}
                                className="flex-1 py-3 px-4 border border-black text-sm font-bold rounded-lg text-black hover:bg-gray-50"
                            >
                                CANCEL
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-black hover:bg-gray-800 disabled:opacity-50"
                            >
                                {loading ? 'SAVING...' : 'SAVE CHANGES'}
                            </button>
                        </div>
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
}
