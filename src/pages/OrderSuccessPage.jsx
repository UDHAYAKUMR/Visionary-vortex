"use client"

import { useEffect } from "react"
import { Link } from "react-router-dom"

const OrderSuccessPage = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="container">
      <div className="order-success-page">
        <div className="success-icon">✓</div>
        <h1>Thank You for Your Order!</h1>
        <p>Your order has been placed successfully and is being processed.</p>
        <p>You will receive an email confirmation shortly.</p>

        <div className="order-details">
          <h2>Order Details</h2>
          <p>
            <strong>Order Number:</strong> #ORD-{Math.floor(100000 + Math.random() * 900000)}
          </p>
          <p>
            <strong>Order Date:</strong> {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="success-actions">
          <Link to="/profile" className="btn btn-primary">
            View My Orders
          </Link>
          <Link to="/" className="btn btn-secondary">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OrderSuccessPage

