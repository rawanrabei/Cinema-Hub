import React, { useState, useEffect } from "react";
import {
  Ticket,
  CheckCircle,
  Clock,
  DollarSign,
  Search,
  Eye,
  Calendar,
  Film,
  XCircle,
  Plus,
  Edit,
  Trash2,
  MapPin,
  Users,
  X,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

const API_BASE_URL = "http://localhost:18080";

const ManagerDashboard = () => {
  const { isDarkMode } = useTheme();
  const { token } = useAuth();
  const BRAND_COLOR = isDarkMode ? "#3b82f6" : "#FF0800";
  const [activeTab, setActiveTab] = useState("bookings");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMovieId, setEditingMovieId] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(false);

  const [newMovie, setNewMovie] = useState({
    title: "",
    description: "",
    duration: "",
    rating: "",
    amount: "",
    posterUrl: "",
    director: "",
    language: "",
    status: "Active",
    genres: "",
  });

  // Fetch movies from API
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/movies`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setMovies(data);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [token]);

  useEffect(() => {
    if (editingMovieId) {
      const movie = movies.find(m => m.id === editingMovieId);
      if (movie) {
        setNewMovie({
          title: movie.title,
          description: movie.description,
          duration: movie.duration,
          rating: movie.rating,
          amount: movie.amount,
          posterUrl: movie.posterUrl,
          director: movie.director,
          language: movie.language,
          status: movie.status,
          genres: movie.genres ? movie.genres.join(', ') : '',
        });
      }
    } else {
      setNewMovie({ title: "", description: "", duration: "", rating: "", amount: "", posterUrl: "", director: "", language: "", status: "Active", genres: "" });
    }
  }, [editingMovieId, movies]);

  // Fetch all bookings from backend
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoadingBookings(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/bookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        // Transform backend response to frontend format
        const transformedBookings = data.map(booking => ({
          id: booking.bookingId,
          name: `User ${booking.userId}`, // Will need to fetch user details
          movie: `Showtime ${booking.showtimeId}`, // Will need to fetch movie details
          time: booking.bookingTime ? booking.bookingTime.split('T')[1]?.substring(0, 5) : 'N/A',
          seats: booking.seatIds ? booking.seatIds.join(', ') : 'N/A',
          price: booking.totalPrice || 0,
          status: booking.status || 'pending',
        }));
        setBookings(transformedBookings);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoadingBookings(false);
    }
  };

  const handleConfirm = async (id) => {
    // For now, just update local state
    // In a real implementation, this would call an API to confirm the booking
    setBookings((prev) =>
      prev.map((bk) => (bk.id === id ? { ...bk, status: "confirmed" } : bk)),
    );
  };

  const handleCancel = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/bookings/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        setBookings((prev) =>
          prev.map((bk) => (bk.id === id ? { ...bk, status: "cancelled" } : bk)),
        );
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
    }
  };

  const handleEditClick = (movie) => {
    setEditingMovieId(movie.id);
    setIsModalOpen(true);
  };

  const handleDeleteMovie = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/movies/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setMovies(movies.filter((m) => m.id !== id));
      }
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  const handleSubmitMovie = async (e) => {
    e.preventDefault();

    const movieData = {
      title: newMovie.title,
      description: newMovie.description,
      duration: parseInt(newMovie.duration),
      rating: parseFloat(newMovie.rating),
      amount: parseFloat(newMovie.amount),
      posterUrl: newMovie.posterUrl,
      director: newMovie.director,
      language: newMovie.language,
      status: newMovie.status,
      genres: newMovie.genres ? newMovie.genres.split(',').map(g => g.trim()) : [],
    };

    try {
      let response;
      if (editingMovieId) {
        response = await fetch(`${API_BASE_URL}/api/movies/${editingMovieId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(movieData),
        });
      } else {
        response = await fetch(`${API_BASE_URL}/api/movies`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(movieData),
        });
      }

      if (response.ok) {
        // Refresh movies list
        const fetchResponse = await fetch(`${API_BASE_URL}/api/movies`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (fetchResponse.ok) {
          const data = await fetchResponse.json();
          setMovies(data);
        }
      }
    } catch (error) {
      console.error('Error saving movie:', error);
    }

    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingMovieId(null);
    setNewMovie({ title: "", description: "", duration: "", rating: "", amount: "", posterUrl: "", director: "", language: "", status: "Active", genres: "" });
  };

  const filteredBookings = bookings.filter(
    (bk) =>
      bk.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bk.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const stats = [
    {
      title: "Today's Bookings",
      value: bookings.length,
      icon: <Ticket className="text-blue-500" />,
    },
    {
      title: "Confirmed",
      value: bookings.filter((b) => b.status === "CONFIRMED" || b.status === "confirmed").length,
      icon: <CheckCircle className="text-green-500" />,
    },
    {
      title: "Pending",
      value: bookings.filter((b) => b.status === "PENDING" || b.status === "pending").length,
      icon: <Clock className="text-orange-500" />,
    },
    {
      title: "Revenue Today",
      value: `$${bookings.filter((b) => b.status !== "CANCELLED" && b.status !== "cancelled").reduce((acc, curr) => acc + (curr.price || 0), 0)}`,
      icon: <DollarSign className="text-emerald-600" />,
    },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode
        ? "bg-gradient-to-b from-black via-[#0f0f0f] to-[#1a1a1a] text-white"
        : "bg-gradient-to-b from-white via-gray-50 to-white text-gray-900"
    }`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        {/* ── Dashboard Header ── */}
        <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: isDarkMode ? "linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)" : "linear-gradient(135deg, #FF0800 0%, #ff6b6b 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ticket size={22} color="#fff" />
            </div>
            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: "clamp(20px, 3vw, 28px)",
                  fontWeight: "700",
                  color: isDarkMode ? "#fff" : "#111",
                }}
              >
                Manager <span style={{ color: isDarkMode ? "#3b82f6" : "#FF0800" }}>Dashboard</span>
              </h1>
              <p style={{ margin: 0, fontSize: "13px", color: isDarkMode ? "#888" : "#888" }}>
                Manage bookings and showtimes
              </p>
            </div>
          </div>
          <span
            style={{
              backgroundColor: isDarkMode ? "#3b82f6" : "#FF0800",
              color: "#fff",
              fontSize: "12px",
              fontWeight: "700",
              padding: "8px 20px",
              borderRadius: "99px",
              boxShadow: isDarkMode ? "0 2px 8px rgba(59, 130, 246, 0.3)" : "0 2px 8px rgba(255, 8, 0, 0.3)",
            }}
          >
            Manager
          </span>
        </div>

        {/* ── Stats Grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`backdrop-blur-md rounded-2xl p-5 border shadow-sm hover:shadow-md transition-shadow ${
                isDarkMode
                  ? "bg-white/10 border-white/10 text-white"
                  : "bg-white/70 border-gray-100 text-gray-900"
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="text-2xl">{stat.icon}</div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  isDarkMode ? "bg-blue-900/30 text-blue-400" : "bg-red-50 text-red-600"
                }`}>
                  {index === 0 ? "+12%" : index === 1 ? "+8%" : index === 2 ? "+5%" : "+15%"}
                </span>
              </div>
              <p className={`text-xs mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{stat.title}</p>
              <p className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        <div className={`backdrop-blur-md p-1.5 rounded-2xl flex mb-6 border shadow-sm ${
          isDarkMode
            ? "bg-white/10 border-white/10"
            : "bg-white/50 border-gray-100"
        }`}>
          {["bookings", "movies", "schedule"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-300 ${
                activeTab === tab
                  ? isDarkMode
                    ? "bg-white/20 text-white border-white/10"
                    : "bg-white shadow-sm text-gray-900 border border-gray-100"
                  : isDarkMode
                    ? "text-gray-400 hover:text-gray-200"
                    : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab === "bookings"
                ? "Manage Bookings"
                : tab === "movies"
                  ? "Movies & Schedule"
                  : "Showtimes"}
            </button>
          ))}
        </div>

        {/* TAB 1: BOOKINGS */}
        {activeTab === "bookings" && (
          <div className="animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h2 className={`text-xl font-bold flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  <Calendar size={22} style={{ color: BRAND_COLOR }} /> Booking
                  Control
                </h2>
                <p className={`text-xs mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-400"}`}>
                  Showing {filteredBookings.length} results
                </p>
              </div>

              {/* Search Input (Now Functional) */}
              <div className="relative w-full md:w-72">
                <Search
                  className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? "text-gray-400" : "text-gray-400"}`}
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search name or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-xl focus:outline-none focus:ring-2 transition-all shadow-inner ${
                    isDarkMode
                      ? "bg-white/10 border-white/10 text-white placeholder-gray-400 focus:ring-red-500/50"
                      : "bg-gray-50 border-gray-100 text-gray-900 placeholder-gray-400 focus:ring-red-500/50"
                  }`}
                  style={{ focusRingColor: BRAND_COLOR }}
                />
              </div>
            </div>

            <div className="space-y-4">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((bk) => (
                  <div
                    key={bk.id}
                    className={`group border rounded-2xl p-4 flex flex-wrap md:flex-nowrap items-center gap-4 transition-all duration-300 ${
                      isDarkMode
                        ? "border-white/10 bg-white/5 hover:bg-white/10"
                        : "border-gray-50 bg-gray-50/30 hover:bg-white hover:shadow-md"
                    }`}
                  >
                    <div className="flex flex-col min-w-[100px]">
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-md mb-1"
                        style={{ 
                          backgroundColor: isDarkMode ? "rgba(59, 130, 246, 0.2)" : "rgba(255, 8, 0, 0.2)",
                          color: BRAND_COLOR 
                        }}
                      >
                        {bk.id}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-md font-bold uppercase w-fit ${
                          bk.status === "confirmed"
                            ? isDarkMode
                              ? "bg-green-900/30 text-green-400"
                              : "bg-green-100 text-green-600"
                            : bk.status === "cancelled"
                              ? isDarkMode
                                ? "bg-blue-900/30 text-blue-400"
                                : "bg-red-100 text-red-600"
                              : isDarkMode
                                ? "bg-orange-900/30 text-orange-400"
                                : "bg-orange-100 text-orange-600"
                        }`}
                      >
                        {bk.status}
                      </span>
                    </div>

                    <div className="flex-1">
                      <p className={`font-black ${isDarkMode ? "text-white" : "text-gray-800"}`}>{bk.name}</p>
                      <div className={`flex flex-wrap gap-x-4 mt-1 text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                        <span className="flex items-center gap-1">
                          <Film size={12} /> {bk.movie}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {bk.time}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto justify-between border-t md:border-none pt-3 md:pt-0">
                      <span
                        className="font-black text-xl"
                        style={{ color: BRAND_COLOR }}
                      >
                        ${bk.price}
                      </span>
                      <div className="flex gap-2">
                        {bk.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleConfirm(bk.id)}
                              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => handleCancel(bk.id)}
                              className={`${isDarkMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-red-500 hover:bg-red-600'} text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95`}
                            >
                              Cancel
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className={`text-center py-20 rounded-3xl border border-dashed ${
                  isDarkMode
                    ? "bg-white/5 border-white/10"
                    : "bg-gray-50 border-gray-200"
                }`}>
                  <p className={`font-medium ${isDarkMode ? "text-gray-400" : "text-gray-400"}`}>
                    No bookings found matching "{searchTerm}"
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: MOVIES & SCHEDULE */}
        {activeTab === "movies" && (
          <div className="animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h2 className={`text-xl font-bold flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  <Film size={22} style={{ color: BRAND_COLOR }} /> Movies &
                  Schedule
                </h2>
                <p className={`text-xs mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-400"}`}>
                  Manage Movies, Halls, and Showtimes
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingMovieId(null);
                  setIsModalOpen(true);
                }}
                className="flex items-center gap-2 text-white px-6 py-3 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg"
                style={{ backgroundColor: BRAND_COLOR }}
              >
                <Plus size={20} /> Add New Movie
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  className={`border rounded-3xl p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden group ${
                    isDarkMode
                      ? "bg-white/10 border-white/10"
                      : "bg-white border-gray-100"
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div
                      className={`p-3 rounded-2xl ${
                        isDarkMode
                          ? "bg-red-900/30"
                          : "bg-red-50"
                      }`}
                      style={{ color: BRAND_COLOR }}
                    >
                      <Film size={24} />
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEditClick(movie)}
                        className={`p-2 rounded-xl transition-colors ${
                          isDarkMode
                            ? "hover:bg-blue-900/30 text-blue-400"
                            : "hover:bg-blue-50 text-blue-500"
                        }`}
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteMovie(movie.id)}
                        className={`p-2 rounded-xl transition-colors ${
                          isDarkMode
                            ? "hover:bg-red-900/30 text-red-400"
                            : "hover:bg-red-50 text-red-500"
                        }`}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  <h3 className={`text-xl font-black mb-4 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                    {movie.title}
                  </h3>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className={`flex items-center gap-2 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                      <Film size={16} /> {movie.duration}min
                    </div>
                    <div className={`flex items-center gap-2 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                      <DollarSign size={16} /> ${movie.amount}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? "text-gray-400" : "text-gray-400"}`}>
                      Rating: {movie.rating}
                    </p>
                    <p className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? "text-gray-400" : "text-gray-400"}`}>
                      Genres: {movie.genres ? movie.genres.join(', ') : 'N/A'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SCHEDULE */}
        {activeTab === "schedule" && (
          <div className="animate-in slide-in-from-bottom duration-500">
            <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
              <Film size={22} style={{ color: BRAND_COLOR }} /> Movie Schedule
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[
                {
                  title: "Shadow Operative",
                  times: ["10:30 AM", "2:00 PM", "6:30 PM"],
                  occupancy: [75, 60, 85],
                },
                {
                  title: "Eternal Love",
                  times: ["11:00 AM", "3:00 PM", "7:00 PM"],
                  occupancy: [90, 80, 95],
                },
              ].map((movie, idx) => (
                <div
                  key={idx}
                  className={`border rounded-3xl p-6 ${
                    isDarkMode
                      ? "bg-white/10 border-white/10"
                      : "bg-gray-50/50 border-gray-100"
                  }`}
                >
                  <h3 className={`font-black mb-4 ${isDarkMode ? "text-white" : "text-gray-700"}`}>
                    {movie.title}
                  </h3>
                  <div className="space-y-3">
                    {movie.times.map((t, i) => (
                      <div
                        key={i}
                        className={`p-4 rounded-2xl flex justify-between items-center shadow-sm ${
                          isDarkMode ? "bg-white/10" : "bg-white"
                        }`}
                      >
                        <div>
                          <p className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>{t}</p>
                          <div className={`w-32 h-1.5 rounded-full mt-2 overflow-hidden ${
                            isDarkMode ? "bg-white/20" : "bg-gray-100"
                          }`}>
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${movie.occupancy[i]}%`,
                                backgroundColor: BRAND_COLOR,
                              }}
                            ></div>
                          </div>
                        </div>
                        <span
                          className="font-black text-xs"
                          style={{ color: BRAND_COLOR }}
                        >
                          {movie.occupancy[i]}% FULL
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Movie Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className={`w-full max-w-2xl rounded-[32px] p-8 animate-in zoom-in duration-200 max-h-[90vh] overflow-y-auto ${
            isDarkMode ? "bg-[#1e1e1e]" : "bg-white"
          }`}>
            <div className="flex justify-between items-center mb-8">
              <h2 className={`text-2xl font-black ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                {editingMovieId ? "Edit Movie Details" : "New Movie Entry"}
              </h2>
              <button
                onClick={closeModal}
                className={`p-2 rounded-full transition-colors ${
                  isDarkMode ? "hover:bg-white/10" : "hover:bg-gray-100"
                }`}
              >
                <X size={24} className={isDarkMode ? "text-white" : "text-gray-800"} />
              </button>
            </div>

            <form onSubmit={handleSubmitMovie} className="space-y-6">
              <div>
                <label className={`block text-sm font-bold uppercase mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-400"}`}>
                  Movie Title *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Inception"
                  className={`w-full p-4 border-2 rounded-2xl focus:outline-none transition-colors ${
                    isDarkMode
                      ? "bg-white/10 border-white/10 text-white placeholder-gray-400 focus:border-blue-500"
                      : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-red-500"
                  }`}
                  value={newMovie.title}
                  onChange={(e) =>
                    setNewMovie({ ...newMovie, title: e.target.value })
                  }
                />
              </div>

              <div>
                <label className={`block text-sm font-bold uppercase mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-400"}`}>
                  Description *
                </label>
                <textarea
                  required
                  rows="3"
                  placeholder="Movie description"
                  className={`w-full p-4 border-2 rounded-2xl focus:outline-none transition-colors resize-y ${
                    isDarkMode
                      ? "bg-white/10 border-white/10 text-white placeholder-gray-400 focus:border-blue-500"
                      : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-red-500"
                  }`}
                  value={newMovie.description}
                  onChange={(e) =>
                    setNewMovie({ ...newMovie, description: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className={`block text-sm font-bold uppercase mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-400"}`}>
                    Duration (min) *
                  </label>
                  <input
                    required
                    type="number"
                    placeholder="120"
                    className={`w-full p-4 border-2 rounded-2xl focus:outline-none transition-colors ${
                      isDarkMode
                        ? "bg-white/10 border-white/10 text-white placeholder-gray-400 focus:border-blue-500"
                        : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-red-500"
                    }`}
                    value={newMovie.duration}
                    onChange={(e) =>
                      setNewMovie({ ...newMovie, duration: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className={`block text-sm font-bold uppercase mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-400"}`}>
                    Rating *
                  </label>
                  <input
                    required
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    placeholder="8.5"
                    className={`w-full p-4 border-2 rounded-2xl focus:outline-none transition-colors ${
                      isDarkMode
                        ? "bg-white/10 border-white/10 text-white placeholder-gray-400 focus:border-blue-500"
                        : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-red-500"
                    }`}
                    value={newMovie.rating}
                    onChange={(e) =>
                      setNewMovie({ ...newMovie, rating: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className={`block text-sm font-bold uppercase mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-400"}`}>
                    Price ($) *
                  </label>
                  <input
                    required
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="15.00"
                    className={`w-full p-4 border-2 rounded-2xl focus:outline-none transition-colors ${
                      isDarkMode
                        ? "bg-white/10 border-white/10 text-white placeholder-gray-400 focus:border-blue-500"
                        : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-red-500"
                    }`}
                    value={newMovie.amount}
                    onChange={(e) =>
                      setNewMovie({ ...newMovie, amount: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className={`block text-sm font-bold uppercase mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-400"}`}>
                    Status
                  </label>
                  <select
                    value={newMovie.status}
                    onChange={(e) => setNewMovie({ ...newMovie, status: e.target.value })}
                    className={`w-full p-4 border-2 rounded-2xl focus:outline-none transition-colors cursor-pointer ${
                      isDarkMode
                        ? "bg-white/10 border-white/10 text-white focus:border-blue-500"
                        : "bg-gray-50 border-gray-200 text-gray-900 focus:border-red-500"
                    }`}
                  >
                    <option value="Active">Active</option>
                    <option value="InActive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={`block text-sm font-bold uppercase mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-400"}`}>
                  Poster URL
                </label>
                <input
                  placeholder="https://example.com/poster.jpg"
                  className={`w-full p-4 border-2 rounded-2xl focus:outline-none transition-colors ${
                    isDarkMode
                      ? "bg-white/10 border-white/10 text-white placeholder-gray-400 focus:border-blue-500"
                      : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-red-500"
                  }`}
                  value={newMovie.posterUrl}
                  onChange={(e) =>
                    setNewMovie({ ...newMovie, posterUrl: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className={`block text-sm font-bold uppercase mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-400"}`}>
                    Director
                  </label>
                  <input
                    placeholder="Christopher Nolan"
                    className={`w-full p-4 border-2 rounded-2xl focus:outline-none transition-colors ${
                      isDarkMode
                        ? "bg-white/10 border-white/10 text-white placeholder-gray-400 focus:border-blue-500"
                        : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-red-500"
                    }`}
                    value={newMovie.director}
                    onChange={(e) =>
                      setNewMovie({ ...newMovie, director: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className={`block text-sm font-bold uppercase mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-400"}`}>
                    Language
                  </label>
                  <input
                    placeholder="English"
                    className={`w-full p-4 border-2 rounded-2xl focus:outline-none transition-colors ${
                      isDarkMode
                        ? "bg-white/10 border-white/10 text-white placeholder-gray-400 focus:border-blue-500"
                        : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-red-500"
                    }`}
                    value={newMovie.language}
                    onChange={(e) =>
                      setNewMovie({ ...newMovie, language: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-bold uppercase mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-400"}`}>
                  Genres (comma separated)
                </label>
                <input
                  placeholder="Action, Drama, Thriller"
                  className={`w-full p-4 border-2 rounded-2xl focus:outline-none transition-colors ${
                    isDarkMode
                      ? "bg-white/10 border-white/10 text-white placeholder-gray-400 focus:border-blue-500"
                      : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-red-500"
                  }`}
                  value={newMovie.genres}
                  onChange={(e) =>
                    setNewMovie({ ...newMovie, genres: e.target.value })
                  }
                />
              </div>

              <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-white/10">
                <button
                  type="button"
                  onClick={closeModal}
                  className={`flex-1 py-4 rounded-2xl font-bold border-2 transition-all ${
                    isDarkMode
                      ? "border-white/10 text-white hover:bg-white/10"
                      : "border-gray-200 text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-4 rounded-2xl font-black text-white shadow-lg transition-all hover:opacity-90 active:scale-95"
                  style={{ backgroundColor: BRAND_COLOR }}
                >
                  {editingMovieId ? "Update Movie" : "Launch Movie"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerDashboard;
