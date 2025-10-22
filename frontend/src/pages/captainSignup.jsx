import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainSignup = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = { firstName, lastName, email, password }
    try {
      localStorage.setItem('captainSignup', JSON.stringify(payload))
    } catch (err) {
      console.warn('localStorage write failed', err)
    }
    console.log('Captain signup submitted:', payload)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white w-96 rounded shadow p-6">
        <h1 className="text-2xl font-bold mb-4">Uber</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">What's your name</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                required
                className="w-1/2 bg-gray-100 px-3 py-2 rounded placeholder-gray-400 placeholder-opacity-50"
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
                required
                className="w-1/2 bg-gray-100 px-3 py-2 rounded placeholder-gray-400 placeholder-opacity-50"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">What's your email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              required
              className="w-full bg-gray-100 px-3 py-2 rounded placeholder-gray-400 placeholder-opacity-50"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Enter Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              required
              className="w-full bg-gray-100 px-3 py-2 rounded placeholder-gray-400 placeholder-opacity-50"
            />
          </div>

          <button type="submit" className="w-full bg-black text-white py-2 rounded mb-4">Create Account</button>

          <p className="text-center text-sm mb-4">Already have an account? <Link to="/captainLogin" className="text-blue-600">Login here</Link></p>

          <p className="text-xs text-gray-500">By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from Uber and its affiliates to the number provided.</p>
        </form>
      </div>
    </div>
  )
}

export default CaptainSignup