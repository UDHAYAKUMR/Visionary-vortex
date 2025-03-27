"use client"

import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { CartContext } from "../context/CartContext"
import { AuthContext } from "../context/AuthContext"

const CheckoutPage = () => {
  const { cartItems, cartTotal } = useContext(CartContext)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [country, setCountry] = useState("")
  const [error, setError] = useState("")

  // Redirect if cart is empty or user is not logged in
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart")
    }

    if (!user) {
      navigate("/login")
    }
  }, [cartItems, user, navigate])

  const validateShippingInfo = () => {
    if (!address || !city || !postalCode || !country) {
      setError("Please fill in all shipping details")
      return false
    }
    return true
  }

  const handleContinueToPayment = () => {
    if (validateShippingInfo()) {
      // Save shipping info to localStorage
      const shippingInfo = { address, city, postalCode, country }
      localStorage.setItem("shippingInfo", JSON.stringify(shippingInfo))

      // Navigate to payment page
      navigate("/payment")
    }
  }

  return (
    <div className="container">
      <h1 className="page-title">Checkout</h1>

      <div className="checkout-steps">
        <div className="checkout-step active">
          <div className="step-number">1</div>
          <div className="step-title">Shipping</div>
        </div>
        <div className="step-connector"></div>
        <div className="checkout-step">
          <div className="step-number">2</div>
          <div className="step-title">Payment</div>
        </div>
        <div className="step-connector"></div>
        <div className="checkout-step">
          <div className="step-number">3</div>
          <div className="step-title">Place Order</div>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="checkout-container">
        <div className="checkout-main">
          <div className="checkout-section">
            <h2 className="section-title">Shipping Information</h2>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                className="form-control"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter your city"
              />
            </div>

            <div className="form-row">
              <div className="form-col">
                <label htmlFor="postalCode">Postal Code</label>
                <input
                  type="text"
                  id="postalCode"
                  className="form-control"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="Enter your postal code"
                />
              </div>

              <div className="form-col">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  className="form-control"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Enter your country"
                />
              </div>
            </div>

            <div className="form-actions">
              <button onClick={handleContinueToPayment} className="btn btn-primary">
                Continue to Payment
              </button>
            </div>
          </div>
        </div>

        <div className="checkout-sidebar">
          <div className="order-summary">
            <h2 className="summary-title">Order Summary</h2>

            <div className="summary-items">
              {cartItems.map((item) => (
                <div key={item._id} className="summary-item">
                  <div className="summary-item-image">
                    <img src={item.image || "/placeholder.svg"} alt={item.name} />
                  </div>
                  <div className="summary-item-details">
                    <h3>{item.name}</h3>
                    <p>Qty: {item.quantity}</p>
                    <p className="summary-item-price">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="summary-totals">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>

              <div className="summary-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>

              <div className="summary-row summary-total">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage

