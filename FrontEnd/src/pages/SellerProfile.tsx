import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import VehicleCard from '../components/VehicleCard'
import type { Post } from '../services/postService'
import { postService } from '../services/postService'
import { userService, type User } from '../services/userService'

interface Message {
  id: string
  sender: 'user' | 'seller'
  text: string
  timestamp: Date
}

export default function SellerProfile() {
  const { sellerId } = useParams<{ sellerId: string }>()
  const navigate = useNavigate()

  const [sellerData, setSellerData] = useState<User | null>(null)
  const [sellerVehicles, setSellerVehicles] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  const [messages, setMessages] = useState<Message[]>([])
  const [messageInput, setMessageInput] = useState<string>('')
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // scroll chat
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    const load = async () => {
      if (!sellerId) return

      setLoading(true)
      try {
        // Fetch seller data directly from API
        const seller = await userService.getUserById(sellerId)
        setSellerData(seller)

        // Fetch seller's posts
        const posts = await postService.getAllPosts()
        const filtered = posts.filter((p) => p.author && p.author._id === sellerId)
        setSellerVehicles(filtered)
      } catch (err) {
        console.warn('Could not load seller data:', err)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [sellerId])

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: 'user',
        text: messageInput,
        timestamp: new Date()
      }
      setMessages((prev) => [...prev, newMessage])
      setMessageInput('')

      // Simulate seller response
      setTimeout(() => {
        const sellerResponse: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'seller',
          text: 'Thanks for your message. I will reply shortly.',
          timestamp: new Date()
        }
        setMessages((prev) => [...prev, sellerResponse])
      }, 900)
    }
  }

  if (!sellerId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Seller not specified</p>
          <button
            onClick={() => navigate('/sellers')}
            className="px-6 py-2 bg-black text-white font-bold tracking-wide hover:bg-gray-800 transition"
          >
            BACK TO SELLERS
          </button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading seller profile...</p>
        </div>
      </div>
    )
  }

  // Derived display values with safe fallbacks
  const displayName = sellerData?.fullName || sellerId
  const profileImage = sellerData?.profileImage || null
  const rating = 5 // Fixed value since ratings system is not implemented yet
  const reviews = sellerVehicles.length // Use vehicle count as a proxy
  const joinedYear = sellerData?.createdAt ? new Date(sellerData.createdAt).getFullYear() : new Date().getFullYear()

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            {profileImage ? (
              <img src={profileImage} alt={displayName} className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-lg" />
            ) : (
              <div className="w-36 h-36 rounded-full bg-gray-700 flex items-center justify-center text-white text-5xl font-bold border-4 border-white shadow-lg">
                {displayName?.charAt(0)?.toUpperCase() || '?'}
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{displayName}</h1>
              {sellerData?.isVerified && (
                <span className="text-sm bg-white/10 text-white px-3 py-1 rounded-full">Verified</span>
              )}
            </div>

            <p className="text-sm text-gray-300 mt-2">Member since {joinedYear}</p>

            <div className="flex items-center gap-6 mt-6">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{Array.from({ length: 5 }).map((_, i) => (<span key={i}>{i < Math.floor(rating) ? '⭐' : '☆'}</span>))}</div>
                <div className="text-sm">
                  <div className="font-bold text-lg">{rating}.0</div>
                  <div className="text-gray-300 text-xs">{reviews} reviews</div>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <button
                  onClick={() => navigate('/create-post')}
                  className="px-5 py-2 bg-yellow-500 text-black font-semibold rounded-lg shadow hover:bg-yellow-400 transition"
                >
                  Post Your Vehicle
                </button>

                <button
                  onClick={() => setIsChatOpen(true)}
                  className="px-5 py-2 bg-white text-black font-semibold rounded-lg shadow hover:scale-[1.02] transition"
                >
                  Message Seller
                </button>

                <button
                  onClick={() => navigate('/vehicles')}
                  className="px-5 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-black transition"
                >
                  View Listings
                </button>
              </div>
            </div>

            {sellerData?.phone && (
              <p className="mt-4 text-sm text-gray-300">Contact: <span className="text-white font-medium">{sellerData.phone}</span></p>
            )}

            {sellerData?.bio && (
              <p className="mt-4 text-gray-200 max-w-3xl leading-relaxed">{sellerData.bio}</p>
            )}
          </div>
        </div>
      </header>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 bg-gray-50 rounded-xl shadow-sm text-center">
            <div className="text-3xl font-bold">{sellerVehicles.length}</div>
            <div className="text-xs text-gray-500 mt-1 tracking-widest">ACTIVE LISTINGS</div>
          </div>

          <div className="p-6 bg-gray-50 rounded-xl shadow-sm text-center">
            <div className="text-3xl font-bold">{reviews}</div>
            <div className="text-xs text-gray-500 mt-1 tracking-widest">TOTAL REVIEWS</div>
          </div>

          <div className="p-6 bg-gray-50 rounded-xl shadow-sm text-center">
            <div className="text-3xl font-bold">{rating}.0</div>
            <div className="text-xs text-gray-500 mt-1 tracking-widest">RATING</div>
          </div>
        </div>
      </section>

      {/* Listings */}
      <main className="max-w-6xl mx-auto px-4 flex-1 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Active Listings</h2>
          <button
            onClick={() => navigate('/create-post')}
            className="px-4 py-2 bg-black text-white rounded-md font-semibold hover:bg-gray-800 transition"
          >
            Post Your Vehicle
          </button>
        </div>

        {sellerVehicles.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 mb-6">No active listings at the moment.</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => navigate('/create-post')}
                className="px-6 py-2 bg-black text-white font-bold tracking-wide hover:bg-gray-800 transition"
              >
                POST YOUR VEHICLE
              </button>
              <button
                onClick={() => navigate('/vehicles')}
                className="px-6 py-2 border border-black text-black font-bold tracking-wide hover:bg-black hover:text-white transition"
              >
                VIEW OTHER LISTINGS
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sellerVehicles.map((post) => (
              <VehicleCard post={post} key={post._id} />
            ))}
          </div>
        )}
      </main>

      {/* Chat Drawer */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isChatOpen ? (
          <button
            onClick={() => setIsChatOpen(true)}
            className="bg-black text-white px-4 py-3 rounded-full shadow-lg hover:bg-gray-800 transition"
          >
            Chat
          </button>
        ) : (
          <div className="w-80 md:w-96 bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="bg-black text-white px-4 py-3 flex items-center justify-between">
              <div>
                <div className="font-bold">{displayName}</div>
                <div className="text-xs text-gray-200">Typically replies within 24 hours</div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="text-white text-lg">×</button>
            </div>

            <div className="h-64 overflow-y-auto p-4 bg-gray-50 space-y-3">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500">Start a conversation with the seller</div>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] px-3 py-2 rounded-lg ${msg.sender === 'user' ? 'bg-black text-white' : 'bg-gray-200 text-gray-900'}`}>
                      <div className="text-sm">{msg.text}</div>
                      <div className="text-xs mt-1 opacity-70">{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 border-t border-gray-100 flex gap-2">
              <input
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Write a message..."
                className="flex-1 px-3 py-2 border border-gray-200 rounded-md focus:outline-none"
              />
              <button onClick={handleSendMessage} className="px-3 py-2 bg-black text-white rounded-md">Send</button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
