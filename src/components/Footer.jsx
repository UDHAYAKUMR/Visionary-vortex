import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Visionary Vortex</h3>
          <p>Your one-stop shop for all your needs.</p>
        </div>

        <div className="footer-section">
          <h3>Shop</h3>
          <ul className="footer-links">
            <li>
              <Link to="/">All Products</Link>
            </li>
            <li>
              <Link to="/">New Arrivals</Link>
            </li>
            <li>
              <Link to="/">Best Sellers</Link>
            </li>
            <li>
              <Link to="/">Deals & Promotions</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Customer Service</h3>
          <ul className="footer-links">
            <li>
              <Link to="/">Contact Us</Link>
            </li>
            <li>
              <Link to="/">FAQs</Link>
            </li>
            <li>
              <Link to="/">Shipping & Returns</Link>
            </li>
            <li>
              <Link to="/">Track Order</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>About Us</h3>
          <ul className="footer-links">
            <li>
              <Link to="/">Our Story</Link>
            </li>
            <li>
              <Link to="/">Careers</Link>
            </li>
            <li>
              <Link to="/">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/">Terms of Service</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Visionary Vortex. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer

