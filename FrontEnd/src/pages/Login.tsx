import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../services/api'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please enter email and password')
      return
    }

    // Call backend login to receive a JWT token
    api.post('/auth/login', { email, password })
      .then((res) => {
        // res should contain token and user
        localStorage.setItem('token', res.token)
        // store user info for UI
        localStorage.setItem('currentUser', res.user?.email || email)
        localStorage.setItem('userId', res.user?.id || res.user?._id)
        navigate('/')
      })
      .catch((err: Error) => {
        setError(err.message || 'Invalid email or password')
      })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-widest text-white mb-2">SPORTS ELITE</h1>
          <p className="text-gray-400 font-light tracking-wide">Premium Vehicle Marketplace</p>
        </div>

        {/* Login Card */}
        <div className="relative bg-black border border-gray-800 p-8">
          <button
            type="button"
            onClick={() => navigate('/')}
            aria-label="Close"
            className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
          >
            ✕
          </button>
          <h2 className="text-2xl font-bold tracking-tight text-white mb-2">WELCOME BACK</h2>
          <p className="text-gray-400 font-light text-sm tracking-wide mb-8">Sign in to your account</p>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 mb-6 text-sm font-light">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold tracking-widest text-white mb-2">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 text-white placeholder-gray-600 focus:outline-none focus:border-white transition font-light"
              />
            </div>

            <div>
              <label className="block text-sm font-bold tracking-widest text-white mb-2">
                PASSWORD
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 text-white placeholder-gray-600 focus:outline-none focus:border-white transition font-light"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-400 cursor-pointer hover:text-white transition">
                <input type="checkbox" className="w-4 h-4" />
                <span className="font-light">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-gray-400 hover:text-white transition font-light"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-white text-black py-3 font-bold tracking-wide hover:bg-gray-100 transition mt-8"
            >
              SIGN IN
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-black text-gray-600 font-light">OR</span>
            </div>
          </div>

          <p className="text-center text-gray-400 font-light text-sm">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-white font-bold hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-600 text-xs font-light mt-8 tracking-widest">
          SECURE LOGIN • ENCRYPTED CONNECTION
        </p>
      </div>
    </div>
  )
}
