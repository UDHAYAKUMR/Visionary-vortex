"use client"

import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { CartContext } from "../context/CartContext"

const ProductPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useContext(CartContext)

  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`)
        setProduct(res.data)
      } catch (err) {
        setError("Product not found")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    addToCart(product, quantity)
    navigate("/cart")
  }

  // Handle image loading errors
  const handleImageError = (e) => {
    e.target.src = "/placeholder.svg"
  }

  if (loading) {
    return (
      <div className="container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading product...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="container">
        <div className="error-message">
          <p>{error || "Product not found"}</p>
          <button onClick={() => navigate("/")} className="btn btn-primary">
            Back to Products
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="product-page">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>

        <div className="product-detail-container">
          <div className="product-detail-image-container">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="product-detail-image"
              onError={handleImageError}
            />
          </div>

          <div className="product-detail-info">
            <h1 className="product-detail-title">{product.name}</h1>

            <div className="product-detail-rating">
              {"★".repeat(Math.floor(product.rating))}
              {"☆".repeat(5 - Math.floor(product.rating))}
              <span>({product.numReviews} reviews)</span>
            </div>

            <div className="product-detail-price">${product.price.toFixed(2)}</div>

            <div className="product-detail-description">
              <h3>Description:</h3>
              <p>{product.description}</p>
            </div>

            <div className="product-detail-meta">
              <p>
                <strong>Brand:</strong> {product.brand}
              </p>
              <p>
                <strong>Category:</strong> {product.category}
              </p>
              <p>
                <strong>Availability:</strong> {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
              </p>
            </div>

            {product.countInStock > 0 ? (
              <div className="product-detail-actions">
                <div className="quantity-selector">
                  <label htmlFor="quantity">Quantity:</label>
                  <select id="quantity" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
                    {[...Array(Math.min(product.countInStock, 10)).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <button onClick={handleAddToCart} className="add-to-cart-detail-btn">
                  Add to Cart
                </button>
              </div>
            ) : (
              <div className="out-of-stock-message">Sorry, this product is currently out of stock.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage

