import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Comment {
  id: string
  author: string
  authorImage: string
  text: string
  date: string
  rating: number
}

interface Vehicle {
  id: string
  type: 'car' | 'bike' | 'suv' | 'van' | 'sedan' | 'truck'
  name: string
  brand: string
  year: number
  price: number
  condition: 'New' | 'Like New' | 'Excellent' | 'Good' | 'Fair'
  images: string[]
  description: string
  mileage: string
  postedBy: string
  postedByImage: string
  postedDate: string
  sellerRating: number
  sellerReviews: number
  comments: Comment[]
  engineSize: string
  fuelType: string
  transmission: string
}

export default function Home() {
  const navigate = useNavigate()
  const [currentUser] = useState<string | null>(localStorage.getItem('currentUser'))
  const [currentUserData] = useState<any>(currentUser ? JSON.parse(localStorage.getItem(`user_${currentUser}`) || '{}') : null)
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [showPostForm, setShowPostForm] = useState(false)
  const [vehicleType, setVehicleType] = useState<'car' | 'bike' | 'suv' | 'van' | 'sedan' | 'truck'>('car')
  const [newComment, setNewComment] = useState('')
  const [newCommentRating, setNewCommentRating] = useState(5)
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [filterYear, setFilterYear] = useState('')
  const [filterPriceMin, setFilterPriceMin] = useState('')
  const [filterPriceMax, setFilterPriceMax] = useState('')
  const [filterFuelType, setFilterFuelType] = useState('')
  const [filterTransmission, setFilterTransmission] = useState('')
  const [filterCondition, setFilterCondition] = useState('')
  
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    year: new Date().getFullYear(),
    price: '',
    condition: 'Good' as const,
    description: '',
    mileage: '',
    engineSize: '',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    images: ['', '']
  })

  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: '1',
      type: 'car',
      name: 'M440i xDrive',
      brand: 'BMW',
      year: 2024,
      price: 7500000,
      condition: 'New',
      images: ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600', 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600'],
      description: 'The new BMW M440i xDrive. Premium performance meets luxury. Exceptional engineering. Experience power.',
      mileage: '5 km',
      postedBy: 'BMW Dealer',
      postedByImage: 'https://i.pravatar.cc/150?img=1',
      postedDate: '2 days ago',
      sellerRating: 4.8,
      sellerReviews: 156,
      comments: [],
      engineSize: '3.0L Inline-6',
      fuelType: 'Hybrid',
      transmission: 'Automatic'
    },
    {
      id: '2',
      type: 'car',
      name: '911 Turbo S',
      brand: 'Porsche',
      year: 2023,
      price: 25000000,
      condition: 'Excellent',
      images: ['https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=600', 'https://images.unsplash.com/photo-1514314723033-ce0042f1d43a?w=600'],
      description: 'Incredible power, incredible design. The new Porsche 911 Turbo S.',
      mileage: '12,500 km',
      postedBy: 'Luxury Motors',
      postedByImage: 'https://i.pravatar.cc/150?img=2',
      postedDate: '5 days ago',
      sellerRating: 4.9,
      sellerReviews: 89,
      comments: [],
      engineSize: '3.8L Flat-6',
      fuelType: 'Petrol',
      transmission: 'Automatic'
    },
    {
      id: '3',
      type: 'bike',
      name: 'S1000RR',
      brand: 'BMW',
      year: 2024,
      price: 2000000,
      condition: 'New',
      images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600', 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=600'],
      description: 'Ultimate performance on two wheels. Race-proven technology.',
      mileage: '50 km',
      postedBy: 'Speed Bikes',
      postedByImage: 'https://i.pravatar.cc/150?img=3',
      postedDate: '1 day ago',
      sellerRating: 4.7,
      sellerReviews: 234,
      comments: [],
      engineSize: '999cc',
      fuelType: 'Petrol',
      transmission: 'Manual'
    },
    {
      id: '4',
      type: 'suv',
      name: 'Range Rover Sport',
      brand: 'Land Rover',
      year: 2022,
      price: 12000000,
      condition: 'Good',
      images: ['https://images.unsplash.com/photo-1533473359331-35acda7d5c38?w=600', 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600'],
      description: 'Luxury SUV with exceptional off-road capability. Dynamic driving experience.',
      mileage: '45,000 km',
      postedBy: 'Auto Exchange',
      postedByImage: 'https://i.pravatar.cc/150?img=4',
      postedDate: '3 days ago',
      sellerRating: 4.6,
      sellerReviews: 112,
      comments: [],
      engineSize: '3.0L V6',
      fuelType: 'Diesel',
      transmission: 'Automatic'
    },
    {
      id: '5',
      type: 'van',
      name: 'Mercedes-Benz Sprinter',
      brand: 'Mercedes-Benz',
      year: 2023,
      price: 4500000,
      condition: 'Like New',
      images: ['https://images.unsplash.com/photo-1605559424843-9e4c3febda46?w=600', 'https://images.unsplash.com/photo-1527789050715-11592f08a618?w=600'],
      description: 'Commercial van with premium interior. Reliable and spacious.',
      mileage: '8,500 km',
      postedBy: 'Commercial Traders',
      postedByImage: 'https://i.pravatar.cc/150?img=5',
      postedDate: '4 days ago',
      sellerRating: 4.8,
      sellerReviews: 78,
      comments: [],
      engineSize: '2.1L Diesel',
      fuelType: 'Diesel',
      transmission: 'Automatic'
    },
    {
      id: '6',
      type: 'sedan',
      name: 'Toyota Camry',
      brand: 'Toyota',
      year: 2021,
      price: 3800000,
      condition: 'Fair',
      images: ['https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600', 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600'],
      description: 'Reliable family sedan. Good fuel economy and comfort.',
      mileage: '78,000 km',
      postedBy: 'Used Car Hub',
      postedByImage: 'https://i.pravatar.cc/150?img=6',
      postedDate: '1 week ago',
      sellerRating: 4.5,
      sellerReviews: 156,
      comments: [],
      engineSize: '2.5L 4-Cylinder',
      fuelType: 'Petrol',
      transmission: 'Automatic'
    },
    {
      id: '7',
      type: 'truck',
      name: 'Ford F-150',
      brand: 'Ford',
      year: 2023,
      price: 6500000,
      condition: 'Excellent',
      images: ['https://images.unsplash.com/photo-1579202673506-ca3fb7dd798d?w=600', 'https://images.unsplash.com/photo-1609708536965-59d679b58d1d?w=600'],
      description: 'Powerful pickup truck. Perfect for work and weekend adventures.',
      mileage: '22,000 km',
      postedBy: 'Heavy Duty Motors',
      postedByImage: 'https://i.pravatar.cc/150?img=7',
      postedDate: '2 days ago',
      sellerRating: 4.7,
      sellerReviews: 92,
      comments: [],
      engineSize: '5.0L V8',
      fuelType: 'Petrol',
      transmission: 'Automatic'
    }
  ])

  const handleImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const newImages = [...formData.images]
        newImages[index] = reader.result as string
        setFormData({ ...formData, images: newImages })
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePostVehicle = (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentUser) {
      navigate('/login')
      return
    }

    if (!formData.name || !formData.brand || !formData.price || !formData.images[0]) {
      alert('Please fill all required fields and upload at least one image')
      return
    }

    const newVehicle: Vehicle = {
      id: Date.now().toString(),
      type: vehicleType,
      name: formData.name,
      brand: formData.brand,
      year: formData.year,
      price: parseFloat(formData.price),
      condition: formData.condition,
      images: formData.images.filter(img => img),
      description: formData.description,
      mileage: formData.mileage,
      engineSize: formData.engineSize,
      fuelType: formData.fuelType,
      transmission: formData.transmission,
      postedBy: currentUser,
      postedByImage: currentUserData?.image || 'https://i.pravatar.cc/150?img=0',
      postedDate: 'Just now',
      sellerRating: 5,
      sellerReviews: 0,
      comments: []
    }

    setVehicles([newVehicle, ...vehicles])
    setFormData({
      name: '',
      brand: '',
      year: new Date().getFullYear(),
      price: '',
      condition: 'Good',
      description: '',
      mileage: '',
      engineSize: '',
      fuelType: 'Petrol',
      transmission: 'Automatic',
      images: ['', '']
    })
    setShowPostForm(false)
    alert('Vehicle posted successfully!')
  }

  const handleAddComment = (vehicleId: string) => {
    if (!currentUser) {
      navigate('/login')
      return
    }

    if (!newComment.trim()) return

    const updatedVehicles = vehicles.map(v => {
      if (v.id === vehicleId) {
        return {
          ...v,
          comments: [...v.comments, {
            id: Date.now().toString(),
            author: currentUser,
            authorImage: currentUserData?.image || 'https://i.pravatar.cc/150?img=0',
            text: newComment,
            date: 'Just now',
            rating: newCommentRating
          }]
        }
      }
      return v
    })
    setVehicles(updatedVehicles)
    if (selectedVehicle?.id === vehicleId) {
      setSelectedVehicle(updatedVehicles.find(v => v.id === vehicleId) || null)
    }
    setNewComment('')
    setNewCommentRating(5)
  }

  const carBrands = ['BMW', 'Porsche', 'Ferrari', 'Lamborghini', 'Mercedes-AMG', 'McLaren', 'Aston Martin']
  const bikeBrands = ['BMW', 'Suzuki', 'Kawasaki', 'Ducati', 'Yamaha', 'Honda', 'KTM']

  return (
    <div className="bg-white min-h-screen">
      {/* Navigation */}
      <nav className="bg-black text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-widest">SPORTS ELITE</h1>
          <div className="flex items-center gap-8">
            <button
              onClick={() => window.location.href = '/'}
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
                  onClick={() => navigate('/my-posts')}
                  className="text-sm font-light tracking-wide hover:text-gray-300 transition"
                >
                  MY POSTS
                </button>
                <button
                  onClick={() => navigate(`/profile/${currentUser}`)}
                  className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-xs font-bold"
                >
                  {currentUser?.charAt(0).toUpperCase()}
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem('currentUser')
                    window.location.reload()
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

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-6xl font-bold tracking-tight mb-4">
            Premium Sports Vehicles
          </h2>
          <p className="text-xl font-light tracking-wide text-gray-300 mb-8">
            Discover exceptional performance. Trade with confidence.
          </p>
          <button
            onClick={() => {
              if (!currentUser) {
                navigate('/login')
              } else {
                setShowPostForm(true)
              }
            }}
            className="bg-white text-black px-10 py-3 font-bold tracking-wide hover:bg-gray-100 transition"
          >
            POST YOUR VEHICLE
          </button>
        </div>
      </div>

      {/* Post Vehicle Modal */}
      {showPostForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl p-8 my-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold tracking-tight">POST YOUR VEHICLE</h2>
              <button
                onClick={() => setShowPostForm(false)}
                className="text-3xl font-light text-gray-500 hover:text-black"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handlePostVehicle} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold tracking-wide mb-2">VEHICLE TYPE</label>
                  <select
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value as 'car' | 'bike')}
                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
                  >
                    <option value="car">Car</option>
                    <option value="bike">Motorcycle</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold tracking-wide mb-2">BRAND *</label>
                  <select
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
                  >
                    <option value="">Select Brand</option>
                    {(vehicleType === 'car' ? carBrands : bikeBrands).map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold tracking-wide mb-2">MODEL *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., M440i xDrive"
                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold tracking-wide mb-2">YEAR</label>
                  <input
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold tracking-wide mb-2">PRICE (PKR) *</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold tracking-wide mb-2">CONDITION</label>
                  <select
                    value={formData.condition}
                    onChange={(e) => setFormData({ ...formData, condition: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
                  >
                    <option value="New">New</option>
                    <option value="Like New">Like New</option>
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-bold tracking-wide mb-2">MILEAGE</label>
                  <input
                    type="text"
                    value={formData.mileage}
                    onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                    placeholder="e.g., 5,000 km"
                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold tracking-wide mb-2">ENGINE</label>
                  <input
                    type="text"
                    value={formData.engineSize}
                    onChange={(e) => setFormData({ ...formData, engineSize: e.target.value })}
                    placeholder="e.g., 3.0L"
                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold tracking-wide mb-2">FUEL TYPE</label>
                  <select
                    value={formData.fuelType}
                    onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
                  >
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Electric">Electric</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold tracking-wide mb-2">TRANSMISSION</label>
                <select
                  value={formData.transmission}
                  onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
                >
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold tracking-wide mb-4">DESCRIPTION</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your vehicle..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-sm font-bold tracking-wide mb-4">UPLOAD IMAGES (MAX 2) *</label>
                <div className="space-y-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="border-2 border-dashed border-gray-300 p-6 text-center hover:border-black transition">
                      {image ? (
                        <div className="space-y-2">
                          <img src={image} alt={`Preview ${index + 1}`} className="h-32 mx-auto object-cover" />
                          <button
                            type="button"
                            onClick={() => {
                              const newImages = [...formData.images]
                              newImages[index] = ''
                              setFormData({ ...formData, images: newImages })
                            }}
                            className="text-sm text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <label className="cursor-pointer">
                          <div className="text-gray-500">
                            <div className="text-2xl mb-2">📷</div>
                            <div className="text-sm font-light">Click to upload image {index + 1}</div>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(index, e)}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  type="submit"
                  className="flex-1 bg-black text-white py-3 font-bold tracking-wide hover:bg-gray-800 transition"
                >
                  POST VEHICLE
                </button>
                <button
                  type="button"
                  onClick={() => setShowPostForm(false)}
                  className="flex-1 border border-black text-black py-3 font-bold tracking-wide hover:bg-black hover:text-white transition"
                >
                  CANCEL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Vehicle Detail Modal - Modern Compact Design */}
      {selectedVehicle && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-lg overflow-hidden flex flex-col">
            {/* Header with Close Button */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold tracking-tight">
                {selectedVehicle.year} {selectedVehicle.brand} {selectedVehicle.name}
              </h2>
              <button
                onClick={() => {
                  setSelectedVehicle(null)
                  setSelectedImageIndex(0)
                }}
                className="text-2xl font-light text-gray-400 hover:text-black transition"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-3 gap-6 p-6">
                {/* Left: Image Carousel */}
                <div className="col-span-1">
                  <div className="space-y-3">
                    <img
                      src={selectedVehicle.images[selectedImageIndex]}
                      alt={selectedVehicle.name}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    {selectedVehicle.images.length > 1 && (
                      <div className="grid grid-cols-3 gap-2">
                        {selectedVehicle.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`${selectedVehicle.name} ${index}`}
                            onClick={() => setSelectedImageIndex(index)}
                            className={`w-full h-20 object-cover rounded cursor-pointer transition ${
                              index === selectedImageIndex
                                ? 'ring-2 ring-black opacity-100'
                                : 'hover:opacity-80 opacity-60'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Middle & Right: Details */}
                <div className="col-span-2 space-y-6">
                  {/* Price & Condition */}
                  <div>
                    <p className="text-4xl font-bold text-gray-900">PKR {selectedVehicle.price.toLocaleString()}</p>
                    <span className="inline-block mt-2 px-3 py-1 bg-black text-white text-xs font-bold tracking-wide rounded">
                      {selectedVehicle.condition}
                    </span>
                  </div>

                  {/* Key Specs Grid */}
                  <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                    <div>
                      <p className="text-xs font-bold text-gray-600 tracking-widest mb-1">MILEAGE</p>
                      <p className="text-sm font-bold">{selectedVehicle.mileage}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-600 tracking-widest mb-1">ENGINE</p>
                      <p className="text-sm font-bold">{selectedVehicle.engineSize}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-600 tracking-widest mb-1">FUEL</p>
                      <p className="text-sm font-bold">{selectedVehicle.fuelType}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-600 tracking-widest mb-1">TRANSMISSION</p>
                      <p className="text-sm font-bold">{selectedVehicle.transmission}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="text-sm font-bold tracking-widest text-gray-600 mb-2">ABOUT THIS VEHICLE</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">{selectedVehicle.description}</p>
                  </div>

                  {/* Seller Card */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={selectedVehicle.postedByImage}
                          alt={selectedVehicle.postedBy}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-bold text-sm">{selectedVehicle.postedBy}</p>
                          <p className="text-xs text-gray-600">⭐ {selectedVehicle.sellerRating} • {selectedVehicle.sellerReviews} reviews</p>
                        </div>
                      </div>
                      <button
                        onClick={() => navigate(`/profile/${selectedVehicle.postedBy}`)}
                        className="px-4 py-2 text-xs bg-black text-white font-bold tracking-wide hover:bg-gray-800 transition rounded"
                      >
                        Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200"></div>

              {/* Reviews Section */}
              <div className="p-6">
                <h3 className="text-lg font-bold tracking-tight mb-4">REVIEWS ({selectedVehicle.comments.length})</h3>

                {selectedVehicle.comments.length === 0 ? (
                  <p className="text-sm text-gray-600 font-light mb-6">Be the first to review this vehicle</p>
                ) : (
                  <div className="space-y-4 mb-6 max-h-48 overflow-y-auto pr-2">
                    {selectedVehicle.comments.map(comment => (
                      <div key={comment.id} className="flex gap-3 pb-4 border-b border-gray-100">
                        <img
                          src={comment.authorImage}
                          alt={comment.author}
                          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-bold">{comment.author}</p>
                            <p className="text-xs text-gray-600">{comment.date}</p>
                          </div>
                          <div className="flex gap-1 mb-1 text-xs">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <span key={i}>{i < comment.rating ? '⭐' : '☆'}</span>
                            ))}
                          </div>
                          <p className="text-sm text-gray-700">{comment.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Review Form */}
                {currentUser && (
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-xs font-bold tracking-widest text-gray-600 mb-3">SHARE YOUR REVIEW</p>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-bold mb-2">RATING</label>
                        <div className="flex gap-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setNewCommentRating(i + 1)}
                              className="text-lg hover:scale-125 transition"
                            >
                              {i < newCommentRating ? '⭐' : '☆'}
                            </button>
                          ))}
                        </div>
                      </div>
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Share your experience..."
                        rows={2}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-black font-light"
                      />
                      <button
                        onClick={() => handleAddComment(selectedVehicle.id)}
                        className="w-full bg-black text-white py-2 text-sm font-bold tracking-wide hover:bg-gray-800 transition rounded"
                      >
                        POST REVIEW
                      </button>
                    </div>
                  </div>
                )}

                {!currentUser && (
                  <div className="pt-4 border-t border-gray-200 text-center">
                    <p className="text-sm text-gray-600 font-light mb-3">Sign in to leave a review</p>
                    <button
                      onClick={() => navigate('/login')}
                      className="px-6 py-2 bg-black text-white text-sm font-bold tracking-wide hover:bg-gray-800 transition rounded"
                    >
                      SIGN IN
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Vehicles Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight mb-6">FEATURED VEHICLES</h2>
          
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search by brand, model, or year..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:border-black transition"
          />

          {/* Category Buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            {['all', 'car', 'van', 'suv', 'sedan', 'truck', 'bike'].map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 font-bold tracking-wide transition ${
                  selectedCategory === category
                    ? 'bg-black text-white'
                    : 'border border-black text-black hover:bg-black hover:text-white'
                }`}
              >
                {category.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Advanced Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">YEAR</label>
              <input
                type="number"
                placeholder="e.g., 2023"
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">PRICE MIN (M)</label>
              <input
                type="number"
                placeholder="Min"
                value={filterPriceMin}
                onChange={(e) => setFilterPriceMin(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">PRICE MAX (M)</label>
              <input
                type="number"
                placeholder="Max"
                value={filterPriceMax}
                onChange={(e) => setFilterPriceMax(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">FUEL TYPE</label>
              <select
                value={filterFuelType}
                onChange={(e) => setFilterFuelType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-black bg-white"
              >
                <option value="">All Fuels</option>
                <option value="petrol">Petrol</option>
                <option value="diesel">Diesel</option>
                <option value="hybrid">Hybrid</option>
                <option value="electric">Electric</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">TRANSMISSION</label>
              <select
                value={filterTransmission}
                onChange={(e) => setFilterTransmission(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-black bg-white"
              >
                <option value="">All Types</option>
                <option value="manual">Manual</option>
                <option value="automatic">Automatic</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">CONDITION</label>
              <select
                value={filterCondition}
                onChange={(e) => setFilterCondition(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-black bg-white"
              >
                <option value="">All Conditions</option>
                <option value="new">New</option>
                <option value="like-new">Like New</option>
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
              </select>
            </div>

            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
                setFilterYear('')
                setFilterPriceMin('')
                setFilterPriceMax('')
                setFilterFuelType('')
                setFilterTransmission('')
                setFilterCondition('')
              }}
              className="md:col-span-1 lg:col-span-5 px-4 py-2 bg-gray-400 text-white font-bold text-sm tracking-wide hover:bg-gray-500 transition rounded mt-2"
            >
              RESET FILTERS
            </button>
          </div>
        </div>

        {/* Filtering Logic */}
        {(() => {
          const filtered = vehicles.filter(vehicle => {
            // Search filter
            if (searchQuery.trim()) {
              const query = searchQuery.toLowerCase()
              const matchesSearch = 
                vehicle.brand.toLowerCase().includes(query) ||
                vehicle.name.toLowerCase().includes(query) ||
                vehicle.year.toString().includes(query)
              if (!matchesSearch) return false
            }

            // Category filter
            if (selectedCategory !== 'all' && vehicle.type !== selectedCategory) {
              return false
            }

            // Year filter
            if (filterYear && vehicle.year !== parseInt(filterYear)) {
              return false
            }

            // Price filter
            const priceInMillions = vehicle.price / 1000000
            if (filterPriceMin && priceInMillions < parseFloat(filterPriceMin)) {
              return false
            }
            if (filterPriceMax && priceInMillions > parseFloat(filterPriceMax)) {
              return false
            }

            // Fuel type filter
            if (filterFuelType && vehicle.fuelType?.toLowerCase() !== filterFuelType.toLowerCase()) {
              return false
            }

            // Transmission filter
            if (filterTransmission && vehicle.transmission?.toLowerCase() !== filterTransmission.toLowerCase()) {
              return false
            }

            // Condition filter
            if (filterCondition && vehicle.condition?.toLowerCase() !== filterCondition.toLowerCase()) {
              return false
            }

            return true
          })

          return (
            <>
              <div className="text-sm text-gray-600 mb-6 font-light">
                Showing {filtered.length} of {vehicles.length} vehicles
              </div>

              {filtered.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-xl text-gray-600 font-light">No vehicles match your filters.</p>
                  <p className="text-sm text-gray-500 mt-2">Try adjusting your search criteria.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filtered.map(vehicle => (
            <div
              key={vehicle.id}
              onClick={() => {
                setSelectedVehicle(vehicle)
                setSelectedImageIndex(0)
              }}
              className="cursor-pointer group"
            >
              <div className="relative h-80 bg-gray-100 overflow-hidden mb-4">
                <img
                  src={vehicle.images[0]}
                  alt={vehicle.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-black text-white px-3 py-1 text-xs font-bold tracking-widest">
                    {vehicle.condition}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-bold tracking-tight">
                  {vehicle.year} {vehicle.brand} {vehicle.name}
                </h3>
                <p className="text-2xl font-bold">
                  PKR {(vehicle.price / 1000000).toFixed(1)}M
                </p>

                <div className="grid grid-cols-2 text-sm text-gray-600 font-light">
                  <div>
                    <div className="text-xs font-bold tracking-widest text-gray-500 mb-1">MILEAGE</div>
                    <div>{vehicle.mileage}</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold tracking-widest text-gray-500 mb-1">TYPE</div>
                    <div className="capitalize">{vehicle.type}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <img
                      src={vehicle.postedByImage}
                      alt={vehicle.postedBy}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="text-sm">
                      <p className="font-bold">{vehicle.postedBy}</p>
                      <p className="text-xs text-gray-600 font-light">⭐ {vehicle.sellerRating}</p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedVehicle(vehicle)
                    }}
                    className="px-4 py-2 border border-black text-black text-xs font-bold tracking-wide hover:bg-black hover:text-white transition"
                  >
                    VIEW
                  </button>
                </div>
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
      <footer className="bg-black text-white mt-20 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-4 gap-8 pb-12 border-b border-gray-700">
            <div>
              <h3 className="font-bold tracking-widest mb-4">ABOUT</h3>
              <ul className="space-y-2 text-sm font-light">
                <li><a href="#" className="hover:text-gray-300 transition">About Us</a></li>
                <li><a href="#" className="hover:text-gray-300 transition">Blog</a></li>
                <li><a href="#" className="hover:text-gray-300 transition">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold tracking-widest mb-4">SUPPORT</h3>
              <ul className="space-y-2 text-sm font-light">
                <li><a href="#" className="hover:text-gray-300 transition">Help Center</a></li>
                <li><a href="#" className="hover:text-gray-300 transition">Contact</a></li>
                <li><a href="#" className="hover:text-gray-300 transition">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold tracking-widest mb-4">LEGAL</h3>
              <ul className="space-y-2 text-sm font-light">
                <li><a href="#" className="hover:text-gray-300 transition">Privacy</a></li>
                <li><a href="#" className="hover:text-gray-300 transition">Terms</a></li>
                <li><a href="#" className="hover:text-gray-300 transition">Cookies</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold tracking-widest mb-4">CONNECT</h3>
              <ul className="space-y-2 text-sm font-light">
                <li><a href="#" className="hover:text-gray-300 transition">Facebook</a></li>
                <li><a href="#" className="hover:text-gray-300 transition">Instagram</a></li>
                <li><a href="#" className="hover:text-gray-300 transition">Twitter</a></li>
              </ul>
            </div>
          </div>
          <p className="text-center text-sm font-light text-gray-500 pt-8">
            © 2024 SPORTS ELITE. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
