import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    const currentUser = localStorage.getItem('currentUser');

    return (
        <nav className="bg-black text-white sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                <h1
                    className="text-2xl font-bold tracking-widest cursor-pointer"
                    onClick={() => navigate('/')}
                >
                    SPORTS ELITE
                </h1>
                <div className="flex items-center gap-8">
                    <button
                        onClick={() => navigate('/vehicles')}
                        className="text-sm font-light tracking-wide hover:text-gray-300 transition"
                    >
                        VEHICLES
                    </button>
                    <button
                        onClick={() => navigate('/sellers')}
                        className="text-sm font-light tracking-wide hover:text-gray-300 transition"
                    >
                        SELLERS
                    </button>
                    {currentUser ? (
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate('/create-post')}
                                className="text-sm font-light tracking-wide bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-400 transition font-semibold"
                            >
                                POST VEHICLE
                            </button>
                            <button
                                onClick={() => navigate('/my-posts')}
                                className="text-sm font-light tracking-wide hover:text-gray-300 transition"
                            >
                                MY POSTS
                            </button>
                            <button
                                onClick={() => navigate(`/profile/${currentUser}`)}
                                className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-xs font-bold"
                            >
                                {currentUser.charAt(0).toUpperCase()}
                            </button>
                            <button
                                onClick={() => {
                                    localStorage.removeItem('currentUser');
                                    localStorage.removeItem('token');
                                    localStorage.removeItem('userId');
                                    window.location.reload();
                                }}
                                className="text-sm font-light tracking-wide hover:text-gray-300 transition"
                            >
                                LOGOUT
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => navigate('/login')}
                            className="text-sm font-light tracking-wide border border-white px-6 py-2 hover:bg-white hover:text-black transition"
                        >
                            LOGIN
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}
