import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#00539c] text-white pt-10 pb-6 px-4 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10 border-b border-white/20 pb-8">
        {/* Logo + Description */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-3 text-[#fcc860]">Policy.ai</h2>
          <p className="text-sm text-white/80">
            Helping you choose the best LIC policy tailored to your unique needs
            using intelligent AI recommendations. Secure your future today!
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-3 text-[#fcc860]">Quick Links</h3>
          <ul className="space-y-2 text-white/90 text-sm">
            <li>
              <Link to="/" className="hover:text-[#fcc860] transition">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/recommendations"
                className="hover:text-[#fcc860] transition"
              >
                Recommendations
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-[#fcc860] transition">
                Login / Register
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact / Support */}
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-3 text-[#fcc860]">Contact</h3>
          <ul className="space-y-2 text-white/90 text-sm">
            <li>
              Email:{" "}
              <a href="support@policyai.com" className="hover:text-[#fcc860]">
                support@policyai.com
              </a>
            </li>
            <li>Phone: +91-12345-67890</li>
            <li>Location: Hyderbad, India</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-6 text-center text-sm text-white/60">
        © {new Date().getFullYear()} policy.ai All rights reserved.
      </div>
    </footer>
  );
}
