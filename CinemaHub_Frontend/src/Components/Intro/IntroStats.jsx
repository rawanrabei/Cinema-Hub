import React from 'react';
import { useTheme } from "../../context/ThemeContext";

const stats = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    value: '50K+',
    label: 'Happy Customers',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="2" width="8" height="8" rx="1"/>
        <rect x="14" y="2" width="8" height="8" rx="1"/>
        <rect x="2" y="14" width="8" height="8" rx="1"/>
        <rect x="14" y="14" width="8" height="8" rx="1"/>
      </svg>
    ),
    value: '100+',
    label: 'Movies Available',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    value: '15+',
    label: 'Cinema Locations',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="1" y="6" width="22" height="14" rx="2"/>
        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
        <line x1="12" y1="12" x2="12" y2="12"/>
        <path d="M8 12h8"/>
      </svg>
    ),
    value: '1M+',
    label: 'Tickets Booked',
  },
];

const IntroStats = ({ darkMode }) => {
  const { colors } = useTheme();
  return (
    <section style={{
      backgroundColor: darkMode ? '#161616' : '#fdf6ed',
      padding: '40px 20px 60px',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '16px',
        maxWidth: '900px',
        margin: '0 auto',
      }}>
        {stats.map((stat, i) => (
          <div key={i} style={{
            backgroundColor: darkMode ? '#222' : '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: '14px',
            padding: '28px 20px',
            textAlign: 'center',
          }}>
            <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'center', color: colors.primary }}>
              {stat.icon}
            </div>
            <div style={{
              fontSize: '26px', fontWeight: '700',
              color: darkMode ? '#fff' : '#111',
              marginBottom: '4px',
            }}>
              {stat.value}
            </div>
            <div style={{
              fontSize: '13px',
              color: darkMode ? '#aaa' : '#666',
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default IntroStats;