import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const UserLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const userData = { email, password }
    try {
      localStorage.setItem('userLogin', JSON.stringify(userData))
    } catch (err) {
      console.warn('Could not write to localStorage', err)
    }
    console.log('Submitted user login:', userData)
    // After login, you might redirect to a dashboard — placeholder:
    // navigate('/dashboard')
  }

  const handleCaptain = () => {
    navigate('/captainLogin')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white w-96 rounded shadow p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Uber</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">What's your email</label>
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
            <label className="block text-sm font-medium mb-1">Enter Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              required
              className="w-full bg-gray-100 px-3 py-2 rounded placeholder-gray-400 placeholder-opacity-50"
            />
          </div>

          <button type="submit" className="w-full bg-black text-white py-2 rounded mb-4">Login</button>

          <p className="text-center text-sm mb-4">New here? <Link to="/userSignup" className="text-blue-600">Create new Account</Link></p>

          <button type="button" onClick={handleCaptain} className="w-full bg-green-500 text-white py-2 rounded">Sign in as Captain</button>
        </form>
      </div>
    </div>
  )
}

export default UserLogin