"use client"

import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { CartContext } from "../context/CartContext"
import { AuthContext } from "../context/AuthContext"

const PaymentPage = () => {
  const { cartItems, cartTotal, clearCart } = useContext(CartContext)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const [paymentMethod, setPaymentMethod] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvv, setCardCvv] = useState("")
  const [upiId, setUpiId] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  // Redirect if cart is empty or user is not logged in
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart")
    }

    if (!user) {
      navigate("/login")
    }
  }, [cartItems, user, navigate])

  const validatePaymentInfo = () => {
    if (!paymentMethod) {
      setError("Please select a payment method")
      return false
    }

    if (paymentMethod === "Credit Card") {
      if (!cardNumber || !cardName || !cardExpiry || !cardCvv) {
        setError("Please fill in all card details")
        return false
      }

      // Basic validation for card number (16 digits)
      if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ""))) {
        setError("Please enter a valid 16-digit card number")
        return false
      }

      // Basic validation for expiry date (MM/YY)
      if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) {
        setError("Please enter a valid expiry date (MM/YY)")
        return false
      }

      // Basic validation for CVV (3 digits)
      if (!/^\d{3}$/.test(cardCvv)) {
        setError("Please enter a valid 3-digit CVV")
        return false
      }
    } else if (paymentMethod === "UPI") {
      if (!upiId) {
        setError("Please enter your UPI ID")
        return false
      }

      // Basic validation for UPI ID
      if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/.test(upiId)) {
        setError("Please enter a valid UPI ID")
        return false
      }
    }

    return true
  }

  const handlePayment = async (e) => {
    e.preventDefault()

    if (!validatePaymentInfo()) {
      return
    }

    try {
      setLoading(true)
      setError("")

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate successful payment
      setSuccess(true)

      // Clear cart after successful payment
      setTimeout(() => {
        clearCart()
        navigate("/order-success")
      }, 2000)
    } catch (err) {
      setError("Payment failed. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="container">
        <div className="payment-success">
          <div className="success-icon">✓</div>
          <h1>Payment Successful!</h1>
          <p>Your order has been placed successfully.</p>
          <p>Redirecting to order confirmation...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <h1 className="page-title">Payment</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="payment-container">
        <div className="payment-methods-section">
          <h2 className="section-title">Select Payment Method</h2>

          <div className="payment-methods">
            <div
              className={`payment-method ${paymentMethod === "Credit Card" ? "selected" : ""}`}
              onClick={() => setPaymentMethod("Credit Card")}
            >
              <div className="payment-method-icon">💳</div>
              <div className="payment-method-name">Credit Card</div>
            </div>

            <div
              className={`payment-method ${paymentMethod === "PayPal" ? "selected" : ""}`}
              onClick={() => setPaymentMethod("PayPal")}
            >
              <div className="payment-method-icon">🅿️</div>
              <div className="payment-method-name">PayPal</div>
            </div>

            <div
              className={`payment-method ${paymentMethod === "Google Pay" ? "selected" : ""}`}
              onClick={() => setPaymentMethod("Google Pay")}
            >
              <div className="payment-method-icon">G</div>
              <div className="payment-method-name">Google Pay</div>
            </div>

            <div
              className={`payment-method ${paymentMethod === "UPI" ? "selected" : ""}`}
              onClick={() => setPaymentMethod("UPI")}
            >
              <div className="payment-method-icon">🇮🇳</div>
              <div className="payment-method-name">UPI</div>
            </div>
          </div>

          <form onSubmit={handlePayment} className="payment-form">
            {paymentMethod === "Credit Card" && (
              <div className="credit-card-form">
                <div className="form-group">
                  <label htmlFor="cardNumber">Card Number</label>
                  <input
                    type="text"
                    id="cardNumber"
                    className="form-control"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cardName">Name on Card</label>
                  <input
                    type="text"
                    id="cardName"
                    className="form-control"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="John Doe"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group form-col">
                    <label htmlFor="cardExpiry">Expiry Date</label>
                    <input
                      type="text"
                      id="cardExpiry"
                      className="form-control"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM/YY"
                      maxLength="5"
                    />
                  </div>

                  <div className="form-group form-col">
                    <label htmlFor="cardCvv">CVV</label>
                    <input
                      type="text"
                      id="cardCvv"
                      className="form-control"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      placeholder="123"
                      maxLength="3"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "UPI" && (
              <div className="upi-form">
                <div className="form-group">
                  <label htmlFor="upiId">UPI ID</label>
                  <input
                    type="text"
                    id="upiId"
                    className="form-control"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="yourname@upi"
                  />
                </div>
              </div>
            )}

            {paymentMethod === "PayPal" && (
              <div className="paypal-info">
                <p>You will be redirected to PayPal to complete your payment.</p>
              </div>
            )}

            {paymentMethod === "Google Pay" && (
              <div className="gpay-info">
                <p>You will be redirected to Google Pay to complete your payment.</p>
              </div>
            )}

            {paymentMethod && (
              <button type="submit" className="payment-button" disabled={loading}>
                {loading ? "Processing..." : "Pay Now"}
              </button>
            )}
          </form>
        </div>

        <div className="order-summary-section">
          <h2 className="section-title">Order Summary</h2>

          <div className="order-items">
            {cartItems.map((item) => (
              <div key={item._id} className="order-item">
                <img src={item.image || "/placeholder.svg"} alt={item.name} className="order-item-image" />
                <div className="order-item-details">
                  <h3>{item.name}</h3>
                  <p>Qty: {item.quantity}</p>
                  <p className="order-item-price">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="order-totals">
            <div className="order-total-row">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>

            <div className="order-total-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <div className="order-total-row order-grand-total">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentPage

