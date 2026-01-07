import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { postService, type Post } from '../services/postService'

export default function MyPosts() {
  const navigate = useNavigate()
  const [myPosts, setMyPosts] = useState<Post[]>([])
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [filter, setFilter] = useState<'all' | 'Car' | 'Bike'>('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Get userId from localStorage or decode from token
  const getUserId = (): string | null => {
    const storedUserId = localStorage.getItem('userId')
    if (storedUserId) return storedUserId

    // Try to decode from JWT token
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        return payload.userId || payload.id || payload.sub
      } catch (e) {
        console.error('Failed to decode token:', e)
      }
    }
    return null
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    const userId = getUserId()
    if (!userId) {
      console.error('No userId found. Please log in again.')
      navigate('/login')
      return
    }

    // Fetch user's posts from API
    const fetchMyPosts = async () => {
      try {
        setLoading(true)
        const posts = await postService.getUserPosts(userId)
        setMyPosts(posts)
      } catch (err: any) {
        setError(err.message || 'Failed to load your posts')
        console.error('Error fetching user posts:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMyPosts()
  }, [navigate])

  const handleDelete = async (postId: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        await postService.deletePost(postId)
        setMyPosts(myPosts.filter(p => p._id !== postId))
        setSelectedPost(null)
        alert('Post deleted successfully!')
      } catch (err: any) {
        alert(err.message || 'Failed to delete post')
      }
    }
  }

  const filteredPosts = filter === 'all'
    ? myPosts
    : myPosts.filter(p => p.category === filter)

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />

      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold tracking-tight">MY POSTINGS</h1>
          <p className="text-gray-300 font-light mt-2">Manage your vehicle listings</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 flex-1">
        {loading ? (
          <div className="text-center py-20">
            <div className="text-2xl text-gray-600">Loading your posts...</div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="text-red-600 text-xl mb-4">{error}</div>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-black text-white font-bold tracking-wide hover:bg-gray-800 transition"
            >
              RETRY
            </button>
          </div>
        ) : (
          <>
            {/* Filters */}
            <div className="mb-8">
              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-6 py-2 font-bold tracking-wide transition ${filter === 'all'
                    ? 'bg-black text-white'
                    : 'border border-black text-black hover:bg-black hover:text-white'
                    }`}
                >
                  ALL ({myPosts.length})
                </button>
                <button
                  onClick={() => setFilter('Car')}
                  className={`px-6 py-2 font-bold tracking-wide transition ${filter === 'Car'
                    ? 'bg-black text-white'
                    : 'border border-black text-black hover:bg-black hover:text-white'
                    }`}
                >
                  CARS ({myPosts.filter(p => p.category === 'Car').length})
                </button>
                <button
                  onClick={() => setFilter('Bike')}
                  className={`px-6 py-2 font-bold tracking-wide transition ${filter === 'Bike'
                    ? 'bg-black text-white'
                    : 'border border-black text-black hover:bg-black hover:text-white'
                    }`}
                >
                  BIKES ({myPosts.filter(p => p.category === 'Bike').length})
                </button>
              </div>
            </div>

            {/* Posts List */}
            {filteredPosts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">🚗</div>
                <h3 className="text-2xl font-bold tracking-tight mb-2">No Listings Yet</h3>
                <p className="text-gray-600 font-light mb-6">
                  {filter === 'all'
                    ? 'You haven\'t posted any vehicles yet'
                    : `You haven't posted any ${filter.toLowerCase()}s`}
                </p>
                <button
                  onClick={() => navigate('/create-post')}
                  className="px-8 py-3 bg-black text-white font-bold tracking-wide hover:bg-gray-800 transition"
                >
                  POST YOUR FIRST VEHICLE
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map(post => (
                  <div
                    key={post._id}
                    className="border border-gray-200 overflow-hidden hover:shadow-lg transition"
                  >
                    {/* Image */}
                    <div className="relative h-64 bg-gray-100 overflow-hidden">
                      <img
                        src={post.image || 'https://images.unsplash.com/photo-1494905998402-395d579af905?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-black text-white px-3 py-1 text-xs font-bold tracking-widest">
                          {post.condition}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <div className="bg-white text-black px-3 py-1 text-xs font-bold tracking-widest">
                          {post.comments?.length || 0} Comments
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="p-6">
                      <h3 className="text-lg font-bold tracking-tight mb-2">
                        {post.title}
                      </h3>

                      <p className="text-2xl font-bold text-gray-900 mb-4">
                        ${post.price.toLocaleString()}
                      </p>

                      <div className="space-y-2 text-sm text-gray-600 font-light mb-6">
                        <div className="flex justify-between">
                          <span>Location:</span>
                          <span className="font-bold text-black">{post.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Category:</span>
                          <span className="font-bold text-black">{post.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Posted:</span>
                          <span className="font-bold text-black">{new Date(post.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedPost(post)}
                          className="flex-1 px-4 py-2 border border-black text-black text-sm font-bold tracking-wide hover:bg-black hover:text-white transition"
                        >
                          VIEW DETAILS
                        </button>
                        <button
                          onClick={() => navigate(`/edit-post/${post._id}`)}
                          className="flex-1 px-4 py-2 bg-black text-white text-sm font-bold tracking-wide hover:bg-gray-800 transition"
                        >
                          EDIT
                        </button>
                        <button
                          onClick={() => handleDelete(post._id)}
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
          </>
        )}
      </div>

      {/* Post Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-3xl my-8 rounded-lg overflow-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedPost(null)}
              className="sticky top-0 right-0 z-10 float-right text-3xl font-light p-3 sm:p-4 hover:bg-gray-100"
            >
              ✕
            </button>

            <div className="p-3 sm:p-6 md:p-8 clear-both">
              {/* Image */}
              <div className="mb-8">
                <img
                  src={selectedPost.image || 'https://images.unsplash.com/photo-1494905998402-395d579af905?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                  alt={selectedPost.title}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>

              {/* Title and Price */}
              <div className="mb-8 pb-8 border-b border-gray-200">
                <h2 className="text-4xl font-bold tracking-tight mb-2">
                  {selectedPost.title}
                </h2>
                <p className="text-3xl font-bold text-gray-900 mb-2">
                  ${selectedPost.price.toLocaleString()}
                </p>
                <div className="inline-block px-4 py-1 bg-black text-white text-sm font-bold tracking-wide">
                  {selectedPost.condition}
                </div>
              </div>

              {/* Specifications */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 pb-8 border-b border-gray-200">
                <div>
                  <div className="text-xs font-bold tracking-widest text-gray-600 mb-1">CATEGORY</div>
                  <div className="text-lg font-bold">{selectedPost.category}</div>
                </div>
                <div>
                  <div className="text-xs font-bold tracking-widest text-gray-600 mb-1">LOCATION</div>
                  <div className="text-lg font-bold">{selectedPost.location}</div>
                </div>
                <div>
                  <div className="text-xs font-bold tracking-widest text-gray-600 mb-1">LIKES</div>
                  <div className="text-lg font-bold">{selectedPost.likes?.length || 0}</div>
                </div>
                <div>
                  <div className="text-xs font-bold tracking-widest text-gray-600 mb-1">POSTED</div>
                  <div className="text-lg font-bold">{new Date(selectedPost.createdAt).toLocaleDateString()}</div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8 pb-8 border-b border-gray-200">
                <h3 className="text-lg font-bold tracking-tight mb-3">DESCRIPTION</h3>
                <p className="text-gray-700 font-light leading-relaxed">{selectedPost.description}</p>
              </div>

              {/* Comments Summary */}
              <div className="pb-8 border-b border-gray-200">
                <h3 className="text-lg font-bold tracking-tight mb-4">COMMENTS ({selectedPost.comments?.length || 0})</h3>
                {!selectedPost.comments || selectedPost.comments.length === 0 ? (
                  <p className="text-gray-600 font-light">No comments yet</p>
                ) : (
                  <div className="space-y-4">
                    {selectedPost.comments.map((comment, index) => (
                      <div key={index} className="flex gap-4">
                        <img
                          src={comment.user.profileImage || `https://ui-avatars.com/api/?name=${comment.user.fullName}`}
                          alt={comment.user.fullName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-bold text-sm">{comment.user.fullName}</p>
                          <p className="text-sm text-gray-600 font-light">{comment.text}</p>
                          <p className="text-xs text-gray-400 mt-1">{new Date(comment.createdAt).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-8">
                <button
                  onClick={() => navigate(`/edit-post/${selectedPost._id}`)}
                  className="flex-1 bg-black text-white py-3 font-bold tracking-wide hover:bg-gray-800 transition"
                >
                  EDIT POSTING
                </button>
                <button
                  onClick={() => handleDelete(selectedPost._id)}
                  className="flex-1 bg-red-600 text-white py-3 font-bold tracking-wide hover:bg-red-700 transition"
                >
                  DELETE POSTING
                </button>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="flex-1 border border-black text-black py-3 font-bold tracking-wide hover:bg-black hover:text-white transition"
                >
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

