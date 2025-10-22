import React, { createContext, useState, useEffect } from 'react'

export const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('userLogin') || localStorage.getItem('userSignup')
      if (raw) setUser(JSON.parse(raw))
    } catch (err) {
      console.warn('Failed to read user from localStorage', err)
    }
  }, [])

  const login = (userData) => {
    setUser(userData)
    try { localStorage.setItem('userLogin', JSON.stringify(userData)) } catch (e) {}
  }

  const logout = () => {
    setUser(null)
    try { localStorage.removeItem('userLogin') } catch (e) {}
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
