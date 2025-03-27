"use client"

import { useContext } from "react"
import { Link } from "react-router-dom"
import { CartContext } from "../context/CartContext"

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
  }

  // Ensure image is properly displayed with error handling
  const handleImageError = (e) => {
    e.target.src = "/placeholder.svg"
  }

  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`} className="product-card-link">
        <div className="product-image-container">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="product-image"
            onError={handleImageError}
          />
        </div>
        <div className="product-info">
          <h3 className="product-title">{product.name}</h3>
          <div className="product-rating">
            {"★".repeat(Math.floor(product.rating))}
            {"☆".repeat(5 - Math.floor(product.rating))}
            <span>({product.numReviews})</span>
          </div>
          <p className="product-price">${product.price.toFixed(2)}</p>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard

