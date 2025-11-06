import React from "react";
import "./../styles/HomePage.css";

function HomePage({ onGetStarted }) {
  return (
    <div className="homepage">
      {/* Header */}
      <header className="header">
        <div className="logo">✨ SkinSense AI</div>
        <nav className="nav">
          <a href="#features">Features</a>
          <a href="#routines">Routines</a>
          <a href="#faq">FAQ</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Your Personal Skincare & Wellness AI Advisor</h1>
          <p className="hero-subtitle">
            Discover personalized skincare routines, home remedies, and self-care tips for your unique skin
          </p>
          <button className="cta-button" onClick={onGetStarted}>
            Start Your Skincare Journey
          </button>
        </div>
        <div className="hero-image">
          <div className="floating-card">
            <div className="card-icon">🌸</div>
            <p>Natural Beauty, Naturally</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <h2>Why Choose SkinSense AI</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">💧</div>
            <h3>Skincare Routines</h3>
            <p>Personalized morning & evening routines for your skin type</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🍯</div>
            <h3>Home Remedies</h3>
            <p>Natural, accessible ingredients for common beauty concerns</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💄</div>
            <h3>Product Guide</h3>
            <p>Honest product recommendations tailored to your needs</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🧘‍♀️</div>
            <h3>Wellness Tips</h3>
            <p>Self-care practices and wellness guidance for glowing skin</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✨</div>
            <h3>Expert Advice</h3>
            <p>Evidence-based beauty guidance from skincare knowledge</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌿</div>
            <h3>Natural First</h3>
            <p>Emphasis on natural ingredients and sustainable practices</p>
          </div>
        </div>
      </section>

      {/* Skincare Routines Section */}
      <section id="routines" className="routines">
        <h2>Build Your Perfect Routine</h2>
        <div className="routine-steps">
          <div className="routine-step">
            <div className="step-icon">🌅</div>
            <h3>Morning Routine</h3>
            <p>💦 Cleanse → 🍃 Tone → 💧 Moisturize → 🌞 SPF</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="routine-step">
            <div className="step-icon">🌙</div>
            <h3>Evening Routine</h3>
            <p>💦 Cleanse → 🍯 Treatment → 💧 Night Cream</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="routine-step">
            <div className="step-icon">✨</div>
            <h3>Weekly Care</h3>
            <p>🧖‍♀️ Mask → 🧴 Scrub → 💆‍♀️ Relaxation</p>
          </div>
        </div>
      </section>

      {/* Self-Care Tips Section */}
      <section className="selfcare">
        <h2>Self-Care Tips</h2>
        <div className="selfcare-content">
          <div className="selfcare-text">
            <h3>Holistic Beauty & Wellness</h3>
            <p>
              Beautiful skin starts from within. GlowBot provides comprehensive self-care guidance including skincare routines, home remedies, wellness practices, and lifestyle tips.
            </p>
            <ul className="selfcare-list">
              <li>✓ Daily skincare routines personalized to your skin type</li>
              <li>✓ Home remedies using natural, accessible ingredients</li>
              <li>✓ Hydration and nutrition guidance</li>
              <li>✓ Meditation and relaxation tips</li>
              <li>✓ Sleep optimization for glowing skin</li>
            </ul>
          </div>
          <div className="selfcare-benefits">
            <div className="benefit-item">🌸 Cleanse</div>
            <div className="benefit-item">🍯 Nourish</div>
            <div className="benefit-item">💧 Hydrate</div>
            <div className="benefit-item">✨ Glow</div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-grid">
          <div className="faq-item">
            <h4>What skin types do you support?</h4>
            <p>
              We provide personalized advice for all skin types: oily, dry, sensitive, combination, and normal skin.
            </p>
          </div>
          <div className="faq-item">
            <h4>Are home remedies safe?</h4>
            <p>
              We recommend doing patch tests before trying any new ingredients. Everyone's skin reacts differently!
            </p>
          </div>
          <div className="faq-item">
            <h4>When should I see a dermatologist?</h4>
            <p>
              For skin diseases, infections, or persistent concerns, we recommend consulting a certified dermatologist.
            </p>
          </div>
          <div className="faq-item">
            <h4>Can I use these tips daily?</h4>
            <p>
              Yes! Our routines are designed for daily use. Consistency is key to seeing results within 2-4 weeks.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="final-cta">
        <h2>Ready to Improve Your Skin Health?</h2>
        <p>Get personalized skincare routines and beauty advice tailored just for you</p>
        <button className="cta-button large" onClick={onGetStarted}>
          Chat with SkinSense AI Now ✨
        </button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 SkinSense AI - Your Personal Skincare Advisor</p>
        <div className="footer-links">
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
          <a href="#contact">Contact</a>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
