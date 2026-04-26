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
const getStats = (isDarkMode) => [
  { iconEl: <DollarSign size={22} color="#22c55e" />, label: 'Total Revenue',   value: '$125,430', badge: '+12.5%', badgeColor: '#dcfce7', badgeText: '#16a34a' },
  { iconEl: <Ticket     size={22} color={isDarkMode ? '#3b82f6' : '#FF0800'} />, label: 'Total Bookings',  value: '1,234',    badge: '+8.2%',  badgeColor: isDarkMode ? '#dbeafe' : '#ffe0de', badgeText: isDarkMode ? '#1d4ed8' : '#FF0800' },
  { iconEl: <Film       size={22} color={isDarkMode ? '#3b82f6' : '#FF0800'} />, label: 'Active Movies',   value: '24',       badge: '+3',     badgeColor: isDarkMode ? '#dbeafe' : '#ffe0de', badgeText: isDarkMode ? '#1d4ed8' : '#FF0800' },
  { iconEl: <Users      size={22} color="#a855f7" />, label: 'Total Customers', value: '5,678',    badge: '+15.3%', badgeColor: '#f3e8ff', badgeText: '#7e22ce' },
];

const API_BASE_URL = 'http://localhost:8080';

const users = [
  { name: 'John Doe',    email: 'john@example.com', bookings: 12, role: 'customer' },
  { name: 'Jane Smith',  email: 'jane@example.com', bookings: 8,  role: 'customer' },
  { name: 'Bob Johnson', email: 'bob@example.com',  bookings: 0,  role: 'employee' },
];

const initialMovies = [];

