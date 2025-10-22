import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const CaptainLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const captainData = { email, password }
    try {
      localStorage.setItem('captainLogin', JSON.stringify(captainData))
    } catch (err) {
      console.warn('Could not write to localStorage', err)
    }
    console.log('Submitted captain login:', captainData)
  }

  const handleUser = () => {
    navigate('/userLogin')
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

          <p className="text-center text-sm mb-4">New here? <Link to="/captainSignup" className="text-blue-600">Create new Account</Link></p>

          <button type="button" onClick={handleUser} className="w-full bg-green-500 text-white py-2 rounded">Sign in as User</button>
        </form>
      </div>
    </div>
  )
}

export default CaptainLogin
