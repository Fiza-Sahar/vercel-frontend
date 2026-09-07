import { Link } from "react-router-dom";

function About() {
    return (
        <div className="bg-light">
            {/* ================= HERO HEADER ================= */}
            <section className="py-5 bg-white border-bottom">
                <div className="container py-4 text-center">
                    <div className="d-inline-flex align-items-center gap-2 px-3 py-1 bg-primary-subtle text-primary rounded-pill small fw-bold mb-3">
                        <i className="bi bi-compass"></i>
                        <span>About MERN Store</span>
                    </div>

                    <h1 className="display-4 fw-bold text-dark mb-3">
                        Crafting a Better Way to <br className="d-none d-md-inline" />
                        Shop Modern Essentials.
                    </h1>

                    <p className="lead text-muted mx-auto" style={{ maxWidth: "680px", lineHeight: "1.7" }}>
                        Founded on a simple conviction: everyday electronics, footwear, and apparel should be thoughtfully engineered, transparently priced, and built to last.
                    </p>
                </div>
            </section>

            {/* ================= OUR STORY / MANIFESTO ================= */}
            <section className="py-5">
                <div className="container py-4">
                    <div className="row align-items-center g-5">
                        <div className="col-lg-6">
                            <span className="text-uppercase small fw-bold text-primary tracking-wider">Our Story</span>
                            <h2 className="display-6 fw-bold mb-4 text-dark">
                                Built for longevity, designed for everyday life.
                            </h2>

                            <p className="text-secondary mb-3" style={{ lineHeight: "1.8" }}>
                                We started MERN Store to solve a straightforward frustration: finding genuine, top-tier products without navigating through clunky marketplaces, confusing markups, and unreliable delivery timelines.
                            </p>

                            <p className="text-secondary mb-4" style={{ lineHeight: "1.8" }}>
                                By working directly with certified manufacturers and leveraging modern full-stack web technology, we streamline the entire pipeline—from catalog curation to real-time order tracking and prompt dispatch.
                            </p>

                            <div className="row g-3 pt-2">
                                <div className="col-sm-6">
                                    <div className="d-flex align-items-center gap-2">
                                        <i className="bi bi-check-circle-fill text-primary"></i>
                                        <span className="fw-semibold small text-dark">100% Genuine Inventory</span>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="d-flex align-items-center gap-2">
                                        <i className="bi bi-check-circle-fill text-primary"></i>
                                        <span className="fw-semibold small text-dark">Direct-To-Consumer Pricing</span>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="d-flex align-items-center gap-2">
                                        <i className="bi bi-check-circle-fill text-primary"></i>
                                        <span className="fw-semibold small text-dark">Rigorous Quality Testing</span>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="d-flex align-items-center gap-2">
                                        <i className="bi bi-check-circle-fill text-primary"></i>
                                        <span className="fw-semibold small text-dark">Dedicated Human Support</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="position-relative">
                                <img
                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80"
                                    alt="Our Design and Engineering Team"
                                    className="img-fluid rounded-4 shadow-sm"
                                    style={{ width: "100%", height: "420px", objectFit: "cover" }}
                                />
                                <div className="position-absolute bottom-0 start-0 m-4 p-3 bg-white rounded-3 shadow-sm border" style={{ maxWidth: "280px" }}>
                                    <h6 className="fw-bold mb-1 text-dark">Direct Quality Control</h6>
                                    <p className="text-muted small mb-0">Every product is verified and inspected prior to dispatch.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= CORE PILLARS ================= */}
            <section className="py-5 bg-white border-top border-bottom">
                <div className="container py-4">
                    <div className="text-center mb-5">
                        <span className="text-uppercase small fw-bold text-primary tracking-wider">Our Values</span>
                        <h2 className="fw-bold mb-2">The Principles That Guide Us</h2>
                        <p className="text-muted mx-auto" style={{ maxWidth: "540px" }}>
                            How we select products, build software, and serve our customer community.
                        </p>
                    </div>

                    <div className="row g-4">
                        <div className="col-md-6 col-lg-3">
                            <div className="card h-100 border p-4 rounded-4 shadow-sm bg-white">
                                <div className="d-inline-flex p-3 rounded-3 bg-primary-subtle text-primary mb-3 align-self-start fs-4">
                                    <i className="bi bi-gem"></i>
                                </div>
                                <h5 className="fw-bold mb-2 text-dark">Uncompromised Quality</h5>
                                <p className="text-muted small mb-0" style={{ lineHeight: "1.6" }}>
                                    We rigorously evaluate materials, components, and durability before any item enters our store catalog.
                                </p>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-3">
                            <div className="card h-100 border p-4 rounded-4 shadow-sm bg-white">
                                <div className="d-inline-flex p-3 rounded-3 bg-primary-subtle text-primary mb-3 align-self-start fs-4">
                                    <i className="bi bi-shield-check"></i>
                                </div>
                                <h5 className="fw-bold mb-2 text-dark">Honest Transparency</h5>
                                <p className="text-muted small mb-0" style={{ lineHeight: "1.6" }}>
                                    Clear pricing with zero surprise checkout fees, straightforward return windows, and real customer reviews.
                                </p>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-3">
                            <div className="card h-100 border p-4 rounded-4 shadow-sm bg-white">
                                <div className="d-inline-flex p-3 rounded-3 bg-primary-subtle text-primary mb-3 align-self-start fs-4">
                                    <i className="bi bi-lightning-charge"></i>
                                </div>
                                <h5 className="fw-bold mb-2 text-dark">Modern Performance</h5>
                                <p className="text-muted small mb-0" style={{ lineHeight: "1.6" }}>
                                    Built on high-speed React architecture and secure REST APIs for instant search, quick filtering, and fluid checkout.
                                </p>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-3">
                            <div className="card h-100 border p-4 rounded-4 shadow-sm bg-white">
                                <div className="d-inline-flex p-3 rounded-3 bg-primary-subtle text-primary mb-3 align-self-start fs-4">
                                    <i className="bi bi-people"></i>
                                </div>
                                <h5 className="fw-bold mb-2 text-dark">Human Support</h5>
                                <p className="text-muted small mb-0" style={{ lineHeight: "1.6" }}>
                                    No robotic loops. Our team is accessible and personally invested in resolving any inquiry quickly.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= KEY METRICS ================= */}
            <section className="py-5" style={{ backgroundColor: "#0f172a" }}>
                <div className="container py-4 text-white">
                    <div className="row text-center g-4">
                        <div className="col-6 col-md-3">
                            <h2 className="display-5 fw-bold text-white mb-1">15,000+</h2>
                            <p className="text-secondary small mb-0">Satisfied Customers</p>
                        </div>

                        <div className="col-6 col-md-3">
                            <h2 className="display-5 fw-bold text-white mb-1">4.9 / 5</h2>
                            <p className="text-secondary small mb-0">Average Product Rating</p>
                        </div>

                        <div className="col-6 col-md-3">
                            <h2 className="display-5 fw-bold text-white mb-1">24 Hours</h2>
                            <p className="text-secondary small mb-0">Typical Dispatch Window</p>
                        </div>

                        <div className="col-6 col-md-3">
                            <h2 className="display-5 fw-bold text-white mb-1">100%</h2>
                            <p className="text-secondary small mb-0">Authentic Guarantee</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= CALL TO ACTION ================= */}
            <section className="py-5 bg-white border-top">
                <div className="container py-4 text-center">
                    <h2 className="display-6 fw-bold mb-3 text-dark">
                        Experience the Difference Today
                    </h2>
                    <p className="text-muted mx-auto mb-4" style={{ maxWidth: "540px" }}>
                        Explore our carefully selected catalog and discover premium goods designed for work, home, and life.
                    </p>
                    <div className="d-flex justify-content-center gap-3">
                        <Link to="/products" className="btn btn-modern-primary btn-lg">
                            Browse Collection <i className="bi bi-arrow-right"></i>
                        </Link>
                        <Link to="/contact" className="btn btn-modern-secondary btn-lg">
                            Get In Touch
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default About;