const bookings = [
  { movie: 'Shadow Operative', customer: 'John Doe',  date: '2025-10-15', amount: '$36', status: 'confirmed' },
  { movie: 'Eternal Love',     customer: 'Jane Smith', date: '2025-10-14', amount: '$40', status: 'confirmed' },
  { movie: 'The Haunting',     customer: 'Bob Wilson', date: '2025-10-14', amount: '$32', status: 'pending'   },
];

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
const OverviewTab = ({ darkMode }) => (
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
      {bookings.map((b, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < bookings.length - 1 ? `1px solid ${darkMode ? '#333' : '#f5e8e8'}` : 'none' }}>
          <div>
            <p style={{ margin: 0, fontWeight: '600', fontSize: '13px', color: darkMode ? '#fff' : '#111' }}>{b.customer}</p>
            <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#aaa' }}>{b.movie}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: darkMode ? '#3b82f6' : '#FF0800', fontWeight: '700', fontSize: '13px' }}>{b.amount}</span>
            <span style={{ fontSize: '10px', fontWeight: '600', padding: '2px 8px', borderRadius: '99px', backgroundColor: b.status === 'confirmed' ? (darkMode ? '#3b82f6' : '#FF0800') : '#f5f5f5', color: b.status === 'confirmed' ? '#fff' : '#888' }}>{b.status}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const MoviesTab = ({ darkMode, movies, onAddMovie, onEditMovie, onDeleteMovie, onViewMovie }) => {
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
        <button onClick={onAddMovie} style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: darkMode ? '#3b82f6' : '#FF0800', color: '#fff', border: 'none', borderRadius: '8px', padding: '9px 16px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>
          <Plus size={14} /> Add Movie
        </button>
      </div>
      <SearchBar value={search} onChange={e => setSearch(e.target.value)} placeholder="Search movies..." darkMode={darkMode} />
      {filtered.map((m) => (
        <div key={m.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', borderRadius: '10px', marginBottom: '8px', border: `1px solid ${darkMode ? '#333' : '#f0e0e0'}`, flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <p style={{ margin: 0, fontWeight: '600', fontSize: '14px', color: darkMode ? '#fff' : '#111' }}>{m.title}</p>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#aaa' }}>Duration: {m.duration}min &nbsp; Rating: {m.rating} &nbsp; Price: ${m.amount}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '11px', fontWeight: '600', padding: '3px 10px', borderRadius: '99px', backgroundColor: m.status === 'Active' ? (darkMode ? '#3b82f6' : '#FF0800') : '#f5f5f5', color: m.status === 'Active' ? '#fff' : '#888' }}>{m.status}</span>
            <Eye size={15} color="#aaa" style={{ cursor: 'pointer' }} onClick={() => onViewMovie(m)} />
            <Pencil size={15} color="#aaa" style={{ cursor: 'pointer' }} onClick={() => onEditMovie(m)} />
            <Trash2 size={15} color="#aaa" style={{ cursor: 'pointer' }} onClick={() => onDeleteMovie(m.id)} />
          </div>
        </div>
      ))}
    </div>
  );
};

const UsersTab = ({ darkMode, users, onAddUser, onEditUser, onDeleteUser }) => {
  const [search, setSearch] = useState('');
  const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div style={card(darkMode)}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={16} color={darkMode ? '#3b82f6' : '#FF0800'} />
            <span style={{ fontWeight: '700', fontSize: '15px', color: darkMode ? '#fff' : '#111' }}>Users Management</span>
          </div>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#aaa' }}>Manage all users and roles</p>
        </div>
        <button onClick={onAddUser} style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: darkMode ? '#3b82f6' : '#FF0800', color: '#fff', border: 'none', borderRadius: '8px', padding: '9px 16px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>
          <Plus size={14} /> Add User
        </button>
      </div>
      <SearchBar value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..." darkMode={darkMode} />
      {filtered.map((u, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', borderRadius: '10px', marginBottom: '8px', border: `1px solid ${darkMode ? '#333' : '#f0e0e0'}`, flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <p style={{ margin: 0, fontWeight: '600', fontSize: '14px', color: darkMode ? '#fff' : '#111' }}>{u.name}</p>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#aaa' }}>{u.email} &nbsp; Bookings: {u.bookings}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '11px', fontWeight: '600', padding: '3px 10px', borderRadius: '99px', backgroundColor: roleBadge(u.role, darkMode).bg, color: roleBadge(u.role, darkMode).color }}>{u.role}</span>
            <Pencil size={15} color="#aaa" style={{ cursor: 'pointer' }} onClick={() => onEditUser(u)} />
            <Trash2 size={15} color="#aaa" style={{ cursor: 'pointer' }} onClick={() => onDeleteUser(i)} />
          </div>
        </div>
      ))}
    </div>
  );
};

const BookingsTab = ({ darkMode, bookings, onAddBooking, onEditBooking, onDeleteBooking }) => {
  const [search, setSearch] = useState('');
  const filtered = bookings.filter(b => b.movie.toLowerCase().includes(search.toLowerCase()) || b.customer.toLowerCase().includes(search.toLowerCase()));
  return (
    <div style={card(darkMode)}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Ticket size={16} color={darkMode ? '#3b82f6' : '#FF0800'} />
            <span style={{ fontWeight: '700', fontSize: '15px', color: darkMode ? '#fff' : '#111' }}>All Bookings</span>
          </div>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#aaa' }}>View and manage all bookings</p>
        </div>
        <button onClick={onAddBooking} style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: darkMode ? '#3b82f6' : '#FF0800', color: '#fff', border: 'none', borderRadius: '8px', padding: '9px 16px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>
          <Plus size={14} /> Add Booking
        </button>
      </div>
      <SearchBar value={search} onChange={e => setSearch(e.target.value)} placeholder="Search bookings..." darkMode={darkMode} />
      {filtered.map((b, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', borderRadius: '10px', marginBottom: '8px', border: `1px solid ${darkMode ? '#333' : '#f0e0e0'}`, flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <p style={{ margin: 0, fontWeight: '600', fontSize: '14px', color: darkMode ? '#fff' : '#111' }}>{b.movie}</p>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#aaa' }}>Customer: {b.customer} &nbsp; Date: {b.date}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: darkMode ? '#22c55e' : '#16a34a', fontWeight: '700', fontSize: '14px' }}>{b.amount}</span>
            <span style={{ fontSize: '10px', fontWeight: '600', padding: '2px 8px', borderRadius: '99px', backgroundColor: b.status === 'confirmed' ? (darkMode ? '#3b82f6' : '#FF0800') : '#f5f5f5', color: b.status === 'confirmed' ? '#fff' : '#888' }}>{b.status}</span>
            <Pencil size={15} color="#aaa" style={{ cursor: 'pointer' }} onClick={() => onEditBooking(b)} />
            <Trash2 size={15} color="#aaa" style={{ cursor: 'pointer' }} onClick={() => onDeleteBooking(i)} />
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

// ── User Modal ───────────────────────────────────────────
const UserModal = ({ darkMode, isOpen, onClose, onSubmit, user, isEdit }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bookings: user?.bookings || 0,
    role: user?.role || 'customer'
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        bookings: user.bookings,
        role: user.role
      });
    } else {
      setFormData({
        name: '',
        email: '',
        bookings: 0,
        role: 'customer'
      });
    }
  }, [user]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ backgroundColor: darkMode ? '#1e1e1e' : '#fff', borderRadius: '16px', padding: '24px', width: '90%', maxWidth: '400px', border: `1px solid ${darkMode ? '#333' : '#f0e0e0'}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: darkMode ? '#fff' : '#111' }}>
            {isEdit ? 'Edit User' : 'Add New User'}
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
            <CloseIcon size={20} color={darkMode ? '#fff' : '#111'} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: darkMode ? '#fff' : '#111', marginBottom: '6px' }}>Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: `1px solid ${darkMode ? '#333' : '#f0e0e0'}`, backgroundColor: darkMode ? '#2a2a2a' : '#fff', color: darkMode ? '#fff' : '#111', fontSize: '13px', outline: 'none' }}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: darkMode ? '#fff' : '#111', marginBottom: '6px' }}>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: `1px solid ${darkMode ? '#333' : '#f0e0e0'}`, backgroundColor: darkMode ? '#2a2a2a' : '#fff', color: darkMode ? '#fff' : '#111', fontSize: '13px', outline: 'none' }}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: darkMode ? '#fff' : '#111', marginBottom: '6px' }}>Bookings</label>
            <input
              type="number"
              value={formData.bookings}
              onChange={(e) => setFormData({ ...formData, bookings: parseInt(e.target.value) || 0 })}
              required
              min="0"
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: `1px solid ${darkMode ? '#333' : '#f0e0e0'}`, backgroundColor: darkMode ? '#2a2a2a' : '#fff', color: darkMode ? '#fff' : '#111', fontSize: '13px', outline: 'none' }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: darkMode ? '#fff' : '#111', marginBottom: '6px' }}>Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: `1px solid ${darkMode ? '#333' : '#f0e0e0'}`, backgroundColor: darkMode ? '#2a2a2a' : '#fff', color: darkMode ? '#fff' : '#111', fontSize: '13px', outline: 'none' }}
            >
              <option value="customer">Customer</option>
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{ flex: 1, padding: '10px', borderRadius: '8px', border: `1px solid ${darkMode ? '#333' : '#f0e0e0'}`, backgroundColor: 'transparent', color: darkMode ? '#fff' : '#111', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', backgroundColor: darkMode ? '#3b82f6' : '#FF0800', color: '#fff', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}
            >
              {isEdit ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ── Booking Modal ───────────────────────────────────────────
const BookingModal = ({ darkMode, isOpen, onClose, onSubmit, booking, isEdit }) => {
  const [formData, setFormData] = useState({
    movie: booking?.movie || '',
    customer: booking?.customer || '',
    date: booking?.date || '',
    amount: booking?.amount || '',
    status: booking?.status || 'confirmed'
  });

  useEffect(() => {
    if (booking) {
      setFormData({
        movie: booking.movie,
        customer: booking.customer,
        date: booking.date,
        amount: booking.amount,
        status: booking.status
      });
    } else {
      setFormData({
        movie: '',
        customer: '',
        date: '',
        amount: '',
        status: 'confirmed'
      });
    }
  }, [booking]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ backgroundColor: darkMode ? '#1e1e1e' : '#fff', borderRadius: '16px', padding: '24px', width: '90%', maxWidth: '400px', border: `1px solid ${darkMode ? '#333' : '#f0e0e0'}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: darkMode ? '#fff' : '#111' }}>
            {isEdit ? 'Edit Booking' : 'Add New Booking'}
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
            <CloseIcon size={20} color={darkMode ? '#fff' : '#111'} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: darkMode ? '#fff' : '#111', marginBottom: '6px' }}>Movie</label>
            <input
              type="text"
              value={formData.movie}
              onChange={(e) => setFormData({ ...formData, movie: e.target.value })}
              required
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: `1px solid ${darkMode ? '#333' : '#f0e0e0'}`, backgroundColor: darkMode ? '#2a2a2a' : '#fff', color: darkMode ? '#fff' : '#111', fontSize: '13px', outline: 'none' }}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: darkMode ? '#fff' : '#111', marginBottom: '6px' }}>Customer</label>
            <input
              type="text"
              value={formData.customer}
              onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
              required
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: `1px solid ${darkMode ? '#333' : '#f0e0e0'}`, backgroundColor: darkMode ? '#2a2a2a' : '#fff', color: darkMode ? '#fff' : '#111', fontSize: '13px', outline: 'none' }}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: darkMode ? '#fff' : '#111', marginBottom: '6px' }}>Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: `1px solid ${darkMode ? '#333' : '#f0e0e0'}`, backgroundColor: darkMode ? '#2a2a2a' : '#fff', color: darkMode ? '#fff' : '#111', fontSize: '13px', outline: 'none' }}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: darkMode ? '#fff' : '#111', marginBottom: '6px' }}>Amount</label>
            <input
              type="text"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
              placeholder="$0"
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: `1px solid ${darkMode ? '#333' : '#f0e0e0'}`, backgroundColor: darkMode ? '#2a2a2a' : '#fff', color: darkMode ? '#fff' : '#111', fontSize: '13px', outline: 'none' }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: darkMode ? '#fff' : '#111', marginBottom: '6px' }}>Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: `1px solid ${darkMode ? '#333' : '#f0e0e0'}`, backgroundColor: darkMode ? '#2a2a2a' : '#fff', color: darkMode ? '#fff' : '#111', fontSize: '13px', outline: 'none' }}
            >
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{ flex: 1, padding: '10px', borderRadius: '8px', border: `1px solid ${darkMode ? '#333' : '#f0e0e0'}`, backgroundColor: 'transparent', color: darkMode ? '#fff' : '#111', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', backgroundColor: darkMode ? '#3b82f6' : '#FF0800', color: '#fff', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}
            >
              {isEdit ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
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
  const [allUsers, setAllUsers] = useState(users);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [allBookings, setAllBookings] = useState(bookings);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);

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

  const handleAddUser = () => {
    setEditingUser(null);
    setIsUserModalOpen(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsUserModalOpen(true);
  };

  const handleDeleteUser = (index) => {
    const newUsers = [...allUsers];
    newUsers.splice(index, 1);
    setAllUsers(newUsers);
  };

  const handleUserModalSubmit = (formData) => {
    if (editingUser) {
      setAllUsers(allUsers.map(u => u === editingUser ? formData : u));
    } else {
      setAllUsers([...allUsers, formData]);
    }
    setIsUserModalOpen(false);
    setEditingUser(null);
  };

  const handleAddBooking = () => {
    setEditingBooking(null);
    setIsBookingModalOpen(true);
  };

  const handleEditBooking = (booking) => {
    setEditingBooking(booking);
    setIsBookingModalOpen(true);
  };

  const handleDeleteBooking = (index) => {
    const newBookings = [...allBookings];
    newBookings.splice(index, 1);
    setAllBookings(newBookings);
  };

  const handleBookingModalSubmit = (formData) => {
    if (editingBooking) {
      setAllBookings(allBookings.map(b => b === editingBooking ? formData : b));
    } else {
      setAllBookings([...allBookings, formData]);
    }
    setIsBookingModalOpen(false);
    setEditingBooking(null);
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
        {getStats(isDarkMode).map((s, i) => (
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
      {activeTab === 'Overview' && <OverviewTab  darkMode={isDarkMode} />}
      {activeTab === 'Movies'   && <MoviesTab    darkMode={isDarkMode} movies={movies} onAddMovie={handleAddMovie} onEditMovie={handleEditMovie} onDeleteMovie={handleDeleteMovie} onViewMovie={handleViewMovie} />}
      {activeTab === 'Users'    && <UsersTab     darkMode={isDarkMode} users={allUsers} onAddUser={handleAddUser} onEditUser={handleEditUser} onDeleteUser={handleDeleteUser} />}
      {activeTab === 'Bookings' && <BookingsTab  darkMode={isDarkMode} bookings={allBookings} onAddBooking={handleAddBooking} onEditBooking={handleEditBooking} onDeleteBooking={handleDeleteBooking} />}
      
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
      <UserModal 
        darkMode={isDarkMode} 
        isOpen={isUserModalOpen} 
        onClose={() => { setIsUserModalOpen(false); setEditingUser(null); }} 
        onSubmit={handleUserModalSubmit} 
        user={editingUser}
        isEdit={!!editingUser}
      />
      <BookingModal 
        darkMode={isDarkMode} 
        isOpen={isBookingModalOpen} 
        onClose={() => { setIsBookingModalOpen(false); setEditingBooking(null); }} 
        onSubmit={handleBookingModalSubmit} 
        booking={editingBooking}
        isEdit={!!editingBooking}
      />
    </div>
  );
};

export default AdminDashboard;