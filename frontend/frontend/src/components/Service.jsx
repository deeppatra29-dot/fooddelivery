import React from 'react'
import { FaShippingFast, FaShoppingCart, FaEnvelope, FaPhoneAlt } from 'react-icons/fa'

const ServicePage = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 fw-bold" style={{ color: '#FF6B00' }}>
        Our Services
      </h2>

      {/* Delivery Help Section */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h4 className="card-title text-orange" style={{ color: '#FF6B00' }}>
            <FaShippingFast className="me-2" /> Delivery Help
          </h4>
          <p className="card-text">
            Need help with your food delivery? We deliver within 30–45 minutes across all major zones.
            Track your order live, or contact support for delays, wrong items, or delivery issues.
          </p>
        </div>
      </div>

      {/* Cart Items Section */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h4 className="card-title text-orange" style={{ color: '#FF6B00' }}>
            <FaShoppingCart className="me-2" /> Cart Items
          </h4>
          <p className="card-text">
            View and manage your cart before checkout. Ensure all items are added correctly and
            modify quantities on the go!
          </p>
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h4 className="card-title text-orange" style={{ color: '#FF6B00' }}>
            <FaPhoneAlt className="me-2" /> Contact Information
          </h4>
          <p className="card-text mb-1">
            <FaPhoneAlt className="me-2" />
            Phone: +91 98765 43210
          </p>
          <p className="card-text mb-1">
            <FaPhoneAlt className="me-2" />
            Support: +91 91234 56789
          </p>
          <p className="card-text mb-1">
            <FaEnvelope className="me-2" />
            Email: support@fooodyyy.in
          </p>
          <p className="card-text">
            <FaEnvelope className="me-2" />
            Feedback: hello@fooodyyy.in
          </p>
        </div>
      </div>
    </div>
  )
}

export default ServicePage
