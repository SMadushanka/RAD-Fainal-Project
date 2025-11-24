import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Vehicle {
  id: string
  type: 'car' | 'bike'
  name: string
  brand: string
  year: number
  price: number
  condition: string
  images: string[]
  description: string
  mileage: string
  postedBy: string
  postedByImage: string
  postedDate: string
  sellerRating: number
  sellerReviews: number
  comments: any[]
  engineSize: string
  fuelType: string
  transmission: string
}

export default function MyPosts() {
  const navigate = useNavigate()
  const [currentUser] = useState<string | null>(localStorage.getItem('currentUser'))
  const [myVehicles, setMyVehicles] = useState<Vehicle[]>([])
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)
  const [filter, setFilter] = useState<'all' | 'car' | 'bike'>('all')

  useEffect(() => {
    if (!currentUser) {
      navigate('/login')
      return
    }

    // Load vehicles from localStorage
    const allVehicles: Vehicle[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith('vehicles_')) {
        const vehicle = JSON.parse(localStorage.getItem(key) || '{}')
        if (vehicle.postedBy === currentUser) {
          allVehicles.push(vehicle)
        }
      }
    }
    
    // Also check sessionStorage or state for temporary vehicles
    setMyVehicles(allVehicles)
  }, [currentUser, navigate])

  const handleDelete = (vehicleId: string) => {
    if (confirm('Are you sure you want to delete this vehicle posting?')) {
      setMyVehicles(myVehicles.filter(v => v.id !== vehicleId))
      setSelectedVehicle(null)
    }
  }

  const filteredVehicles = filter === 'all'
    ? myVehicles
    : myVehicles.filter(v => v.type === filter)

  if (!currentUser) {
    return null
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Navigation */}
      <nav className="bg-black text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="text-2xl font-bold tracking-widest hover:text-gray-300 transition">
            SPORTS ELITE
          </button>
          <div className="flex items-center gap-8">
            <button
              onClick={() => navigate('/')}
              className="text-sm font-light tracking-wide hover:text-gray-300 transition"
            >
              BROWSE
            </button>
            <button
              onClick={() => navigate(`/profile/${currentUser}`)}
              className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-xs font-bold"
            >
              {currentUser.charAt(0).toUpperCase()}
            </button>
            <button
              onClick={() => {
                localStorage.removeItem('currentUser')
                navigate('/login')
              }}
              className="text-sm font-light tracking-wide hover:text-gray-300 transition"
            >
              LOGOUT
            </button>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold tracking-tight">MY POSTINGS</h1>
          <p className="text-gray-300 font-light mt-2">Manage your vehicle listings</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Filters */}
        <div className="mb-8">
          <div className="flex gap-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 font-bold tracking-wide transition ${
                filter === 'all'
                  ? 'bg-black text-white'
                  : 'border border-black text-black hover:bg-black hover:text-white'
              }`}
            >
              ALL ({myVehicles.length})
            </button>
            <button
              onClick={() => setFilter('car')}
              className={`px-6 py-2 font-bold tracking-wide transition ${
                filter === 'car'
                  ? 'bg-black text-white'
                  : 'border border-black text-black hover:bg-black hover:text-white'
              }`}
            >
              CARS ({myVehicles.filter(v => v.type === 'car').length})
            </button>
            <button
              onClick={() => setFilter('bike')}
              className={`px-6 py-2 font-bold tracking-wide transition ${
                filter === 'bike'
                  ? 'bg-black text-white'
                  : 'border border-black text-black hover:bg-black hover:text-white'
              }`}
            >
              MOTORCYCLES ({myVehicles.filter(v => v.type === 'bike').length})
            </button>
          </div>
        </div>

        {/* Vehicles List */}
        {filteredVehicles.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🚗</div>
            <h3 className="text-2xl font-bold tracking-tight mb-2">No Listings Yet</h3>
            <p className="text-gray-600 font-light mb-6">
              {filter === 'all' 
                ? 'You haven\'t posted any vehicles yet' 
                : `You haven't posted any ${filter === 'car' ? 'cars' : 'motorcycles'}`}
            </p>
            <button
              onClick={() => navigate('/')}
              className="px-8 py-3 bg-black text-white font-bold tracking-wide hover:bg-gray-800 transition"
            >
              POST YOUR FIRST VEHICLE
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVehicles.map(vehicle => (
              <div
                key={vehicle.id}
                className="border border-gray-200 overflow-hidden hover:shadow-lg transition"
              >
                {/* Image */}
                <div className="relative h-64 bg-gray-100 overflow-hidden">
                  <img
                    src={vehicle.images[0]}
                    alt={vehicle.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-black text-white px-3 py-1 text-xs font-bold tracking-widest">
                      {vehicle.condition}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-white text-black px-3 py-1 text-xs font-bold tracking-widest">
                      {vehicle.comments.length} Reviews
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6">
                  <h3 className="text-lg font-bold tracking-tight mb-2">
                    {vehicle.year} {vehicle.brand} {vehicle.name}
                  </h3>

                  <p className="text-2xl font-bold text-gray-900 mb-4">
                    PKR {(vehicle.price / 1000000).toFixed(1)}M
                  </p>

                  <div className="space-y-2 text-sm text-gray-600 font-light mb-6">
                    <div className="flex justify-between">
                      <span>Mileage:</span>
                      <span className="font-bold text-black">{vehicle.mileage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Engine:</span>
                      <span className="font-bold text-black">{vehicle.engineSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Posted:</span>
                      <span className="font-bold text-black">{vehicle.postedDate}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedVehicle(vehicle)}
                      className="flex-1 px-4 py-2 border border-black text-black text-sm font-bold tracking-wide hover:bg-black hover:text-white transition"
                    >
                      VIEW DETAILS
                    </button>
                    <button
                      onClick={() => handleDelete(vehicle.id)}
                      className="flex-1 px-4 py-2 bg-red-600 text-white text-sm font-bold tracking-wide hover:bg-red-700 transition"
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Vehicle Detail Modal */}
      {selectedVehicle && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-3xl my-8">
            <button
              onClick={() => setSelectedVehicle(null)}
              className="sticky top-0 right-0 z-10 float-right text-3xl font-light p-4 hover:bg-gray-100"
            >
              ✕
            </button>

            <div className="p-8 clear-both">
              {/* Image Gallery */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {selectedVehicle.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${selectedVehicle.name} ${index + 1}`}
                    className="w-full h-64 object-cover"
                  />
                ))}
              </div>

              {/* Title and Price */}
              <div className="mb-8 pb-8 border-b border-gray-200">
                <h2 className="text-4xl font-bold tracking-tight mb-2">
                  {selectedVehicle.year} {selectedVehicle.brand} {selectedVehicle.name}
                </h2>
                <p className="text-3xl font-bold text-gray-900 mb-2">
                  PKR {selectedVehicle.price.toLocaleString()}
                </p>
                <div className="inline-block px-4 py-1 bg-black text-white text-sm font-bold tracking-wide">
                  {selectedVehicle.condition}
                </div>
              </div>

              {/* Specifications */}
              <div className="grid grid-cols-4 gap-4 mb-8 pb-8 border-b border-gray-200">
                <div>
                  <div className="text-xs font-bold tracking-widest text-gray-600 mb-1">MILEAGE</div>
                  <div className="text-lg font-bold">{selectedVehicle.mileage}</div>
                </div>
                <div>
                  <div className="text-xs font-bold tracking-widest text-gray-600 mb-1">ENGINE</div>
                  <div className="text-lg font-bold">{selectedVehicle.engineSize}</div>
                </div>
                <div>
                  <div className="text-xs font-bold tracking-widest text-gray-600 mb-1">FUEL</div>
                  <div className="text-lg font-bold">{selectedVehicle.fuelType}</div>
                </div>
                <div>
                  <div className="text-xs font-bold tracking-widest text-gray-600 mb-1">TRANSMISSION</div>
                  <div className="text-lg font-bold">{selectedVehicle.transmission}</div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8 pb-8 border-b border-gray-200">
                <h3 className="text-lg font-bold tracking-tight mb-3">DESCRIPTION</h3>
                <p className="text-gray-700 font-light leading-relaxed">{selectedVehicle.description}</p>
              </div>

              {/* Reviews Summary */}
              <div className="pb-8 border-b border-gray-200">
                <h3 className="text-lg font-bold tracking-tight mb-4">REVIEWS ({selectedVehicle.comments.length})</h3>
                {selectedVehicle.comments.length === 0 ? (
                  <p className="text-gray-600 font-light">No reviews yet</p>
                ) : (
                  <div className="space-y-4">
                    {selectedVehicle.comments.map((comment, index) => (
                      <div key={index} className="flex gap-4">
                        <img
                          src={comment.authorImage}
                          alt={comment.author}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-bold text-sm">{comment.author}</p>
                          <div className="text-xs text-yellow-500 mb-1">
                            {'⭐'.repeat(comment.rating)}
                          </div>
                          <p className="text-sm text-gray-600 font-light">{comment.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-8">
                <button
                  onClick={() => handleDelete(selectedVehicle.id)}
                  className="flex-1 bg-red-600 text-white py-3 font-bold tracking-wide hover:bg-red-700 transition"
                >
                  DELETE POSTING
                </button>
                <button
                  onClick={() => setSelectedVehicle(null)}
                  className="flex-1 border border-black text-black py-3 font-bold tracking-wide hover:bg-black hover:text-white transition"
                >
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
