import React, { useState, useEffect } from 'react';
import {
  DollarSign, Ticket, Film, Users,
  Search, Plus, Eye, Pencil, Trash2,
  TrendingUp, CalendarDays, Clapperboard, Menu, X
} from 'lucide-react';
const CloseIcon = X;
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

// ── Data ───────────────────────────────────────────────
const getStats = (isDarkMode, bookings, movies, users) => {
  // Calculate real stats from backend data
  const totalRevenue = bookings.reduce((sum, b) => {
    const price = parseFloat(b.amount?.replace('$', '') || b.totalPrice || 0);
    return sum + price;
  }, 0);
  
  const totalBookings = bookings.length;
  const activeMovies = movies.filter(m => m.status === 'APPROVED').length;
  const totalCustomers = users.filter(u => u.role === 'USER' || u.role === 'user').length;
  
  // Today's bookings
  const today = new Date().toISOString().split('T')[0];
  const todayBookings = bookings.filter(b => b.date === today).length;
  
  // Confirmed bookings
  const confirmedBookings = bookings.filter(b => b.status === 'CONFIRMED').length;
  
  // Pending bookings
  const pendingBookings = bookings.filter(b => b.status === 'PENDING').length;
  
  // Revenue today
  const revenueToday = bookings
    .filter(b => b.date === today)
    .reduce((sum, b) => {
      const price = parseFloat(b.amount?.replace('$', '') || b.totalPrice || 0);
      return sum + price;
    }, 0);

  return [
    { iconEl: <DollarSign size={22} color="#22c55e" />, label: 'Total Revenue',   value: `$${totalRevenue.toLocaleString()}`, badge: '+12%', badgeColor: '#dcfce7', badgeText: '#16a34a' },
    { iconEl: <Ticket     size={22} color={isDarkMode ? '#3b82f6' : '#FF0800'} />, label: 'Total Bookings',  value: totalBookings.toLocaleString(),    badge: '+8%',  badgeColor: isDarkMode ? '#dbeafe' : '#ffe0de', badgeText: isDarkMode ? '#1d4ed8' : '#FF0800' },
    { iconEl: <Film       size={22} color={isDarkMode ? '#3b82f6' : '#FF0800'} />, label: 'Active Movies',   value: activeMovies,       badge: '+3',     badgeColor: isDarkMode ? '#dbeafe' : '#ffe0de', badgeText: isDarkMode ? '#1d4ed8' : '#FF0800' },
    { iconEl: <Users      size={22} color="#a855f7" />, label: 'Total Customers', value: totalCustomers,    badge: '+12%', badgeColor: '#f3e8ff', badgeText: '#7e22ce' },
    { iconEl: <CalendarDays size={22} color="#f59e0b" />, label: "Today's Bookings", value: todayBookings, badge: '+8%', badgeColor: '#fef3c7', badgeText: '#d97706' },
    { iconEl: <TrendingUp size={22} color="#22c55e" />, label: 'Confirmed', value: confirmedBookings, badge: '+5%', badgeColor: '#dcfce7', badgeText: '#16a34a' },
    { iconEl: <Ticket size={22} color="#f59e0b" />, label: 'Pending', value: pendingBookings, badge: '+15%', badgeColor: '#fef3c7', badgeText: '#d97706' },
    { iconEl: <DollarSign size={22} color="#22c55e" />, label: "Revenue Today", value: `$${revenueToday.toLocaleString()}`, badge: '+15%', badgeColor: '#dcfce7', badgeText: '#16a34a' },
  ];
};

const API_BASE_URL = 'http://localhost:8080';

const users = [];

const initialMovies = [];

const revenueData = [
  { month: 'Jul', value: 60 }, { month: 'Aug', value: 75 },
  { month: 'Sep', value: 55 }, { month: 'Oct', value: 90 },
  { month: 'Nov', value: 70 }, { month: 'Dec', value: 85 },
];

// ── Helpers ────────────────────────────────────────────
const card = (darkMode) => ({
  backgroundColor: darkMode ? '#1e1e1e' : '#fff',
  border: `1px solid ${darkMode ? '#333' : '#f0e0e0'}`,
  borderRadius: '16px', padding: '20px',
});

const roleBadge = (role, darkMode) => ({
  customer: { bg: darkMode ? '#dbeafe' : '#ffe0de', color: darkMode ? '#1d4ed8' : '#FF0800' },
  employee: { bg: darkMode ? '#dbeafe' : '#ffe0de', color: darkMode ? '#1d4ed8' : '#FF0800' },
  admin:    { bg: darkMode ? '#f3e8ff' : '#dc2626', color: darkMode ? '#7e22ce' : '#fff' },
}[role] || { bg: darkMode ? '#dbeafe' : '#ffe0de', color: darkMode ? '#1d4ed8' : '#FF0800' });

