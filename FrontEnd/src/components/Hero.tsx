import { useNavigate } from 'react-router-dom';

export default function Hero() {
    const navigate = useNavigate();
    const currentUser = localStorage.getItem('currentUser');

    return (
        <div className="relative text-white py-24 overflow-hidden">
            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80"
                    alt="Luxury Vehicle Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <h2 className="text-6xl font-bold tracking-tight mb-4 leading-tight">
                    PREMIUM <br />
                    SPORTS VEHICLES
                </h2>
                <p className="text-xl font-light tracking-wide text-gray-300 mb-8 max-w-xl">
                    Discover exceptional performance. Trade with confidence in our exclusive marketplace.
                </p>
                <button
                    onClick={() => {
                        if (!currentUser) {
                            navigate('/login');
                        } else {
                            navigate('/create-post');
                        }
                    }}
                    className="bg-white text-black px-10 py-3 font-bold tracking-wide hover:bg-gray-200 transition"
                >
                    POST YOUR VEHICLE
                </button>
            </div>
        </div>
    );
}
