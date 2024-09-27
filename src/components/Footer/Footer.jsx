import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-10">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Company Description */}
          <div>
            <h2 className="text-xl font-bold text-teal-400 mb-4">SecureUpload</h2>
            <p className="text-sm">
              SecureUpload provides a trusted platform for secure, encrypted document uploads. Your privacy and data protection are our top priority.
            </p>
          </div>

          {/* Column 2: Security Features */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Security Features</h3>
            <ul className="space-y-2">
              <li>🔒 End-to-End Encryption</li>
              <li>🛡️ 24/7 Monitoring</li>
              <li>📂 Secure Document Storage</li>
              <li>👨‍💻 Role-Based Access Control</li>
              <li>📜 GDPR Compliant</li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-teal-400 transition-colors">Home</a></li>
              <li><a href="/upload" className="hover:text-teal-400 transition-colors">Upload Documents</a></li>
              <li><a href="/faq" className="hover:text-teal-400 transition-colors">FAQ</a></li>
              <li><a href="/contact" className="hover:text-teal-400 transition-colors">Contact Us</a></li>
              <li><a href="/privacy" className="hover:text-teal-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Column 4: Contact and Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
            <p className="text-sm">Email: support@secureupload.com</p>
            <p className="text-sm">Phone: +123-456-7890</p>
            <div className="flex space-x-4 mt-4">
              {/* Social Media Icons */}
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 text-2xl">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 text-2xl">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 text-2xl">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 text-2xl">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-sm">
            © SecureSelf@2024. All rights reserved. Your documents are safe with us.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