const SearchBar = ({ value, onChange, placeholder, darkMode }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', backgroundColor: darkMode ? '#2a2a2a' : '#fdf6ed', borderRadius: '8px', padding: '8px 12px' }}>
    <Search size={14} color="#aaa" />
    <input value={value} onChange={onChange} placeholder={placeholder}
      style={{ border: 'none', background: 'none', outline: 'none', fontSize: '13px', color: darkMode ? '#fff' : '#111', width: '100%' }} />
  </div>
);

// ── Tabs ───────────────────────────────────────────────
const OverviewTab = ({ darkMode, bookings }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
    <div style={card(darkMode)}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
        <TrendingUp size={16} color={darkMode ? '#3b82f6' : '#FF0800'} />
        <span style={{ fontWeight: '700', fontSize: '15px', color: darkMode ? '#fff' : '#111' }}>Revenue Overview</span>
      </div>
      <p style={{ fontSize: '12px', color: '#aaa', margin: '0 0 20px' }}>Monthly revenue statistics</p>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '120px' }}>
        {revenueData.map((d, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', height: '100%', justifyContent: 'flex-end' }}>
            <div style={{ width: '100%', borderRadius: '4px 4px 0 0', height: `${d.value}%`, background: darkMode ? 'linear-gradient(to top, #3b82f6, #60a5fa)' : 'linear-gradient(to top, #FF0800, #ff6b6b)' }} />
            <span style={{ fontSize: '10px', color: '#aaa' }}>{d.month}</span>
          </div>
        ))}
      </div>
    </div>

    <div style={card(darkMode)}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
        <CalendarDays size={16} color={darkMode ? '#3b82f6' : '#FF0800'} />
        <span style={{ fontWeight: '700', fontSize: '15px', color: darkMode ? '#fff' : '#111' }}>Recent Bookings</span>
      </div>
      <p style={{ fontSize: '12px', color: '#aaa', margin: '0 0 12px' }}>Latest booking activity</p>
      {bookings && bookings.length > 0 ? (
        bookings.slice(0, 3).map((b, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < Math.min(bookings.length, 3) - 1 ? `1px solid ${darkMode ? '#333' : '#f5e8e8'}` : 'none' }}>
            <div>
              <p style={{ margin: 0, fontWeight: '600', fontSize: '13px', color: darkMode ? '#fff' : '#111' }}>{b.customer}</p>
              <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#aaa' }}>{b.movie}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: darkMode ? '#3b82f6' : '#FF0800', fontWeight: '700', fontSize: '13px' }}>{b.amount}</span>
              <span style={{ fontSize: '10px', fontWeight: '600', padding: '2px 8px', borderRadius: '99px', backgroundColor: b.status === 'confirmed' ? (darkMode ? '#3b82f6' : '#FF0800') : '#f5f5f5', color: b.status === 'confirmed' ? '#fff' : '#888' }}>{b.status}</span>
            </div>
          </div>
        ))
      ) : (
        <p style={{ fontSize: '12px', color: '#aaa', textAlign: 'center', padding: '20px 0' }}>No recent bookings</p>
      )}
    </div>
  </div>
);

