import React from 'react';
import { useTheme } from "../../context/ThemeContext";

const features = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="2" width="8" height="8" rx="1"/>
        <rect x="14" y="2" width="8" height="8" rx="1"/>
        <rect x="2" y="14" width="8" height="8" rx="1"/>
        <rect x="14" y="14" width="8" height="8" rx="1"/>
      </svg>
    ),
    title: 'Latest Movies',
    description: 'Watch the newest and best movies from around the world',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    title: 'Multiple Locations',
    description: 'Choose from several cinema locations near you',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M8 3h8l1 7H7L8 3z"/>
        <path d="M7 10v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V10"/>
        <path d="M10 10v4M14 10v4"/>
      </svg>
    ),
    title: 'Food & Beverages',
    description: 'Order your favorite snacks with your ticket',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    title: 'Reward Points',
    description: 'Earn points with every booking and redeem for discounts',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="1" y="6" width="22" height="13" rx="2"/>
        <path d="M1 10h22"/>
      </svg>
    ),
    title: 'Secure Payment',
    description: '100% safe and encrypted payment system',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polyline points="20 12 20 22 4 22 4 12"/>
        <rect x="2" y="7" width="20" height="5"/>
        <line x1="12" y1="22" x2="12" y2="7"/>
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
      </svg>
    ),
    title: 'Exclusive Offers',
    description: 'Get amazing discounts and special deals',
  },
];

const IntroFeatures = ({ darkMode }) => {
  const { colors } = useTheme();
  return (
    <section style={{
      backgroundColor: darkMode ? '#111' : '#fdf6ed',
      padding: '60px 40px',
      textAlign: 'center',
    }}>
      {/* Header */}
      <h2 style={{
        fontSize: '40px',
        fontWeight: '700',
        color: darkMode ? '#fff' : '#111',
        margin: '0 0 12px',
      }}>
        Why{' '}
        <span style={{ color: colors.primary }}>Cinema Hub</span>?
      </h2>
      <p style={{
        fontSize: '15px',
        color: darkMode ? '#aaa' : '#666',
        margin: '0 0 48px',
      }}>
        We offer you an easy and fast booking experience with exceptional features
      </p>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
        maxWidth: '1100px',
        margin: '0 auto',
        textAlign: 'left',
      }}>
        {features.map((feature, i) => (
          <div key={i} style={{
            backgroundColor: darkMode ? '#1e1e1e' : '#fff',
            border: `1px solid ${darkMode ? '#333' : '#f0e0e0'}`,
            borderRadius: '16px',
            padding: '32px 28px',
          }}>
            <div style={{ marginBottom: '24px', color: colors.primary }}>{feature.icon}</div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '700',
              color: darkMode ? '#fff' : '#111',
              margin: '0 0 10px',
            }}>
              {feature.title}
            </h3>
            <p style={{
              fontSize: '14px',
              color: darkMode ? '#999' : '#666',
              lineHeight: '1.6',
              margin: 0,
            }}>
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default IntroFeatures;