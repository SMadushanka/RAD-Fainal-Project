import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../services/api'

export default function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    image: ''
  })
  const [error, setError] = useState('')
  const [imagePreview, setImagePreview] = useState('')

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
        setFormData({ ...formData, image: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!formData.fullName || !formData.email || !formData.password) {
      setError('Please fill in all required fields')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    // Create a username from email if not provided
    const username = formData.email.split('@')[0]

    // Call backend register endpoint
    api.post('/auth/register', {
      username,
      email: formData.email,
      password: formData.password,
      fullName: formData.fullName,
    })
      .then((res) => {
        // store token and current user
        localStorage.setItem('token', res.token)
        localStorage.setItem('currentUser', res.user?.email || formData.email)
        localStorage.setItem('userId', res.user?.id || res.user?._id)
        navigate('/')
      })
      .catch((err: Error) => {
        setError(err.message || 'Registration failed')
      })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-widest text-white mb-2">SPORTS ELITE</h1>
          <p className="text-gray-400 font-light tracking-wide">Create Your Account</p>
        </div>

        {/* Register Card */}
        <div className="relative bg-black border border-gray-800 p-8">
          <button
            type="button"
            onClick={() => navigate('/')}
            aria-label="Close"
            className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
          >
            ✕
          </button>
          <h2 className="text-2xl font-bold tracking-tight text-white mb-2">JOIN US</h2>
          <p className="text-gray-400 font-light text-sm tracking-wide mb-8">Start trading premium vehicles</p>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 mb-6 text-sm font-light">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-6">
            {/* Profile Image */}
            <div className="text-center mb-8">
              <label className="inline-block cursor-pointer">
                <div className="w-24 h-24 mx-auto bg-gray-900 border border-gray-800 rounded-lg flex items-center justify-center hover:border-white transition">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Profile" className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <div className="text-3xl">📷</div>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <p className="text-xs text-gray-500 font-light mt-2">Upload Profile Photo</p>
              </label>
            </div>

            <div>
              <label className="block text-sm font-bold tracking-widest text-white mb-2">
                FULL NAME
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 text-white placeholder-gray-600 focus:outline-none focus:border-white transition font-light"
              />
            </div>

            <div>
              <label className="block text-sm font-bold tracking-widest text-white mb-2">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@example.com"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 text-white placeholder-gray-600 focus:outline-none focus:border-white transition font-light"
              />
            </div>

            <div>
              <label className="block text-sm font-bold tracking-widest text-white mb-2">
                PHONE NUMBER (Optional)
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1234567890"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 text-white placeholder-gray-600 focus:outline-none focus:border-white transition font-light"
              />
              <p className="text-xs text-gray-500 font-light mt-1">Include country code for WhatsApp (e.g., +1 for US)</p>
            </div>

            <div>
              <label className="block text-sm font-bold tracking-widest text-white mb-2">
                PASSWORD
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 text-white placeholder-gray-600 focus:outline-none focus:border-white transition font-light"
              />
              <p className="text-xs text-gray-500 font-light mt-1">Minimum 6 characters</p>
            </div>

            <div>
              <label className="block text-sm font-bold tracking-widest text-white mb-2">
                CONFIRM PASSWORD
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 text-white placeholder-gray-600 focus:outline-none focus:border-white transition font-light"
              />
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="agree" className="w-4 h-4" required />
              <label htmlFor="agree" className="text-sm text-gray-400 font-light cursor-pointer">
                I agree to the{' '}
                <span className="text-white hover:underline">Terms and Conditions</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-white text-black py-3 font-bold tracking-wide hover:bg-gray-100 transition mt-8"
            >
              CREATE ACCOUNT
            </button>
          </form>

          <p className="text-center text-gray-400 font-light text-sm mt-8">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-white font-bold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-600 text-xs font-light mt-8 tracking-widest">
          YOUR DATA IS SECURE • ENCRYPTED
        </p>
      </div>
    </div>
  )
}
