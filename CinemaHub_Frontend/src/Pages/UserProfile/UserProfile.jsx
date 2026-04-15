import React, { useState } from "react";
import {
  FaCamera,
  FaTicketAlt,
  FaCog,
  FaBell,
  FaSignOutAlt,
  FaCrown,
  FaStar,
  FaCalendarAlt,
  FaTimes,
  FaFilm,
  FaMapMarkerAlt,
  FaChair,
} from "react-icons/fa";
import { HiOutlineCreditCard } from "react-icons/hi2";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";



const preferences = [
  { title: "Notifications", icon: <FaBell />, description: "Ticket alerts" },
  { title: "Payment Methods", icon: <HiOutlineCreditCard />, description: "Visa •••• 2210" },
  { title: "Account Settings", icon: <FaCog />, description: "Login & security" },
];

const UserProfile = () => {
  const { isDarkMode, colors } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isMembershipOpen, setIsMembershipOpen] = useState(false);
  const [displayUser, setDisplayUser] = useState({
    name: user?.name || "User",
    email: user?.email || "user@example.com",
  });
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [membershipData, setMembershipData] = useState({
    plan: "Gold Pass",
    renewalDate: "Mar 12, 2026",
    benefits: "Lounge + Priority",
  });
  const [bookings, setBookings] = useState([
    {
      id: "BK001",
      movie: "Shadow Operative",
      cinema: "Grand Cinema Downtown",
      date: "2025-10-15",
      time: "6:30 PM",
      seats: ["D5", "D6"],
      price: 36,
      status: "confirmed",
    },
    {
      id: "BK002",
      movie: "Eternal Love",
      cinema: "Luxury Cinema Mall",
      date: "2025-10-21",
      time: "4:15 PM",
      seats: ["VIP A2"],
      price: 18,
      status: "confirmed",
    },
    {
      id: "BK003",
      movie: "The Haunting",
      cinema: "IMAX City Center",
      date: "2025-10-28",
      time: "8:00 PM",
      seats: ["F12", "F13", "F14"],
      price: 54,
      status: "confirmed",
    },
  ]);

  const surfaceCard = isDarkMode
    ? "bg-gray-900 border border-white/10 text-white"
    : "bg-white border border-gray-100 text-gray-900";
  const subtleCard = isDarkMode ? "bg-gray-800" : "bg-gray-50";
  const mutedText = isDarkMode ? "text-gray-300" : "text-gray-500";
  const strongText = isDarkMode ? "text-white" : "text-gray-900";

  const handleCancelBooking = (bookingId) => {
    setBookings(bookings.filter(b => b.id !== bookingId));
  };

  const handleLogout = () => {
    logout();
    navigate('/home');
  };

  const handleEditProfile = () => {
    setIsEditProfileOpen(true);
  };

  const handleProfileSave = () => {
    setDisplayUser({
      name: profileData.name,
      email: profileData.email,
    });
    setIsEditProfileOpen(false);
  };

  const handleManageMembership = () => {
    setIsMembershipOpen(true);
  };

  const handleMembershipSave = () => {
    setMembershipData(membershipData);
    setIsMembershipOpen(false);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950"
          : "bg-gradient-to-b from-white via-gray-50 to-white"
      }`}
    >
      <Header />
      <section className="max-w-6xl mx-auto px-4 md:px-10 py-10 space-y-10">
        {/* Profile hero */}
        <div
          className="relative rounded-3xl overflow-hidden text-white shadow-xl"
          style={{
            background: isDarkMode
              ? "linear-gradient(to right, #3b82f6, #3b82f6, #1d4ed8)"
              : "linear-gradient(to right, #FF0800, #FF0800, #CC0600)",
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.25),_transparent)]" />
          <div className="relative p-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-5">
              
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-white/70 mb-1">Member</p>
                <h1 className="text-2xl md:text-3xl font-bold">{displayUser.name}</h1>
                <p className="text-white/80 text-sm">{displayUser.email}</p>
                <div className="flex flex-wrap gap-3 mt-4">
                  <span className="px-4 py-1 rounded-full bg-white/20 text-sm font-semibold flex items-center gap-2">
                    <FaCrown /> Gold Tier
                  </span>
                  <span className="px-4 py-1 rounded-full bg-white/20 text-sm font-semibold">
                    Points: 4,550
                  </span>
                  <span className="px-4 py-1 rounded-full bg-white/20 text-sm font-semibold">
                    Member since 2021
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <button onClick={handleEditProfile} className="px-5 py-3 rounded-xl bg-white/15 border border-white/30 font-semibold hover:bg-white/25 transition">
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className={`px-5 py-3 rounded-xl font-semibold transition flex items-center gap-2 ${
                  isDarkMode ? "bg-gray-100 hover:bg-white text-gray-900" : "bg-white hover:bg-gray-100 text-[#FF0800]"
                }`}
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Membership summary */}
          <div className={`${surfaceCard} rounded-3xl shadow-lg p-6 space-y-6`}>
            <div className="flex items-center justify-between">
              <h2 className={`text-xl font-semibold ${strongText}`}>Membership</h2>
              <FaCrown className="text-2xl" style={{ color: colors.primary }} />
            </div>
            <div
              className="p-5 rounded-2xl text-white shadow-lg"
              style={{
                background: isDarkMode
                  ? "linear-gradient(to bottom right, #3b82f6, #1d4ed8)"
                  : "linear-gradient(to bottom right, #FF0800, #CC0600)",
              }}
            >
              <p className="uppercase tracking-[0.4em] text-xs mb-1">Star View</p>
              <h3 className="text-2xl font-bold mb-4">{membershipData.plan}</h3>
              <div className="flex justify-between text-sm">
                <div>
                  <p className="text-white/70">Renewal</p>
                  <p className="font-semibold">{membershipData.renewalDate}</p>
                </div>
                <div>
                  <p className="text-white/70">Benefits</p>
                  <p className="font-semibold">{membershipData.benefits}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className={`rounded-2xl p-4 ${subtleCard}`}>
                <p className={`text-sm ${mutedText}`}>Tickets this year</p>
                <p className={`text-2xl font-bold ${strongText}`}>32</p>
              </div>
              <div className={`rounded-2xl p-4 ${subtleCard}`}>
                <p className={`text-sm ${mutedText}`}>Rewards used</p>
                <p className={`text-2xl font-bold ${strongText}`}>18</p>
              </div>
            </div>
            <button
              onClick={handleManageMembership}
              className="w-full py-3 rounded-xl border-2 font-semibold hover:text-white transition"
              style={{ borderColor: colors.primary, color: colors.primary }}
            >
              Manage Membership
            </button>
          </div>

          {/* Upcoming tickets */}
          <div className={`${surfaceCard} rounded-3xl shadow-lg p-6 space-y-5 lg:col-span-2`}>
            <div className="flex items-center justify-between">
              <h2 className={`text-xl font-semibold ${strongText} flex items-center gap-2`}>
                <FaTicketAlt style={{ color: colors.primary }} />
                My Bookings
              </h2>
              <span className="text-sm font-semibold" style={{ color: colors.primary }}>
                {bookings.length} Bookings
              </span>
            </div>
            <div className="space-y-4">
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className={`rounded-2xl p-5 flex flex-col gap-3 ${
                      isDarkMode ? "border border-white/10 bg-gray-800" : "border border-gray-100 bg-gray-50/70"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className={`text-lg font-semibold ${strongText}`}>{booking.movie}</h3>
                          <span className="text-sm font-semibold" style={{ color: colors.primary }}>{booking.time}</span>
                        </div>
                        <p className={`text-sm ${mutedText} flex items-center gap-2`}>
                          <FaMapMarkerAlt />
                          {booking.cinema}
                        </p>
                        <div className={`flex items-center gap-4 text-sm mt-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                          <span className="flex items-center gap-1">
                            <FaCalendarAlt />
                            {booking.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaChair />
                            {booking.seats.join(", ")}
                          </span>
                          <span className="flex items-center gap-1 font-bold" style={{ color: colors.primary }}>
                            ${booking.price}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        className={`px-3 py-2 rounded-xl text-white text-sm font-semibold transition flex items-center gap-2 ${
                          isDarkMode ? "bg-blue-500 hover:bg-blue-600" : "bg-red-500 hover:bg-red-600"
                        }`}
                      >
                        <FaTimes /> Cancel
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10">
                  <FaTicketAlt className="mx-auto text-4xl mb-3 opacity-30" style={{ color: colors.primary }} />
                  <p className={`text-sm ${mutedText}`}>No bookings found</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Edit Profile Modal */}
        {isEditProfileOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className={`${surfaceCard} w-full max-w-md rounded-3xl p-8 shadow-2xl`}>
              <h2 className={`text-2xl font-bold mb-6 ${strongText}`}>Edit Profile</h2>
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${strongText}`}>Name</label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className={`w-full p-3 rounded-xl border focus:outline-none focus:ring-2 ${
                      isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-200 text-gray-900"
                    }`}
                    style={{ focusRingColor: colors.primary }}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${strongText}`}>Email</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className={`w-full p-3 rounded-xl border focus:outline-none focus:ring-2 ${
                      isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-200 text-gray-900"
                    }`}
                    style={{ focusRingColor: colors.primary }}
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setIsEditProfileOpen(false)}
                  className="flex-1 py-3 rounded-xl border font-semibold transition"
                  style={{ borderColor: colors.primary, color: colors.primary }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleProfileSave}
                  className="flex-1 py-3 rounded-xl font-semibold text-white transition"
                  style={{ backgroundColor: colors.primary }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Manage Membership Modal */}
        {isMembershipOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className={`${surfaceCard} w-full max-w-md rounded-3xl p-8 shadow-2xl`}>
              <h2 className={`text-2xl font-bold mb-6 ${strongText}`}>Manage Membership</h2>
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${strongText}`}>Current Plan</label>
                  <select
                    value={membershipData.plan}
                    onChange={(e) => setMembershipData({ ...membershipData, plan: e.target.value })}
                    className={`w-full p-3 rounded-xl border focus:outline-none focus:ring-2 ${
                      isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-200 text-gray-900"
                    }`}
                    style={{ focusRingColor: colors.primary }}
                  >
                    <option value="Gold Pass">Gold Pass</option>
                    <option value="Silver Pass">Silver Pass</option>
                    <option value="Platinum Pass">Platinum Pass</option>
                    <option value="Basic">Basic</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${strongText}`}>Renewal Date</label>
                  <input
                    type="date"
                    value={membershipData.renewalDate}
                    onChange={(e) => setMembershipData({ ...membershipData, renewalDate: e.target.value })}
                    className={`w-full p-3 rounded-xl border focus:outline-none focus:ring-2 ${
                      isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-200 text-gray-900"
                    }`}
                    style={{ focusRingColor: colors.primary }}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${strongText}`}>Benefits</label>
                  <input
                    type="text"
                    value={membershipData.benefits}
                    onChange={(e) => setMembershipData({ ...membershipData, benefits: e.target.value })}
                    placeholder="e.g. Lounge + Priority"
                    className={`w-full p-3 rounded-xl border focus:outline-none focus:ring-2 ${
                      isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-200 text-gray-900"
                    }`}
                    style={{ focusRingColor: colors.primary }}
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setIsMembershipOpen(false)}
                  className="flex-1 py-3 rounded-xl border font-semibold transition"
                  style={{ borderColor: colors.primary, color: colors.primary }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleMembershipSave}
                  className="flex-1 py-3 rounded-xl font-semibold text-white transition"
                  style={{ backgroundColor: colors.primary }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default UserProfile;
