import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

const ContactUs = () => {
  const { isDarkMode, colors } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting us! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const locations = [
    {
      name: "Grand Cinema Downtown",
      address: "123 Main Street, Downtown",
      phone: "+1 (555) 123-4567",
      hours: "9:00 AM - 11:00 PM",
    },
    {
      name: "Luxury Cinema Mall",
      address: "456 Shopping Blvd, Mall District",
      phone: "+1 (555) 987-6543",
      hours: "10:00 AM - 12:00 AM",
    },
    {
      name: "Family Cinema Center",
      address: "789 Family Street, Suburb Area",
      phone: "+1 (555) 456-7890",
      hours: "9:00 AM - 11:00 PM",
    },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white"
          : "bg-gradient-to-b from-white via-gray-50 to-white text-gray-900"
      }`}
    >
      {/* Hero */}
      <section
        className={`relative overflow-hidden rounded-b-[40px] shadow-2xl border-b transition-colors duration-300 ${
          isDarkMode ? "border-white/10" : "border-gray-200"
        }`}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-b transition-colors duration-300 ${
            isDarkMode
              ? "from-black via-[#1c1c1c]/90 to-transparent"
              : "from-white via-white/90 to-transparent"
          }`}
        />
        <img
          src="/contact-uss.png"
          alt="Cinema"
          className={`w-full h-80 object-cover transition-opacity duration-300 ${
            isDarkMode ? "opacity-30" : "opacity-20"
          }`}
        />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 md:px-10 space-y-4">
            <div
              className="flex items-center gap-3 transition-colors duration-300"
              style={{ color: colors.primary }}
            >
              <FaEnvelope className="text-5xl" />
            </div>
            <h1
              className={`text-5xl md:text-6xl font-bold transition-colors duration-300 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Contact <span style={{ color: colors.primary }}>Us</span>
            </h1>
            <p
              className={`text-lg max-w-3xl transition-colors duration-300 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              We'd love to hear from you. Get in touch with us today!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="container mx-auto px-4 md:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div
            className={`rounded-3xl border shadow-2xl p-8 transition-colors duration-300 ${
              isDarkMode
                ? "bg-[#111111] border-white/10"
                : "bg-white border-gray-200"
            }`}
          >
            <h2
              className={`text-3xl font-bold mb-6 transition-colors duration-300 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Send us a <span style={{ color: colors.primary }}>Message</span>
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  className={`block text-sm mb-2 transition-colors duration-300 ${
                    isDarkMode ? "text-gray-400" : "text-gray-700"
                  }`}
                >
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-1 transition-all duration-300 ${
                    isDarkMode
                      ? "bg-gray-900 border-white/10 text-white"
                      : "bg-gray-50 border-gray-300 text-gray-900"
                  }`}
                  onFocus={(e) => {
                    e.target.style.borderColor = colors.primary;
                    e.target.style.boxShadow = `0 0 0 3px ${colors.primary}30`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = isDarkMode
                      ? "rgba(255,255,255,0.1)"
                      : "#D1D5DB";
                    e.target.style.boxShadow = "none";
                  }}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label
                  className={`block text-sm mb-2 transition-colors duration-300 ${
                    isDarkMode ? "text-gray-400" : "text-gray-700"
                  }`}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-1 transition-all duration-300 ${
                    isDarkMode
                      ? "bg-gray-900 border-white/10 text-white"
                      : "bg-gray-50 border-gray-300 text-gray-900"
                  }`}
                  onFocus={(e) => {
                    e.target.style.borderColor = colors.primary;
                    e.target.style.boxShadow = `0 0 0 3px ${colors.primary}30`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = isDarkMode
                      ? "rgba(255,255,255,0.1)"
                      : "#D1D5DB";
                    e.target.style.boxShadow = "none";
                  }}
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label
                  className={`block text-sm mb-2 transition-colors duration-300 ${
                    isDarkMode ? "text-gray-400" : "text-gray-700"
                  }`}
                >
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-1 transition-all duration-300 ${
                    isDarkMode
                      ? "bg-gray-900 border-white/10 text-white"
                      : "bg-gray-50 border-gray-300 text-gray-900"
                  }`}
                  onFocus={(e) => {
                    e.target.style.borderColor = colors.primary;
                    e.target.style.boxShadow = `0 0 0 3px ${colors.primary}30`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = isDarkMode
                      ? "rgba(255,255,255,0.1)"
                      : "#D1D5DB";
                    e.target.style.boxShadow = "none";
                  }}
                  placeholder="How can we help?"
                />
              </div>
              <div>
                <label
                  className={`block text-sm mb-2 transition-colors duration-300 ${
                    isDarkMode ? "text-gray-400" : "text-gray-700"
                  }`}
                >
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-1 transition-all duration-300 resize-none ${
                    isDarkMode
                      ? "bg-gray-900 border-white/10 text-white"
                      : "bg-gray-50 border-gray-300 text-gray-900"
                  }`}
                  onFocus={(e) => {
                    e.target.style.borderColor = colors.primary;
                    e.target.style.boxShadow = `0 0 0 3px ${colors.primary}30`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = isDarkMode
                      ? "rgba(255,255,255,0.1)"
                      : "#D1D5DB";
                    e.target.style.boxShadow = "none";
                  }}
                  placeholder="Tell us more..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 text-white font-semibold rounded-xl transition-all duration-300"
                style={{ backgroundColor: colors.primary }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = colors.primary;
                  e.currentTarget.style.border = `2px solid ${colors.primary}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = colors.primary;
                  e.currentTarget.style.color = "white";
                  e.currentTarget.style.border = "none";
                }}
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div
              className={`rounded-3xl border shadow-2xl p-8 transition-colors duration-300 ${
                isDarkMode
                  ? "bg-[#111111] border-white/10"
                  : "bg-white border-gray-200"
              }`}
            >
              <h2
                className={`text-3xl font-bold mb-6 transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Get in <span style={{ color: colors.primary }}>Touch</span>
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                    style={{ backgroundColor: `${colors.primary}10` }}
                  >
                    <FaMapMarkerAlt
                      className="text-xl transition-colors duration-300"
                      style={{ color: colors.primary }}
                    />
                  </div>
                  <div>
                    <h3
                      className={`font-semibold mb-1 transition-colors duration-300 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Head Office
                    </h3>
                    <p
                      className={`text-sm transition-colors duration-300 ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      123 Cinema Street, Entertainment District, City 12345
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                    style={{ backgroundColor: `${colors.primary}10` }}
                  >
                    <FaPhone
                      className="text-xl transition-colors duration-300"
                      style={{ color: colors.primary }}
                    />
                  </div>
                  <div>
                    <h3
                      className={`font-semibold mb-1 transition-colors duration-300 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Phone
                    </h3>
                    <p
                      className={`text-sm transition-colors duration-300 ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      +1 (555) 123-4567
                    </p>
                    <p
                      className={`text-sm transition-colors duration-300 ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      +1 (555) 987-6543
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                    style={{ backgroundColor: `${colors.primary}10` }}
                  >
                    <FaEnvelope
                      className="text-xl transition-colors duration-300"
                      style={{ color: colors.primary }}
                    />
                  </div>
                  <div>
                    <h3
                      className={`font-semibold mb-1 transition-colors duration-300 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Email
                    </h3>
                    <p
                      className={`text-sm transition-colors duration-300 ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      info@starviewcinema.com
                    </p>
                    <p
                      className={`text-sm transition-colors duration-300 ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      support@starviewcinema.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                    style={{ backgroundColor: `${colors.primary}10` }}
                  >
                    <FaClock
                      className="text-xl transition-colors duration-300"
                      style={{ color: colors.primary }}
                    />
                  </div>
                  <div>
                    <h3
                      className={`font-semibold mb-1 transition-colors duration-300 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Business Hours
                    </h3>
                    <p
                      className={`text-sm transition-colors duration-300 ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Mon - Fri: 9:00 AM - 11:00 PM
                    </p>
                    <p
                      className={`text-sm transition-colors duration-300 ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Sat - Sun: 10:00 AM - 12:00 AM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div
              className={`rounded-3xl border shadow-2xl p-8 transition-colors duration-300 ${
                isDarkMode
                  ? "bg-[#111111] border-white/10"
                  : "bg-white border-gray-200"
              }`}
            >
              <h3
                className={`text-2xl font-bold mb-4 transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Follow <span style={{ color: colors.primary }}>Us</span>
              </h3>
              <p
                className={`text-sm mb-6 transition-colors duration-300 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Stay connected on social media for updates and exclusive offers
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                    isDarkMode ? "bg-gray-900" : "bg-gray-100"
                  }`}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.primary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = isDarkMode
                      ? "#111827"
                      : "#F3F4F6";
                  }}
                >
                  <FaFacebook className="text-xl" />
                </a>
                <a
                  href="#"
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                    isDarkMode ? "bg-gray-900" : "bg-gray-100"
                  }`}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.primary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = isDarkMode
                      ? "#111827"
                      : "#F3F4F6";
                  }}
                >
                  <FaTwitter className="text-xl" />
                </a>
                <a
                  href="#"
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                    isDarkMode ? "bg-gray-900" : "bg-gray-100"
                  }`}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.primary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = isDarkMode
                      ? "#111827"
                      : "#F3F4F6";
                  }}
                >
                  <FaInstagram className="text-xl" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section
        className={`py-16 border-y transition-colors duration-300 ${
          isDarkMode
            ? "bg-[#111111] border-white/10"
            : "bg-gray-100 border-gray-200"
        }`}
      >
        <div className="container mx-auto px-4 md:px-10">
          <div className="text-center mb-12">
            <h2
              className={`text-4xl font-bold mb-4 transition-colors duration-300 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Our <span style={{ color: colors.primary }}>Locations</span>
            </h2>
            <p
              className={`transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Visit us at any of our cinema locations
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {locations.map((location, index) => (
              <div
                key={index}
                className={`rounded-2xl border p-6 transition-all duration-300 ${
                  isDarkMode
                    ? "bg-gray-900/50 border-white/5 hover:border-white/20"
                    : "bg-white border-gray-200 hover:border-gray-300"
                }`}
              >
                <h3
                  className={`text-xl font-bold mb-4 transition-colors duration-300 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {location.name}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <FaMapMarkerAlt
                      className="mt-1 flex-shrink-0 transition-colors duration-300"
                      style={{ color: colors.primary }}
                    />
                    <p
                      className={`text-sm transition-colors duration-300 ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {location.address}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaPhone
                      className="flex-shrink-0 transition-colors duration-300"
                      style={{ color: colors.primary }}
                    />
                    <p
                      className={`text-sm transition-colors duration-300 ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {location.phone}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaClock
                      className="flex-shrink-0 transition-colors duration-300"
                      style={{ color: colors.primary }}
                    />
                    <p
                      className={`text-sm transition-colors duration-300 ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {location.hours}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
