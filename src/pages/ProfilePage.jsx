"use client"

import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { AuthContext } from "../context/AuthContext"

const ProfilePage = () => {
  const { user, updateProfile, loading, error } = useContext(AuthContext)
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState("profile")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [formError, setFormError] = useState("")
  const [success, setSuccess] = useState("")
  const [orders, setOrders] = useState([])
  const [loadingOrders, setLoadingOrders] = useState(true)
  const [addresses, setAddresses] = useState([
    { id: 1, type: "Home", address: "123 Main St", city: "New York", state: "NY", zip: "10001", isDefault: true },
    { id: 2, type: "Work", address: "456 Office Blvd", city: "New York", state: "NY", zip: "10002", isDefault: false },
  ])

  useEffect(() => {
    if (!user) {
      navigate("/login")
    } else {
      setName(user.name)
      setEmail(user.email)

      // Fetch user's orders
      const fetchOrders = async () => {
        try {
          const token = localStorage.getItem("token")

          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }

          const res = await axios.get("http://localhost:5000/api/orders/myorders", config)
          setOrders(res.data)
        } catch (err) {
          console.error(err)
        } finally {
          setLoadingOrders(false)
        }
      }

      fetchOrders()
    }
  }, [user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setFormError("Passwords do not match")
      return
    }

    try {
      const updatedUser = {
        name,
        email,
      }

      if (password) {
        updatedUser.password = password
      }

      await updateProfile(updatedUser)
      setSuccess("Profile updated successfully")
      setPassword("")
      setConfirmPassword("")

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess("")
      }, 3000)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="container">
      <h1 className="page-title">My Account</h1>

      <div className="profile-container">
        <div className="profile-sidebar">
          <img src={user?.avatar || "https://via.placeholder.com/100"} alt={user?.name} className="profile-avatar" />

          <h2 className="profile-name">{user?.name}</h2>
          <p className="profile-email">{user?.email}</p>

          <ul className="profile-menu">
            <li className={`profile-menu-item ${activeTab === "profile" ? "active" : ""}`}>
              <a
                href="#profile"
                onClick={(e) => {
                  e.preventDefault()
                  setActiveTab("profile")
                }}
              >
                <span>👤</span> Profile Information
              </a>
            </li>
            <li className={`profile-menu-item ${activeTab === "orders" ? "active" : ""}`}>
              <a
                href="#orders"
                onClick={(e) => {
                  e.preventDefault()
                  setActiveTab("orders")
                }}
              >
                <span>📦</span> My Orders
              </a>
            </li>
            <li className={`profile-menu-item ${activeTab === "addresses" ? "active" : ""}`}>
              <a
                href="#addresses"
                onClick={(e) => {
                  e.preventDefault()
                  setActiveTab("addresses")
                }}
              >
                <span>📍</span> My Addresses
              </a>
            </li>
            <li className={`profile-menu-item ${activeTab === "wishlist" ? "active" : ""}`}>
              <a
                href="#wishlist"
                onClick={(e) => {
                  e.preventDefault()
                  setActiveTab("wishlist")
                }}
              >
                <span>❤️</span> Wishlist
              </a>
            </li>
          </ul>
        </div>

        <div className="profile-content">
          {activeTab === "profile" && (
            <div className="profile-section">
              <h2 className="profile-section-title">Profile Information</h2>

              {error && <div className="alert alert-danger">{error}</div>}
              {formError && <div className="alert alert-danger">{formError}</div>}
              {success && <div className="alert alert-success">{success}</div>}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">New Password</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password (leave blank to keep current)"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm New Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="form-control"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                  />
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Updating..." : "Update Profile"}
                </button>
              </form>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="profile-section">
              <h2 className="profile-section-title">My Orders</h2>

              {loadingOrders ? (
                <p>Loading orders...</p>
              ) : orders.length === 0 ? (
                <div className="empty-state">
                  <p>You have no orders yet</p>
                  <button onClick={() => navigate("/")} className="btn btn-primary">
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="orders-list">
                  {orders.map((order) => (
                    <div key={order._id} className="order-card">
                      <div className="order-header">
                        <div>
                          <h3>Order #{order._id.substring(0, 8)}</h3>
                          <p className="order-date">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="order-status">
                          {order.isPaid ? (
                            <span className="status-paid">Paid</span>
                          ) : (
                            <span className="status-unpaid">Unpaid</span>
                          )}
                          {order.isDelivered ? (
                            <span className="status-delivered">Delivered</span>
                          ) : (
                            <span className="status-pending">Pending</span>
                          )}
                        </div>
                      </div>

                      <div className="order-items">
                        {order.orderItems.map((item) => (
                          <div key={item._id} className="order-item">
                            <img src={item.image || "/placeholder.svg"} alt={item.name} className="order-item-image" />
                            <div className="order-item-details">
                              <h4>{item.name}</h4>
                              <p>
                                Qty: {item.quantity} × ${item.price.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="order-footer">
                        <div className="order-total">
                          <p>
                            Total: <span>${order.totalPrice.toFixed(2)}</span>
                          </p>
                        </div>
                        <button onClick={() => navigate(`/order/${order._id}`)} className="btn btn-secondary">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "addresses" && (
            <div className="profile-section">
              <h2 className="profile-section-title">My Addresses</h2>

              <div className="addresses-list">
                {addresses.map((address) => (
                  <div key={address.id} className="address-card">
                    <div className="address-header">
                      <h3>{address.type}</h3>
                      {address.isDefault && <span className="default-badge">Default</span>}
                    </div>
                    <div className="address-content">
                      <p>{address.address}</p>
                      <p>
                        {address.city}, {address.state} {address.zip}
                      </p>
                    </div>
                    <div className="address-actions">
                      <button className="btn btn-sm btn-secondary">Edit</button>
                      {!address.isDefault && <button className="btn btn-sm btn-outline">Set as Default</button>}
                    </div>
                  </div>
                ))}

                <div className="add-address-card">
                  <button className="add-address-btn">
                    <span>+</span>
                    <p>Add New Address</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "wishlist" && (
            <div className="profile-section">
              <h2 className="profile-section-title">My Wishlist</h2>

              <div className="empty-state">
                <p>Your wishlist is empty</p>
                <button onClick={() => navigate("/")} className="btn btn-primary">
                  Start Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage

