import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Seller {
  name: string
  image: string
  rating: number
  reviews: number
  vehicleCount: number
  joinedDate: string
}

export default function Sellers() {
  const navigate = useNavigate()
  const [sellers, setSellers] = useState<Seller[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [minRating, setMinRating] = useState('')
  const [minListings, setMinListings] = useState('')
  const [sortBy, setSortBy] = useState('rating')

  useEffect(() => {
    // Get all sellers from localStorage
    const keys = Object.keys(localStorage)
    const sellerMap = new Map<string, Seller>()

    // Extract sellers from user data
    keys.forEach(key => {
      if (key.startsWith('user_')) {
        const userData = JSON.parse(localStorage.getItem(key) || '{}')
        const sellerName = key.replace('user_', '')
        
        if (!sellerMap.has(sellerName)) {
          sellerMap.set(sellerName, {
            name: sellerName,
            image: userData.image || 'https://i.pravatar.cc/150?img=0',
            rating: 4.5 + Math.random() * 0.5,
            reviews: Math.floor(Math.random() * 300) + 20,
            vehicleCount: Math.floor(Math.random() * 15) + 1,
            joinedDate: '2023'
          })
        }
      }
    })

    // Add default sellers from vehicles
    const defaultSellers = [
      {
        name: 'BMW Dealer',
        image: 'https://i.pravatar.cc/150?img=1',
        rating: 4.8,
        reviews: 156,
        vehicleCount: 5,
        joinedDate: '2022'
      },
      {
        name: 'Luxury Motors',
        image: 'https://i.pravatar.cc/150?img=2',
        rating: 4.9,
        reviews: 89,
        vehicleCount: 3,
        joinedDate: '2023'
      },
      {
        name: 'Speed Bikes',
        image: 'https://i.pravatar.cc/150?img=3',
        rating: 4.7,
        reviews: 234,
        vehicleCount: 8,
        joinedDate: '2021'
      },
      {
        name: 'Auto Exchange',
        image: 'https://i.pravatar.cc/150?img=4',
        rating: 4.6,
        reviews: 112,
        vehicleCount: 6,
        joinedDate: '2022'
      },
      {
        name: 'Commercial Traders',
        image: 'https://i.pravatar.cc/150?img=5',
        rating: 4.8,
        reviews: 78,
        vehicleCount: 4,
        joinedDate: '2023'
      },
      {
        name: 'Used Car Hub',
        image: 'https://i.pravatar.cc/150?img=6',
        rating: 4.5,
        reviews: 156,
        vehicleCount: 12,
        joinedDate: '2020'
      },
      {
        name: 'Heavy Duty Motors',
        image: 'https://i.pravatar.cc/150?img=7',
        rating: 4.7,
        reviews: 92,
        vehicleCount: 7,
        joinedDate: '2021'
      }
    ]

    // Merge default sellers with user sellers
    defaultSellers.forEach(seller => {
      if (!sellerMap.has(seller.name)) {
        sellerMap.set(seller.name, seller)
      }
    })

    setSellers(Array.from(sellerMap.values()).sort((a, b) => b.rating - a.rating))
  }, [])

  return (
    <div className="bg-white min-h-screen">
      {/* Navigation */}
      <nav className="bg-black text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="text-2xl font-bold tracking-widest hover:text-gray-300 transition"
          >
            SPORTS ELITE
          </button>
          <div className="flex items-center gap-8">
            <button
              onClick={() => navigate('/')}
              className="text-sm font-light tracking-wide hover:text-gray-300 transition"
            >
              VEHICLES
            </button>
            <div className="text-sm font-light tracking-wide">SELLERS</div>
            <button
              onClick={() => navigate('/')}
              className="text-sm font-light tracking-wide border border-white px-6 py-2 hover:bg-white hover:text-black transition"
            >
              BROWSE
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-5xl font-bold tracking-tight mb-4">TRUSTED SELLERS</h2>
          <p className="text-lg font-light tracking-wide text-gray-300">Browse our network of verified dealers and premium sellers</p>
        </div>
      </div>

      {/* Sellers Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
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
                setSearchQuery('')
                setMinRating('')
                setMinListings('')
                setSortBy('rating')
              }}
              className="md:col-span-3 px-4 py-2 bg-gray-400 text-white font-bold text-sm tracking-widest hover:bg-gray-500 transition rounded mt-2"
            >
              RESET FILTERS
            </button>
          </div>
        </div>

        {/* Filtering and Sorting Logic */}
        {(() => {
          let filtered = sellers.filter(seller => {
            // Search filter
            if (searchQuery.trim()) {
              const query = searchQuery.toLowerCase()
              if (!seller.name.toLowerCase().includes(query)) {
                return false
              }
            }

            // Minimum rating filter
            if (minRating && seller.rating < parseFloat(minRating)) {
              return false
            }

            // Minimum listings filter
            if (minListings && seller.vehicleCount < parseInt(minListings)) {
              return false
            }

            return true
          })

          // Sorting
          filtered.sort((a, b) => {
            switch (sortBy) {
              case 'reviews':
                return b.reviews - a.reviews
              case 'listings':
                return b.vehicleCount - a.vehicleCount
              case 'name':
                return a.name.localeCompare(b.name)
              case 'rating':
              default:
                return b.rating - a.rating
            }
          })

          return (
            <>
              <div className="text-sm text-gray-600 mb-8 font-light">
                Showing {filtered.length} of {sellers.length} sellers
              </div>

              {filtered.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-xl text-gray-600 font-light">No sellers match your filters.</p>
                  <p className="text-sm text-gray-500 mt-2">Try adjusting your search criteria.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filtered.map((seller, index) => (
            <div
              key={index}
              onClick={() => navigate(`/profile/${seller.name}`)}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer"
            >
              <div className="bg-gray-100 p-6 text-center border-b border-gray-200">
                <img
                  src={seller.image}
                  alt={seller.name}
                  className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold tracking-tight mb-1">{seller.name}</h3>
                <p className="text-xs text-gray-600 font-light">Joined {seller.joinedDate}</p>
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
                    e.stopPropagation()
                    navigate(`/profile/${seller.name}`)
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
          )
        })()}
      </div>

      {/* Footer */}
      <footer className="bg-black text-white border-t border-gray-200 mt-20 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-4 gap-8 pb-8 border-b border-gray-800">
            <div>
              <h3 className="font-bold tracking-widest mb-4">ABOUT</h3>
              <ul className="space-y-2 text-sm font-light text-gray-400">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold tracking-widest mb-4">SUPPORT</h3>
              <ul className="space-y-2 text-sm font-light text-gray-400">
                <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                <li><a href="#" className="hover:text-white transition">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold tracking-widest mb-4">LEGAL</h3>
              <ul className="space-y-2 text-sm font-light text-gray-400">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Cookies</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold tracking-widest mb-4">CONNECT</h3>
              <ul className="space-y-2 text-sm font-light text-gray-400">
                <li><a href="#" className="hover:text-white transition">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition">Twitter</a></li>
              </ul>
            </div>
          </div>
          <p className="text-center text-sm font-light text-gray-600 pt-8">
            © 2024 SPORTS ELITE. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
