import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

interface Message {
  id: string
  sender: 'user' | 'seller'
  text: string
  timestamp: Date
}

export default function SellerProfile() {
  const { sellerId } = useParams<{ sellerId: string }>()
  const navigate = useNavigate()
  
  const [currentUser] = useState<string | null>(localStorage.getItem('currentUser'))
  const userData = sellerId ? JSON.parse(localStorage.getItem(`user_${sellerId}`) || '{}') : {}
  
  const [messages, setMessages] = useState<Message[]>([])
  const [messageInput, setMessageInput] = useState<string>('')
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [sellerVehicles] = useState([
    // Sample vehicles - in real app, would be filtered by sellerId
  ])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: 'user',
        text: messageInput,
        timestamp: new Date()
      }
      setMessages([...messages, newMessage])
      setMessageInput('')

      // Simulate seller response
      setTimeout(() => {
        const sellerResponse: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'seller',
          text: 'Thanks for your inquiry! I will get back to you soon with more details.',
          timestamp: new Date()
        }
        setMessages(prev => [...prev, sellerResponse])
      }, 1000)
    }
  }

  if (!sellerId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Seller not found</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-black text-white font-bold tracking-wide hover:bg-gray-800 transition"
          >
            BACK TO HOME
          </button>
        </div>
      </div>
    )
  }

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
              BROWSE
            </button>
            {currentUser && (
              <>
                <button
                  onClick={() => navigate('/my-posts')}
                  className="text-sm font-light tracking-wide hover:text-gray-300 transition"
                >
                  MY POSTS
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
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Seller Info Hero */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex gap-8 items-start">
            {/* Profile Image */}
            <img
              src={userData.image || `https://i.pravatar.cc/150?img=${Math.random()}`}
              alt={sellerId}
              className="w-32 h-32 rounded-lg object-cover"
            />

            {/* Seller Details */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold tracking-tight mb-4">{userData.fullName || sellerId}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex gap-1 text-2xl">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>
                      {i < Math.floor(userData.rating || 5) ? '⭐' : '☆'}
                    </span>
                  ))}
                </div>
                <div>
                  <p className="text-xl font-bold">{userData.rating || 5}.0</p>
                  <p className="text-sm text-gray-300 font-light">({userData.reviews || 0} reviews)</p>
                </div>
              </div>

              {/* Member Since */}
              <div className="text-sm font-light text-gray-300">
                <p>Member since {userData.joinedDate ? new Date(userData.joinedDate).getFullYear() : '2024'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-4 gap-8 mb-12">
          <div className="text-center">
            <p className="text-3xl font-bold text-black mb-2">{sellerVehicles.length}</p>
            <p className="text-sm text-gray-600 font-light tracking-widest">ACTIVE LISTINGS</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-black mb-2">{userData.reviews || 0}</p>
            <p className="text-sm text-gray-600 font-light tracking-widest">TOTAL REVIEWS</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-black mb-2">{userData.rating || 5}.0</p>
            <p className="text-sm text-gray-600 font-light tracking-widest">RATING</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-black mb-2">100%</p>
            <p className="text-sm text-gray-600 font-light tracking-widest">POSITIVE</p>
          </div>
        </div>

        {/* About Section */}
        <div className="py-12 border-t border-b border-gray-200">
          <h2 className="text-2xl font-bold tracking-tight mb-4">ABOUT {sellerId.toUpperCase()}</h2>
          <p className="text-gray-700 font-light leading-relaxed max-w-2xl">
            {userData.bio || `Trusted premium vehicle seller specializing in high-quality sports cars and motorcycles. All vehicles undergo thorough inspection and come with complete documentation. Fast transactions, transparent pricing.`}
          </p>
        </div>
      </div>

      {/* Listings */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold tracking-tight mb-8">ACTIVE LISTINGS</h2>
        
        {sellerVehicles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 font-light mb-4">No active listings at the moment</p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 border border-black text-black font-bold tracking-wide hover:bg-black hover:text-white transition"
            >
              VIEW OTHER SELLERS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sellerVehicles.map((vehicle: any) => (
              <div key={vehicle.id} className="border border-gray-200">
                <img
                  src={vehicle.images[0]}
                  alt={vehicle.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold">{vehicle.year} {vehicle.brand} {vehicle.name}</h3>
                  <p className="text-lg font-bold text-gray-900">PKR {vehicle.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Chat Interface */}
      <div className="bg-gray-100 mt-12 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white border border-gray-200">
            {/* Chat Header */}
            <div
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="bg-black text-white p-4 flex items-center justify-between cursor-pointer hover:bg-gray-800 transition"
            >
              <h2 className="text-lg font-bold tracking-tight">
                CHAT WITH {sellerId.toUpperCase()}
              </h2>
              <span className="text-2xl">{isChatOpen ? '−' : '+'}</span>
            </div>

            {/* Chat Body */}
            {isChatOpen && (
              <div className="flex flex-col h-96">
                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                  {messages.length === 0 ? (
                    <div className="text-center text-gray-500 font-light">
                      <p>Start a conversation with the seller</p>
                    </div>
                  ) : (
                    messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs px-4 py-2 rounded-lg ${
                            msg.sender === 'user'
                              ? 'bg-black text-white'
                              : 'bg-gray-300 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{msg.text}</p>
                          <p className="text-xs mt-1 opacity-70">
                            {msg.timestamp.toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="border-t border-gray-200 p-4 flex gap-2">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-black text-white px-6 py-2 font-bold tracking-wide hover:bg-gray-800 transition"
                  >
                    SEND
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm font-light text-gray-500 tracking-widest">
          © 2024 SPORTS ELITE. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
