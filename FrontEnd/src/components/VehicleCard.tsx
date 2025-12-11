import { useNavigate } from 'react-router-dom';
import type { Post } from '../services/postService';

interface VehicleCardProps {
    post: Post;
}

export default function VehicleCard({ post }: VehicleCardProps) {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/vehicles/${post._id}`)}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 cursor-pointer group flex flex-col h-full"
        >
            <div className="relative h-48 overflow-hidden">
                <img
                    src={post.image || 'https://images.unsplash.com/photo-1494905998402-395d579af905?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                    alt={post.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                />
                <div className="absolute top-3 right-3 bg-black/70 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                    {post.condition || 'Used'}
                </div>
                <div className="absolute top-3 left-3 bg-white/90 text-black text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                    {post.category || 'Vehicle'}
                </div>
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold truncate pr-2" title={post.title}>{post.title}</h3>
                </div>

                <div className="text-2xl font-extrabold text-black mb-3">
                    ${post.price?.toLocaleString() || 'N/A'}
                </div>

                <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">
                    {post.description}
                </p>

                <div className="mt-auto border-t border-gray-100 pt-3 flex justify-between items-center text-sm text-gray-500">
                    <div className="flex items-center">
                        {/* Location Icon */}
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        {post.location || 'Unknown'}
                    </div>
                    <div className="flex items-center">
                        <span className="font-medium text-black">
                            {post.author?.fullName || post.author?.username || 'Seller'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
