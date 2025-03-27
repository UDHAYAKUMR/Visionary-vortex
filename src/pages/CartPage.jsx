"use client"

import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { CartContext } from "../context/CartContext"
import { AuthContext } from "../context/AuthContext"

const CartPage = () => {
  const { cartItems, cartTotal, removeFromCart, updateQuantity, clearCart } = useContext(CartContext)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleCheckout = () => {
    if (!user) {
      navigate("/login")
    } else {
      navigate("/payment")
    }
  }

  // Handle image loading errors
  const handleImageError = (e) => {
    e.target.src = "/placeholder.svg"
  }

  if (cartItems.length === 0) {
    return (
      <div className="container my-4 text-center">
        <h1>Your Cart</h1>
        <p>Your cart is empty</p>
        <Link to="/" className="btn btn-primary mt-4">
          Go Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="container my-4">
      <h1 className="mb-4">Shopping Cart</h1>

      <div className="card">
        {cartItems.map((item) => (
          <div key={item._id} className="cart-item">
            <img
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              className="cart-item-image"
              onError={handleImageError}
            />

            <div className="cart-item-details">
              <h3>
                <Link to={`/product/${item._id}`}>{item.name}</Link>
              </h3>
              <div className="cart-item-price">${item.price.toFixed(2)}</div>

              <div className="cart-item-quantity">
                <button onClick={() => updateQuantity(item._id, item.quantity - 1)} disabled={item.quantity <= 1}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  disabled={item.quantity >= Math.min(item.countInStock, 10)}
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() => removeFromCart(item._id)}
              className="btn btn-secondary"
              style={{ height: "fit-content" }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-summary-row">
          <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>

        <div className="cart-summary-row">
          <span>Shipping</span>
          <span>Free</span>
        </div>

        <div className="cart-summary-row cart-summary-total">
          <span>Total</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>

        <button onClick={handleCheckout} className="btn btn-primary" style={{ width: "100%", marginTop: "20px" }}>
          Proceed to Payment
        </button>

        <button onClick={clearCart} className="btn btn-secondary" style={{ width: "100%", marginTop: "10px" }}>
          Clear Cart
        </button>
      </div>
    </div>
  )
}

export default CartPage

