import React from 'react';
import '../components/Homemain.css'
import image from '../img/homemainimage.png'
function Homemain() {
  const handleLogin = () => {
    window.location.href = 'https://example.com/login'; // Replace with actual login page URL
  };

  const handleSignup = () => {
    window.location.href = 'https://example.com/signup'; // Replace with actual signup page URL
  };

  return (
    <div className="unique-main-wrapper">
      {/* <header className="unique-header-section">
        <div className="unique-header-content">
          <div className="unique-logo-container">
            <img src="logo.png" alt="SecureSelf Logo" className="unique-logo" />
          </div>
          <div className="unique-button-container">
            <button id="loginBtn" className="unique-btn unique-login-btn" onClick={handleLogin}>Login</button>
            <button id="signupBtn" className="unique-btn unique-signup-btn" onClick={handleSignup}>Sign Up</button>
          </div>
        </div>
      </header> */}

      <div className="unique-main-content">
        <section className="unique-hero-section">
          <div className="unique-left-content">
            <h1 id="animated-heading" className="unique-animated-heading">
              Welcome to Secure Self: Your Digital Guardian
            </h1>
            <p>Secure Self is a cutting-edge platform designed to revolutionize how you manage your personal documents.</p>
            <p>Say goodbye to the hassle of physical documents and embrace the future of digital document management with Secure Self.</p>
            <button className="unique-btn unique-explore-btn">Explore Now</button>
          </div>
          <div className="unique-right-image transform transition duration-300 hover:scale-110">
            <img src={image} alt="Secure Self Platform" className="unique-platform-img" />
          </div>
        </section>

        <section className="unique-features-section">
          <div className="unique-feature-card hover:text-white ">
            <div className="unique-feature-icon">🔒</div>
            <h3>Advanced Security</h3>
            <p>Top-notch encryption to keep your documents secure.</p>
          </div>
          <div className="unique-feature-card hover:text-white">
            <div className="unique-feature-icon">🌿</div>
            <h3>Eco-Friendly</h3>
            <p>Reduce paper waste and contribute to a sustainable future.</p>
          </div>
          <div className="unique-feature-card hover:text-white">
            <div className="unique-feature-icon">✔</div>
            <h3>Easy Verification</h3>
            <p>Quick and simple document verification process.</p>
          </div>
          <div className="unique-feature-card hover:text-white">
            <div className="unique-feature-icon">📱</div>
            <h3>Anywhere Access</h3>
            <p>Access your documents anytime, anywhere, from any device.</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Homemain;
