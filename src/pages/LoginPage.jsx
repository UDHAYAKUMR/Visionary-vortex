"use client"

import { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [formError, setFormError] = useState("")
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [forgotEmail, setForgotEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [resetSuccess, setResetSuccess] = useState(false)
  const [resetError, setResetError] = useState("")

  const { login, loading, error, setError } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Form validation
    if (!email || !password) {
      setFormError("Please fill in all fields")
      return
    }

    try {
      await login(email, password)
      navigate("/")
    } catch (err) {
      console.error(err)
    }
  }

  const handleSendOtp = async (e) => {
    e.preventDefault()

    if (!forgotEmail) {
      setResetError("Please enter your email address")
      return
    }

    try {
      // In a real application, this would send an OTP to the user's email
      // For demo purposes, we'll simulate this process
      setOtpSent(true)
      setResetError("")
      // Simulated OTP for demo: 123456
    } catch (err) {
      setResetError("Failed to send OTP. Please try again.")
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()

    if (!otp || !newPassword) {
      setResetError("Please fill in all fields")
      return
    }

    // In a real application, verify OTP and update password in the database
    // For demo purposes, we'll simulate this process
    if (otp === "123456") {
      setResetSuccess(true)
      setResetError("")

      // Reset form after 3 seconds and show login form
      setTimeout(() => {
        setShowForgotPassword(false)
        setOtpSent(false)
        setResetSuccess(false)
        setForgotEmail("")
        setOtp("")
        setNewPassword("")
      }, 3000)
    } else {
      setResetError("Invalid OTP. Please try again.")
    }
  }

  return (
    <div className="login-page">
      {!showForgotPassword ? (
        <div className="login-container">
          <h1 className="login-title">Login to Your Account</h1>

          {(error || formError) && <div className="login-error">{error || formError}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="login-links">
              <button type="button" onClick={() => setShowForgotPassword(true)} className="forgot-password-link">
                Forgot Password?
              </button>

              <p className="register-link">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
          </form>
        </div>
      ) : (
        <div className="login-container">
          <h1 className="login-title">Reset Your Password</h1>

          {resetError && <div className="login-error">{resetError}</div>}
          {resetSuccess && (
            <div className="login-success">Password reset successful! You can now login with your new password.</div>
          )}

          {!otpSent ? (
            <form onSubmit={handleSendOtp} className="forgot-password-form">
              <div className="form-group">
                <label htmlFor="forgotEmail">Email Address</label>
                <input
                  type="email"
                  id="forgotEmail"
                  className="form-control"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="Enter your registered email"
                />
              </div>

              <button type="submit" className="login-button">
                Send OTP
              </button>

              <button type="button" onClick={() => setShowForgotPassword(false)} className="back-to-login-link">
                Back to Login
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="reset-password-form">
              <div className="form-group">
                <label htmlFor="otp">OTP Code</label>
                <input
                  type="text"
                  id="otp"
                  className="form-control"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP sent to your email"
                />
                <p className="otp-hint">For demo purposes, use OTP: 123456</p>
              </div>

              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  className="form-control"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
              </div>

              <button type="submit" className="login-button">
                Reset Password
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowForgotPassword(false)
                  setOtpSent(false)
                  setResetSuccess(false)
                  setForgotEmail("")
                  setOtp("")
                  setNewPassword("")
                  setResetError("")
                }}
                className="back-to-login-link"
              >
                Back to Login
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  )
}

export default LoginPage