const MoviesTab = ({ darkMode, movies, onEditMovie, onDeleteMovie, onViewMovie, onApproveMovie, onRejectMovie }) => {
  const [search, setSearch] = useState('');
  const filtered = movies.filter(m => m.title.toLowerCase().includes(search.toLowerCase()));
  return (
    <div style={card(darkMode)}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Film size={16} color={darkMode ? '#3b82f6' : '#FF0800'} />
            <span style={{ fontWeight: '700', fontSize: '15px', color: darkMode ? '#fff' : '#111' }}>Movies Management</span>
          </div>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#aaa' }}>Manage all movies in the system</p>
        </div>
      </div>
      <SearchBar value={search} onChange={e => setSearch(e.target.value)} placeholder="Search movies..." darkMode={darkMode} />
      {filtered.map((m) => (
        <div key={m.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', borderRadius: '10px', marginBottom: '8px', border: `1px solid ${darkMode ? '#333' : '#f0e0e0'}`, flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <p style={{ margin: 0, fontWeight: '600', fontSize: '14px', color: darkMode ? '#fff' : '#111' }}>{m.title}</p>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#aaa' }}>Duration: {m.duration}min &nbsp; Rating: {m.rating} &nbsp; Price: ${m.amount}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '11px', fontWeight: '600', padding: '3px 10px', borderRadius: '99px', backgroundColor: m.status === 'APPROVED' ? '#dcfce7' : m.status === 'PENDING' ? '#fef3c7' : '#fee2e2', color: m.status === 'APPROVED' ? '#16a34a' : m.status === 'PENDING' ? '#d97706' : '#dc2626' }}>{m.status}</span>
            {m.status === 'PENDING' && (
              <>
                <button onClick={() => onApproveMovie(m.id)} style={{ padding: '4px 10px', borderRadius: '6px', border: 'none', backgroundColor: '#22c55e', color: '#fff', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }}>Accept</button>
                <button onClick={() => onRejectMovie(m.id)} style={{ padding: '4px 10px', borderRadius: '6px', border: 'none', backgroundColor: '#ef4444', color: '#fff', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }}>Reject</button>
              </>
            )}
            <Eye size={15} color="#aaa" style={{ cursor: 'pointer' }} onClick={() => onViewMovie(m)} />
            <Pencil size={15} color="#aaa" style={{ cursor: 'pointer' }} onClick={() => onEditMovie(m)} />
            <Trash2 size={15} color="#aaa" style={{ cursor: 'pointer' }} onClick={() => onDeleteMovie(m.id)} />
          </div>
        </div>
      ))}
    </div>
  );
};

const UsersTab = ({ darkMode, users, onEditUser, onDeleteUser, currentUser }) => {
  const [search, setSearch] = useState('');
  const filtered = users
    .filter(u => u.id !== currentUser?.id && u.email !== currentUser?.email)
    .filter(u => u.name?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase()));
  return (
    <div style={card(darkMode)}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={16} color={darkMode ? '#3b82f6' : '#FF0800'} />
            <span style={{ fontWeight: '700', fontSize: '15px', color: darkMode ? '#fff' : '#111' }}>Users Management</span>
          </div>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#aaa' }}>View all users and their roles</p>
        </div>
      </div>
      <SearchBar value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..." darkMode={darkMode} />
      {filtered.map((u, i) => (
        <div key={u.id || i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', borderRadius: '10px', marginBottom: '8px', border: `1px solid ${darkMode ? '#333' : '#f0e0e0'}`, flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <p style={{ margin: 0, fontWeight: '600', fontSize: '14px', color: darkMode ? '#fff' : '#111' }}>{u.username || u.name || 'N/A'}</p>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#aaa' }}>{u.email}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '11px', fontWeight: '600', padding: '3px 10px', borderRadius: '99px', backgroundColor: roleBadge(u.role?.toLowerCase() || 'customer', darkMode).bg, color: roleBadge(u.role?.toLowerCase() || 'customer', darkMode).color }}>{u.role || 'USER'}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

const BookingsTab = ({ darkMode, bookings, onDeleteBooking }) => {
  const [search, setSearch] = useState('');
  const filtered = bookings.filter(b => b.movie?.toLowerCase().includes(search.toLowerCase()) || b.customer?.toLowerCase().includes(search.toLowerCase()));
  return (
    <div style={card(darkMode)}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Ticket size={16} color={darkMode ? '#3b82f6' : '#FF0800'} />
            <span style={{ fontWeight: '700', fontSize: '15px', color: darkMode ? '#fff' : '#111' }}>All Bookings</span>
          </div>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#aaa' }}>View all bookings in the system</p>
        </div>
      </div>
      <SearchBar value={search} onChange={e => setSearch(e.target.value)} placeholder="Search bookings..." darkMode={darkMode} />
      {filtered.map((b, i) => (
        <div key={b.bookingId || i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', borderRadius: '10px', marginBottom: '8px', border: `1px solid ${darkMode ? '#333' : '#f0e0e0'}`, flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <p style={{ margin: 0, fontWeight: '600', fontSize: '14px', color: darkMode ? '#fff' : '#111' }}>{b.movie}</p>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#aaa' }}>Customer: {b.customer} &nbsp; Date: {b.date}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: darkMode ? '#22c55e' : '#16a34a', fontWeight: '700', fontSize: '14px' }}>{b.amount}</span>
            <span style={{ fontSize: '10px', fontWeight: '600', padding: '2px 8px', borderRadius: '99px', backgroundColor: b.status === 'CONFIRMED' ? (darkMode ? '#3b82f6' : '#FF0800') : '#f5f5f5', color: b.status === 'CONFIRMED' ? '#fff' : '#888' }}>{b.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

// ── Movie Modal ───────────────────────────────────────────
const MovieModal = ({ darkMode, isOpen, onClose, onSubmit, movie, isEdit }) => {
  const [formData, setFormData] = useState({
    title: movie?.title || '',
    description: movie?.description || '',
    duration: movie?.duration || '',
    rating: movie?.rating || '',
    amount: movie?.amount || '',
    posterUrl: movie?.posterUrl || '',
    director: movie?.director || '',
    language: movie?.language || '',
    status: movie?.status || 'Active',
    genres: movie?.genres ? movie.genres.join(', ') : '',
  });

  useEffect(() => {
    if (movie) {
      setFormData({
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
    } else {
      setFormData({
        title: '',
        description: '',
        duration: '',
        rating: '',
        amount: '',
        posterUrl: '',
        director: '',
        language: '',
        status: 'Active',
        genres: '',
      });
    }
  }, [movie]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
      <div style={{ backgroundColor: darkMode ? '#1e1e1e' : '#fff', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', border: `1px solid ${darkMode ? '#333' : '#f0e0e0'}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: darkMode ? '#fff' : '#111' }}>
            {isEdit ? 'Edit Movie' : 'Add New Movie'}
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', borderRadius: '8px', transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = darkMode ? '#333' : '#f0f0f0'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
            <CloseIcon size={24} color={darkMode ? '#fff' : '#111'} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: darkMode ? '#fff' : '#111', marginBottom: '8px' }}>Movie Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              placeholder="e.g. Inception"
              style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: `2px solid ${darkMode ? '#333' : '#e0e0e0'}`, backgroundColor: darkMode ? '#2a2a2a' : '#fff', color: darkMode ? '#fff' : '#111', fontSize: '14px', outline: 'none', transition: 'border-color 0.2s' }}
              onFocus={(e) => e.currentTarget.style.borderColor = darkMode ? '#3b82f6' : '#FF0800'}
              onBlur={(e) => e.currentTarget.style.borderColor = darkMode ? '#333' : '#e0e0e0'}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: darkMode ? '#fff' : '#111', marginBottom: '8px' }}>Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows="3"
              placeholder="Brief movie description"
              style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: `2px solid ${darkMode ? '#333' : '#e0e0e0'}`, backgroundColor: darkMode ? '#2a2a2a' : '#fff', color: darkMode ? '#fff' : '#111', fontSize: '14px', outline: 'none', resize: 'vertical', transition: 'border-color 0.2s' }}
              onFocus={(e) => e.currentTarget.style.borderColor = darkMode ? '#3b82f6' : '#FF0800'}
              onBlur={(e) => e.currentTarget.style.borderColor = darkMode ? '#333' : '#e0e0e0'}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: darkMode ? '#fff' : '#111', marginBottom: '8px' }}>Duration (min) *</label>
              <input
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                required
                placeholder="120"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: `2px solid ${darkMode ? '#333' : '#e0e0e0'}`, backgroundColor: darkMode ? '#2a2a2a' : '#fff', color: darkMode ? '#fff' : '#111', fontSize: '14px', outline: 'none', transition: 'border-color 0.2s' }}
                onFocus={(e) => e.currentTarget.style.borderColor = darkMode ? '#3b82f6' : '#FF0800'}
                onBlur={(e) => e.currentTarget.style.borderColor = darkMode ? '#333' : '#e0e0e0'}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: darkMode ? '#fff' : '#111', marginBottom: '8px' }}>Rating *</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                required
                placeholder="8.5"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: `2px solid ${darkMode ? '#333' : '#e0e0e0'}`, backgroundColor: darkMode ? '#2a2a2a' : '#fff', color: darkMode ? '#fff' : '#111', fontSize: '14px', outline: 'none', transition: 'border-color 0.2s' }}
                onFocus={(e) => e.currentTarget.style.borderColor = darkMode ? '#3b82f6' : '#FF0800'}
                onBlur={(e) => e.currentTarget.style.borderColor = darkMode ? '#333' : '#e0e0e0'}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: darkMode ? '#fff' : '#111', marginBottom: '8px' }}>Price ($) *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                required
                placeholder="15.00"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: `2px solid ${darkMode ? '#333' : '#e0e0e0'}`, backgroundColor: darkMode ? '#2a2a2a' : '#fff', color: darkMode ? '#fff' : '#111', fontSize: '14px', outline: 'none', transition: 'border-color 0.2s' }}
                onFocus={(e) => e.currentTarget.style.borderColor = darkMode ? '#3b82f6' : '#FF0800'}
                onBlur={(e) => e.currentTarget.style.borderColor = darkMode ? '#333' : '#e0e0e0'}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: darkMode ? '#fff' : '#111', marginBottom: '8px' }}>Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: `2px solid ${darkMode ? '#333' : '#e0e0e0'}`, backgroundColor: darkMode ? '#2a2a2a' : '#fff', color: darkMode ? '#fff' : '#111', fontSize: '14px', outline: 'none', transition: 'border-color 0.2s', cursor: 'pointer' }}
                onFocus={(e) => e.currentTarget.style.borderColor = darkMode ? '#3b82f6' : '#FF0800'}
                onBlur={(e) => e.currentTarget.style.borderColor = darkMode ? '#333' : '#e0e0e0'}
              >
                <option value="Active">Active</option>
                <option value="InActive">Inactive</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: darkMode ? '#fff' : '#111', marginBottom: '8px' }}>Poster URL</label>
            <input
              type="text"
              value={formData.posterUrl}
              onChange={(e) => setFormData({ ...formData, posterUrl: e.target.value })}
              placeholder="https://example.com/poster.jpg"
              style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: `2px solid ${darkMode ? '#333' : '#e0e0e0'}`, backgroundColor: darkMode ? '#2a2a2a' : '#fff', color: darkMode ? '#fff' : '#111', fontSize: '14px', outline: 'none', transition: 'border-color 0.2s' }}
              onFocus={(e) => e.currentTarget.style.borderColor = darkMode ? '#3b82f6' : '#FF0800'}
              onBlur={(e) => e.currentTarget.style.borderColor = darkMode ? '#333' : '#e0e0e0'}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: darkMode ? '#fff' : '#111', marginBottom: '8px' }}>Director</label>
              <input
                type="text"
                value={formData.director}
                onChange={(e) => setFormData({ ...formData, director: e.target.value })}
                placeholder="Christopher Nolan"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: `2px solid ${darkMode ? '#333' : '#e0e0e0'}`, backgroundColor: darkMode ? '#2a2a2a' : '#fff', color: darkMode ? '#fff' : '#111', fontSize: '14px', outline: 'none', transition: 'border-color 0.2s' }}
                onFocus={(e) => e.currentTarget.style.borderColor = darkMode ? '#3b82f6' : '#FF0800'}
                onBlur={(e) => e.currentTarget.style.borderColor = darkMode ? '#333' : '#e0e0e0'}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: darkMode ? '#fff' : '#111', marginBottom: '8px' }}>Language</label>
              <input
                type="text"
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                placeholder="English"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: `2px solid ${darkMode ? '#333' : '#e0e0e0'}`, backgroundColor: darkMode ? '#2a2a2a' : '#fff', color: darkMode ? '#fff' : '#111', fontSize: '14px', outline: 'none', transition: 'border-color 0.2s' }}
                onFocus={(e) => e.currentTarget.style.borderColor = darkMode ? '#3b82f6' : '#FF0800'}
                onBlur={(e) => e.currentTarget.style.borderColor = darkMode ? '#333' : '#e0e0e0'}
              />
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: darkMode ? '#fff' : '#111', marginBottom: '8px' }}>Genres (comma separated)</label>
            <input
              type="text"
              value={formData.genres}
              onChange={(e) => setFormData({ ...formData, genres: e.target.value })}
              placeholder="Action, Drama, Thriller"
              style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: `2px solid ${darkMode ? '#333' : '#e0e0e0'}`, backgroundColor: darkMode ? '#2a2a2a' : '#fff', color: darkMode ? '#fff' : '#111', fontSize: '14px', outline: 'none', transition: 'border-color 0.2s' }}
              onFocus={(e) => e.currentTarget.style.borderColor = darkMode ? '#3b82f6' : '#FF0800'}
              onBlur={(e) => e.currentTarget.style.borderColor = darkMode ? '#333' : '#e0e0e0'}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px', paddingTop: '16px', borderTop: `1px solid ${darkMode ? '#333' : '#e0e0e0'}` }}>
            <button
              type="button"
              onClick={onClose}
              style={{ flex: 1, padding: '14px 20px', borderRadius: '10px', border: `2px solid ${darkMode ? '#333' : '#e0e0e0'}`, backgroundColor: 'transparent', color: darkMode ? '#fff' : '#111', fontWeight: '600', fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = darkMode ? '#333' : '#f5f5f5' }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{ flex: 1, padding: '14px 20px', borderRadius: '10px', border: 'none', backgroundColor: darkMode ? '#3b82f6' : '#FF0800', color: '#fff', fontWeight: '600', fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.9' }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
            >
              {isEdit ? 'Update Movie' : 'Add Movie'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ── View Movie Modal ───────────────────────────────────────────
const ViewMovieModal = ({ darkMode, isOpen, onClose, movie }) => {
  if (!isOpen || !movie) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ backgroundColor: darkMode ? '#1e1e1e' : '#fff', borderRadius: '16px', padding: '24px', width: '90%', maxWidth: '400px', border: `1px solid ${darkMode ? '#333' : '#f0e0e0'}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: darkMode ? '#fff' : '#111' }}>Movie Details</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
            <CloseIcon size={20} color={darkMode ? '#fff' : '#111'} />
          </button>
        </div>
        <div style={{ marginBottom: '12px' }}>
          <p style={{ margin: 0, fontSize: '12px', color: '#aaa' }}>Title</p>
          <p style={{ margin: '4px 0 0', fontSize: '15px', fontWeight: '600', color: darkMode ? '#fff' : '#111' }}>{movie.title}</p>
        </div>
        <div style={{ marginBottom: '12px' }}>
          <p style={{ margin: 0, fontSize: '12px', color: '#aaa' }}>Description</p>
          <p style={{ margin: '4px 0 0', fontSize: '15px', fontWeight: '600', color: darkMode ? '#fff' : '#111' }}>{movie.description}</p>
        </div>
        <div style={{ marginBottom: '12px' }}>
          <p style={{ margin: 0, fontSize: '12px', color: '#aaa' }}>Duration</p>
          <p style={{ margin: '4px 0 0', fontSize: '15px', fontWeight: '600', color: darkMode ? '#fff' : '#111' }}>{movie.duration} min</p>
        </div>
        <div style={{ marginBottom: '12px' }}>
          <p style={{ margin: 0, fontSize: '12px', color: '#aaa' }}>Rating</p>
          <p style={{ margin: '4px 0 0', fontSize: '15px', fontWeight: '600', color: darkMode ? '#fff' : '#111' }}>{movie.rating}</p>
        </div>
        <div style={{ marginBottom: '12px' }}>
          <p style={{ margin: 0, fontSize: '12px', color: '#aaa' }}>Price</p>
          <p style={{ margin: '4px 0 0', fontSize: '15px', fontWeight: '600', color: darkMode ? '#fff' : '#111' }}>${movie.amount}</p>
        </div>
        <div style={{ marginBottom: '12px' }}>
          <p style={{ margin: 0, fontSize: '12px', color: '#aaa' }}>Director</p>
          <p style={{ margin: '4px 0 0', fontSize: '15px', fontWeight: '600', color: darkMode ? '#fff' : '#111' }}>{movie.director}</p>
        </div>
        <div style={{ marginBottom: '12px' }}>
          <p style={{ margin: 0, fontSize: '12px', color: '#aaa' }}>Language</p>
          <p style={{ margin: '4px 0 0', fontSize: '15px', fontWeight: '600', color: darkMode ? '#fff' : '#111' }}>{movie.language}</p>
        </div>
        <div style={{ marginBottom: '12px' }}>
          <p style={{ margin: 0, fontSize: '12px', color: '#aaa' }}>Genres</p>
          <p style={{ margin: '4px 0 0', fontSize: '15px', fontWeight: '600', color: darkMode ? '#fff' : '#111' }}>{movie.genres ? movie.genres.join(', ') : 'N/A'}</p>
        </div>
        <div>
          <p style={{ margin: 0, fontSize: '12px', color: '#aaa' }}>Status</p>
          <span style={{ display: 'inline-block', marginTop: '4px', fontSize: '11px', fontWeight: '600', padding: '3px 10px', borderRadius: '99px', backgroundColor: movie.status === 'Active' ? '#dcfce7' : '#f5f5f5', color: movie.status === 'Active' ? '#16a34a' : '#888' }}>{movie.status}</span>
        </div>
      </div>
    </div>
  );
};

// ── Main ───────────────────────────────────────────────
const TABS = ['Overview', 'Movies', 'Users', 'Bookings'];

const AdminDashboard = ({ user }) => {
  const { isDarkMode } = useTheme();
  const { token } = useAuth();
  const [activeTab,    setActiveTab]    = useState('Overview');
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [movies,       setMovies]       = useState([]);
  const [loading,      setLoading]      = useState(false);
  const [isModalOpen,  setIsModalOpen]  = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [viewingMovie, setViewingMovie] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [allBookings, setAllBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(false);

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched users:', data);
          setAllUsers(data);
        } else {
          console.error('Failed to fetch users:', response.status);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [token]);

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

  // Fetch bookings from API
  useEffect(() => {
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
          // Transform backend response to frontend format with movie names
          const transformedBookings = await Promise.all(data.map(async (booking) => {
            let movieName = `Showtime ${booking.showtimeId}`;
            let userName = `User ${booking.userId}`;
            
            // Fetch movie details if movieId is available
            if (booking.movieId) {
              try {
                const movieResponse = await fetch(`${API_BASE_URL}/api/movies/${booking.movieId}`);
                if (movieResponse.ok) {
                  const movieData = await movieResponse.json();
                  movieName = movieData.title || movieName;
                }
              } catch (e) {
                console.error('Error fetching movie:', e);
              }
            }
            
            return {
              bookingId: booking.bookingId,
              movie: movieName,
              customer: userName,
              date: booking.bookingTime ? booking.bookingTime.split('T')[0] : 'N/A',
              amount: `$${booking.totalPrice || 0}`,
              status: booking.status || 'CONFIRMED',
            };
          }));
          setAllBookings(transformedBookings);
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoadingBookings(false);
      }
    };

    fetchBookings();
  }, [token]);

  const handleAddMovie = () => {
    setEditingMovie(null);
    setIsModalOpen(true);
  };

  const handleEditMovie = (movie) => {
    setEditingMovie(movie);
    setIsModalOpen(true);
  };

  const handleDeleteMovie = async (movieId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/movies/${movieId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setMovies(movies.filter(m => m.id !== movieId));
      }
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  const handleApproveMovie = async (movieId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/movies/${movieId}/approve`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const updatedMovie = await response.json();
        setMovies(movies.map(m => m.id === movieId ? updatedMovie : m));
      }
    } catch (error) {
      console.error('Error approving movie:', error);
    }
  };

  const handleRejectMovie = async (movieId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/movies/${movieId}/reject`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const updatedMovie = await response.json();
        setMovies(movies.map(m => m.id === movieId ? updatedMovie : m));
      }
    } catch (error) {
      console.error('Error rejecting movie:', error);
    }
  };

  const handleViewMovie = (movie) => {
    setViewingMovie(movie);
    setIsViewModalOpen(true);
  };

  const handleModalSubmit = async (formData) => {
    try {
      const movieData = {
        title: formData.title,
        description: formData.description,
        duration: parseInt(formData.duration),
        rating: parseFloat(formData.rating),
        amount: parseFloat(formData.amount),
        posterUrl: formData.posterUrl,
        director: formData.director,
        language: formData.language,
        status: formData.status,
        genres: formData.genres ? formData.genres.split(',').map(g => g.trim()) : [],
      };

      let response;
      if (editingMovie) {
        response = await fetch(`${API_BASE_URL}/api/movies/${editingMovie.id}`, {
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
    setIsModalOpen(false);
    setEditingMovie(null);
  };

  const handleDeleteUser = (userId) => {
    // User deletion not implemented - read-only view
    console.log('Delete user:', userId);
  };

  const handleDeleteBooking = (bookingId) => {
    // Booking deletion not implemented - read-only view
    console.log('Delete booking:', bookingId);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: isDarkMode ? '#111' : '#FFF', padding: 'clamp(16px, 4vw, 40px)' }}>
      {/* ── Dashboard Header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            borderRadius: '10px', 
            background: isDarkMode ? 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)' : 'linear-gradient(135deg, #FF0800 0%, #ff6b6b 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Clapperboard size={22} color="#fff" />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: '700', color: isDarkMode ? '#fff' : '#111' }}>
              Admin <span style={{ color: isDarkMode ? '#3b82f6' : '#FF0800' }}>Dashboard</span>
            </h1>
            <p style={{ margin: 0, fontSize: '13px', color: '#aaa' }}>Welcome back, {user?.name || 'Admin User'}</p>
          </div>
        </div>
        <span style={{ 
          backgroundColor: isDarkMode ? '#3b82f6' : '#FF0800', 
          color: '#fff', 
          fontSize: '12px', 
          fontWeight: '700', 
          padding: '8px 20px', 
          borderRadius: '99px',
          boxShadow: isDarkMode ? '0 2px 8px rgba(59, 130, 246, 0.3)' : '0 2px 8px rgba(255, 8, 0, 0.3)'
        }}>
          Administrator
        </span>
      </div>

      {/* ── Stats Grid ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '24px' }}>
        {getStats(isDarkMode, allBookings, movies, allUsers).map((s, i) => (
          <div key={i} style={{ ...card(isDarkMode), padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              {s.iconEl}
              <span style={{ fontSize: '10px', fontWeight: '600', padding: '2px 7px', borderRadius: '99px', backgroundColor: s.badgeColor, color: s.badgeText }}>{s.badge}</span>
            </div>
            <p style={{ margin: '0 0 2px', fontSize: '11px', color: '#aaa' }}>{s.label}</p>
            <p style={{ margin: 0, fontSize: 'clamp(16px, 2.5vw, 22px)', fontWeight: '700', color: isDarkMode ? '#fff' : '#111' }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* ── Tabs — desktop pill / mobile dropdown ── */}
      {/* Desktop */}
      <div style={{ display: 'flex', backgroundColor: isDarkMode ? '#1e1e1e' : '#f0e8e8', borderRadius: '99px', padding: '4px', marginBottom: '20px', gap: '4px' }}
           className="hidden sm:flex">
        {TABS.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            flex: 1, padding: '9px', border: 'none', cursor: 'pointer', borderRadius: '99px',
            fontWeight: '600', fontSize: '13px', transition: 'all 0.2s',
            backgroundColor: activeTab === tab ? '#fff' : 'transparent',
            color: activeTab === tab ? '#111' : '#888',
            boxShadow: activeTab === tab ? '0 1px 6px rgba(0,0,0,0.1)' : 'none',
          }}>{tab}</button>
        ))}
      </div>

      {/* Mobile dropdown */}
      <div style={{ position: 'relative', marginBottom: '20px' }} className="sm:hidden">
        <button onClick={() => setMenuOpen(p => !p)} style={{ width: '100%', padding: '10px 16px', borderRadius: '10px', border: `1px solid ${isDarkMode ? '#333' : '#f0e0e0'}`, backgroundColor: isDarkMode ? '#1e1e1e' : '#fff', color: isDarkMode ? '#fff' : '#111', fontWeight: '600', fontSize: '14px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {activeTab}
          {menuOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
        {menuOpen && (
          <div style={{ position: 'absolute', top: '110%', left: 0, right: 0, backgroundColor: isDarkMode ? '#1e1e1e' : '#fff', border: `1px solid ${isDarkMode ? '#333' : '#f0e0e0'}`, borderRadius: '10px', overflow: 'hidden', zIndex: 50 }}>
            {TABS.map(tab => (
              <button key={tab} onClick={() => { setActiveTab(tab); setMenuOpen(false); }}
                style={{ width: '100%', padding: '12px 16px', border: 'none', background: activeTab === tab ? (isDarkMode ? '#3b82f6' : '#FF0800') : 'transparent', color: activeTab === tab ? '#fff' : isDarkMode ? '#fff' : '#111', fontWeight: '600', fontSize: '14px', cursor: 'pointer', textAlign: 'left' }}>
                {tab}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Tab Content ── */}
      {activeTab === 'Overview' && <OverviewTab  darkMode={isDarkMode} bookings={allBookings} />}
      {activeTab === 'Movies'   && <MoviesTab    darkMode={isDarkMode} movies={movies} onAddMovie={handleAddMovie} onEditMovie={handleEditMovie} onDeleteMovie={handleDeleteMovie} onViewMovie={handleViewMovie} onApproveMovie={handleApproveMovie} onRejectMovie={handleRejectMovie} />}
      {activeTab === 'Users'    && <UsersTab     darkMode={isDarkMode} users={allUsers} onDeleteUser={handleDeleteUser} currentUser={user} />}
      {activeTab === 'Bookings' && <BookingsTab  darkMode={isDarkMode} bookings={allBookings} onDeleteBooking={handleDeleteBooking} />}
      
      {/* Modals */}
      <MovieModal 
        darkMode={isDarkMode} 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setEditingMovie(null); }} 
        onSubmit={handleModalSubmit} 
        movie={editingMovie}
        isEdit={!!editingMovie}
      />
      <ViewMovieModal 
        darkMode={isDarkMode} 
        isOpen={isViewModalOpen} 
        onClose={() => { setIsViewModalOpen(false); setViewingMovie(null); }} 
        movie={viewingMovie}
      />
    </div>
  );
};

export default AdminDashboard;