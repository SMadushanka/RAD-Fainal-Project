import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [verificationCode, setVerificationCode] = useState('')

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email) {
      setError('Please enter your email address')
      return
    }

    const userData = localStorage.getItem(`user_${email}`)
    if (!userData) {
      setError('Email not found')
      return
    }

    const generatedCode = Math.random().toString().slice(2, 8)
    setVerificationCode(generatedCode)
    setStep(2)
    alert(`Verification code: ${generatedCode}\n\n(For demo purposes, this is shown here)`)
  }

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (code !== verificationCode) {
      setError('Invalid verification code')
      return
    }

    setStep(3)
  }

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!newPassword || !confirmPassword) {
      setError('Please enter your new password')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    const userData = JSON.parse(localStorage.getItem(`user_${email}`) || '{}')
    userData.password = newPassword
    localStorage.setItem(`user_${email}`, JSON.stringify(userData))
    
    alert('Password reset successfully! Please log in with your new password.')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-widest text-white mb-2">SPORTS ELITE</h1>
          <p className="text-gray-400 font-light tracking-wide">Reset Your Password</p>
        </div>

        {/* Reset Card */}
        <div className="bg-black border border-gray-800 p-8">
          {/* Step Indicator */}
          <div className="flex items-center justify-between mb-8">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition ${step >= 1 ? 'bg-white text-black' : 'bg-gray-800 text-gray-400'}`}>
              1
            </div>
            <div className={`flex-1 h-0.5 mx-2 transition ${step >= 2 ? 'bg-white' : 'bg-gray-800'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition ${step >= 2 ? 'bg-white text-black' : 'bg-gray-800 text-gray-400'}`}>
              2
            </div>
            <div className={`flex-1 h-0.5 mx-2 transition ${step >= 3 ? 'bg-white' : 'bg-gray-800'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition ${step >= 3 ? 'bg-white text-black' : 'bg-gray-800 text-gray-400'}`}>
              3
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 mb-6 text-sm font-light">
              {error}
            </div>
          )}

          {/* Step 1: Email */}
          {step === 1 && (
            <form onSubmit={handleSendCode} className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white mb-2">VERIFY EMAIL</h2>
                <p className="text-gray-400 font-light text-sm tracking-wide mb-8">Enter your email address to receive a verification code</p>
              </div>

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

              <button
                type="submit"
                className="w-full bg-white text-black py-3 font-bold tracking-wide hover:bg-gray-100 transition"
              >
                SEND CODE
              </button>
            </form>
          )}

          {/* Step 2: Verification Code */}
          {step === 2 && (
            <form onSubmit={handleVerifyCode} className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white mb-2">VERIFY CODE</h2>
                <p className="text-gray-400 font-light text-sm tracking-wide mb-8">Enter the verification code sent to your email</p>
              </div>

              <div>
                <label className="block text-sm font-bold tracking-widest text-white mb-2">
                  VERIFICATION CODE
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="000000"
                  maxLength={6}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-800 text-white placeholder-gray-600 focus:outline-none focus:border-white transition font-light text-center text-2xl tracking-widest"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-white text-black py-3 font-bold tracking-wide hover:bg-gray-100 transition"
              >
                VERIFY
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep(1)
                  setEmail('')
                  setCode('')
                  setError('')
                }}
                className="w-full border border-gray-800 text-gray-400 py-3 font-bold tracking-wide hover:text-white hover:border-white transition"
              >
                BACK
              </button>
            </form>
          )}

          {/* Step 3: New Password */}
          {step === 3 && (
            <form onSubmit={handleResetPassword} className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white mb-2">NEW PASSWORD</h2>
                <p className="text-gray-400 font-light text-sm tracking-wide mb-8">Create a strong new password</p>
              </div>

              <div>
                <label className="block text-sm font-bold tracking-widest text-white mb-2">
                  NEW PASSWORD
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-800 text-white placeholder-gray-600 focus:outline-none focus:border-white transition font-light"
                />
              </div>

              <div>
                <label className="block text-sm font-bold tracking-widest text-white mb-2">
                  CONFIRM PASSWORD
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-800 text-white placeholder-gray-600 focus:outline-none focus:border-white transition font-light"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-white text-black py-3 font-bold tracking-wide hover:bg-gray-100 transition"
              >
                RESET PASSWORD
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep(2)
                  setNewPassword('')
                  setConfirmPassword('')
                  setError('')
                }}
                className="w-full border border-gray-800 text-gray-400 py-3 font-bold tracking-wide hover:text-white hover:border-white transition"
              >
                BACK
              </button>
            </form>
          )}

          <p className="text-center text-gray-400 font-light text-sm mt-8">
            Remember your password?{' '}
            <Link to="/login" className="text-white font-bold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
