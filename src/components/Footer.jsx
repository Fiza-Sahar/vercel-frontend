import React from "react";
import { NavLink } from "react-router-dom";

function Footer() {
    return (
        <footer className="footer-modern mt-auto">
            {/* Main Footer */}
            <div className="container py-5">
                <div className="row g-4">
                    {/* Logo / Brand Intro */}
                    <div className="col-lg-4 col-md-6">
                        <NavLink to="/" className="text-decoration-none text-white d-inline-flex align-items-center gap-2 mb-3">
                            <i className="bi bi-shop text-primary fs-3"></i>
                            <span className="fs-4 fw-bold">
                                SHOP<span className="text-primary">Sphere</span>
                            </span>
                        </NavLink>

                        <p className="text-secondary pe-lg-4 mb-4 small" style={{ lineHeight: "1.7" }}>
                            A high-performance modern e-commerce platform built with MongoDB, Express, React, and Node.js. Delivering exceptional products with seamless shopping experiences.
                        </p>

                        <div className="d-flex gap-2">
                            <a href="#" className="footer-social-btn" title="Facebook">
                                <i className="bi bi-facebook"></i>
                            </a>
                            <a href="#" className="footer-social-btn" title="Instagram">
                                <i className="bi bi-instagram"></i>
                            </a>
                            <a href="#" className="footer-social-btn" title="Twitter / X">
                                <i className="bi bi-twitter-x"></i>
                            </a>
                            <a href="#" className="footer-social-btn" title="GitHub">
                                <i className="bi bi-github"></i>
                            </a>
                        </div>
                    </div>

                    {/* Quick Store Links */}
                    <div className="col-lg-2 col-md-6 col-6">
                        <h6 className="text-white fw-bold text-uppercase mb-3 small tracking-wider">
                            Explore
                        </h6>
                        <ul className="list-unstyled d-flex flex-column gap-2 mb-0 small">
                            <li>
                                <NavLink to="/" className="footer-link">
                                    <i className="bi bi-chevron-right text-primary"></i> Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/products" className="footer-link">
                                    <i className="bi bi-chevron-right text-primary"></i> All Products
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/about" className="footer-link">
                                    <i className="bi bi-chevron-right text-primary"></i> About Us
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact" className="footer-link">
                                    <i className="bi bi-chevron-right text-primary"></i> Contact
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Account Links (Admin Link Removed) */}
                    <div className="col-lg-3 col-md-6 col-6">
                        <h6 className="text-white fw-bold text-uppercase mb-3 small tracking-wider">
                            Customer Area
                        </h6>
                        <ul className="list-unstyled d-flex flex-column gap-2 mb-0 small">
                            <li>
                                <NavLink to="/cart" className="footer-link">
                                    <i className="bi bi-cart3 text-primary"></i> Shopping Cart
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/my-orders" className="footer-link">
                                    <i className="bi bi-bag-check text-primary"></i> Order History
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard" className="footer-link">
                                    <i className="bi bi-person text-primary"></i> My Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/products" className="footer-link">
                                    <i className="bi bi-tag text-primary"></i> Latest Deals
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* Contact & Support info */}
                    <div className="col-lg-3 col-md-6">
                        <h6 className="text-white fw-bold text-uppercase mb-3 small tracking-wider">
                            Get in Touch
                        </h6>
                        <div className="d-flex flex-column gap-3 small text-secondary">
                            <div className="d-flex align-items-start gap-2">
                                <i className="bi bi-geo-alt-fill text-primary fs-6 mt-1"></i>
                                <span>123 Innovation Boulevard, Tech District, Karachi, PK</span>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                <i className="bi bi-envelope-fill text-primary fs-6"></i>
                                <span>support@mernstore.com</span>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                <i className="bi bi-telephone-fill text-primary fs-6"></i>
                                <span>+92 (300) 123-4567</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)", backgroundColor: "#090d16" }}>
                <div className="container py-3">
                    <div className="row align-items-center small">
                        <div className="col-md-6 text-center text-md-start text-secondary">
                            © {new Date().getFullYear()} <strong className="text-white">MERN Store</strong>. All rights reserved.
                        </div>
                        <div className="col-md-6 text-center text-md-end text-secondary mt-2 mt-md-0">
                            <span className="me-3">
                                <i className="bi bi-lock-fill text-success me-1"></i> SSL 256-Bit Encrypted
                            </span>
                            <span>
                                <i className="bi bi-cpu-fill text-primary me-1"></i> Powered by React & Node.js
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;