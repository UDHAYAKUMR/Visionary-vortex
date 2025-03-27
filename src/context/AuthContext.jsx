"use client"

import { createContext, useState, useEffect } from "react"
import axios from "axios"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check if user is logged in on page load
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem("token")
        const userData = localStorage.getItem("user")

        if (token && userData) {
          // Set user from localStorage first for immediate UI update
          setUser(JSON.parse(userData))

          // Then verify with backend
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }

          const res = await axios.get("http://localhost:5000/api/users/profile", config)

          // Update user data if needed
          setUser(res.data)
          localStorage.setItem("user", JSON.stringify(res.data))
        }
      } catch (err) {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setError("Authentication failed. Please login again.")
      } finally {
        setLoading(false)
      }
    }

    checkLoggedIn()
  }, [])

  // Register user
  const register = async (userData) => {
    try {
      setLoading(true)
      setError(null)

      const res = await axios.post("http://localhost:5000/api/users/register", userData)

      if (res.data.token) {
        localStorage.setItem("token", res.data.token)

        // Store user data
        const user = res.data.user || res.data
        localStorage.setItem("user", JSON.stringify(user))
        setUser(user)
      }

      return res.data
    } catch (err) {
      const message = err.response?.data?.message || "Registration failed"
      setError(message)
      throw new Error(message)
    } finally {
      setLoading(false)
    }
  }

  // Login user
  const login = async (email, password) => {
    try {
      setLoading(true)
      setError(null)

      const res = await axios.post("http://localhost:5000/api/users/login", { email, password })

      if (res.data.token) {
        localStorage.setItem("token", res.data.token)

        // Store user data
        const user = res.data.user || res.data
        localStorage.setItem("user", JSON.stringify(user))
        setUser(user)
      }

      return res.data
    } catch (err) {
      const message = err.response?.data?.message || "Login failed"
      setError(message)
      throw new Error(message)
    } finally {
      setLoading(false)
    }
  }

  // Logout user
  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
  }

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      setLoading(true)
      setError(null)

      const token = localStorage.getItem("token")

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      const res = await axios.put("http://localhost:5000/api/users/profile", userData, config)

      // Update user data in state and localStorage
      setUser(res.data)
      localStorage.setItem("user", JSON.stringify(res.data))

      return res.data
    } catch (err) {
      const message = err.response?.data?.message || "Profile update failed"
      setError(message)
      throw new Error(message)
    } finally {
      setLoading(false)
    }
  }

  // Forgot password - send OTP
  const forgotPassword = async (email) => {
    try {
      setLoading(true)
      setError(null)

      const res = await axios.post("http://localhost:5000/api/users/forgot-password", { email })
      return res.data
    } catch (err) {
      const message = err.response?.data?.message || "Failed to send OTP"
      setError(message)
      throw new Error(message)
    } finally {
      setLoading(false)
    }
  }

  // Reset password with OTP
  const resetPassword = async (email, otp, newPassword) => {
    try {
      setLoading(true)
      setError(null)

      const res = await axios.post("http://localhost:5000/api/users/reset-password", {
        email,
        otp,
        newPassword,
      })
      return res.data
    } catch (err) {
      const message = err.response?.data?.message || "Password reset failed"
      setError(message)
      throw new Error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        register,
        login,
        logout,
        updateProfile,
        forgotPassword,
        resetPassword,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

