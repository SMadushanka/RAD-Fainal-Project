import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { userService, type User } from '../services/userService';

interface Seller extends User {
  rating: number;
  reviews: number;
  vehicleCount: number;
  joinedDate: string;
}

export default function Sellers() {
  const navigate = useNavigate();
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [minRating, setMinRating] = useState('');
  const [minListings, setMinListings] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  useEffect(() => {
    fetchSellers();
  }, []);

  const fetchSellers = async () => {
    try {
      const users = await userService.getAllSellers();
      // Transform backend users to include simulated stats for now
      // In a real app, these stats would come from the backend (e.g., aggregation of posts/reviews)
      const sellersWithStats: Seller[] = users.map(user => ({
        ...user,
        rating: 4.5 + Math.random() * 0.5,
        reviews: Math.floor(Math.random() * 50),
        vehicleCount: Math.floor(Math.random() * 10),
        joinedDate: '2023', // Default year for now
      }));
      setSellers(sellersWithStats.sort((a, b) => b.rating - a.rating));
    } catch (error) {
      console.error('Failed to fetch sellers:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSellers = sellers.filter(seller => {
    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      if (!seller.fullName.toLowerCase().includes(query) && !seller.username.toLowerCase().includes(query)) {
        return false;
      }
    }

    // Minimum rating filter
    if (minRating && seller.rating < parseFloat(minRating)) {
      return false;
    }

    // Minimum listings filter
    if (minListings && seller.vehicleCount < parseInt(minListings)) {
      return false;
    }

    return true;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'reviews':
        return b.reviews - a.reviews;
      case 'listings':
        return b.vehicleCount - a.vehicleCount;
      case 'name':
        return a.fullName.localeCompare(b.fullName);
      case 'rating':
      default:
        return b.rating - a.rating;
    }
  });

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-5xl font-bold tracking-tight mb-4">TRUSTED SELLERS</h2>
          <p className="text-lg font-light tracking-wide text-gray-300">Browse our network of verified dealers and premium sellers</p>
        </div>
      </div>

      {/* Sellers Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12 flex-grow w-full">
        {/* Search and Filters */}
        <div className="mb-12">
          <input
            type="text"
            placeholder="Search sellers by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded mb-6 focus:outline-none focus:border-black"
          />

          {/* Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-gray-50 rounded-lg border border-gray-200 mb-6">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2 tracking-widest">MINIMUM RATING</label>
              <select
                value={minRating}
                onChange={(e) => setMinRating(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
              >
                <option value="">All Ratings</option>
                <option value="4.5">4.5+ ⭐</option>
                <option value="4.6">4.6+ ⭐</option>
                <option value="4.7">4.7+ ⭐</option>
                <option value="4.8">4.8+ ⭐</option>
                <option value="4.9">4.9+ ⭐</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2 tracking-widest">MINIMUM LISTINGS</label>
              <select
                value={minListings}
                onChange={(e) => setMinListings(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
              >
                <option value="">All Sellers</option>
                <option value="3">3+ vehicles</option>
                <option value="5">5+ vehicles</option>
                <option value="8">8+ vehicles</option>
                <option value="10">10+ vehicles</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2 tracking-widest">SORT BY</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
              >
                <option value="rating">Highest Rating</option>
                <option value="reviews">Most Reviews</option>
                <option value="listings">Most Listings</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>

            <button
              onClick={() => {
                setSearchQuery('');
                setMinRating('');
                setMinListings('');
                setSortBy('rating');
              }}
              className="md:col-span-3 px-4 py-2 bg-gray-400 text-white font-bold text-sm tracking-widest hover:bg-gray-500 transition rounded mt-2"
            >
              RESET FILTERS
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
          </div>
        ) : (
          <>
            <div className="text-sm text-gray-600 mb-8 font-light">
              Showing {filteredSellers.length} of {sellers.length} sellers
            </div>

            {filteredSellers.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-gray-600 font-light">No sellers match your filters.</p>
                <p className="text-sm text-gray-500 mt-2">Try adjusting your search criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredSellers.map((seller) => (
                  <div
                    key={seller._id}
                    onClick={() => navigate(`/profile/${seller._id}`)}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer"
                  >
                    <div className="bg-gray-100 p-6 text-center border-b border-gray-200">
                      {seller.profileImage ? (
                        <img
                          src={seller.profileImage}
                          alt={seller.username}
                          className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full mx-auto mb-4 bg-gray-800 flex items-center justify-center text-white text-xl font-bold">
                          {seller.fullName?.charAt(0)?.toUpperCase() || seller.username?.charAt(0)?.toUpperCase() || '?'}
                        </div>
                      )}
                      <h3 className="text-xl font-bold tracking-tight mb-1">{seller.fullName}</h3>
                      <p className="text-xs text-gray-600 font-light">@{seller.username} • Joined {seller.joinedDate}</p>
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs font-bold text-gray-700 tracking-widest mb-1">RATING</div>
                          <div className="text-2xl font-bold">⭐ {seller.rating.toFixed(1)}</div>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-gray-700 tracking-widest mb-1">REVIEWS</div>
                          <div className="text-2xl font-bold text-gray-800">{seller.reviews}</div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <div className="text-xs font-bold text-gray-700 tracking-widest mb-2">ACTIVE LISTINGS</div>
                        <div className="text-3xl font-bold text-gray-800">{seller.vehicleCount}</div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/profile/${seller._id}`);
                        }}
                        className="w-full px-4 py-3 bg-black text-white font-bold text-sm tracking-wide hover:bg-gray-800 transition duration-300 mt-4"
                      >
                        VIEW PROFILE
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
