import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from "../../context/ThemeContext";

const steps = [
  {
    number: 1,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Create a New Account',
    description: 'Create your account for free in a few seconds',
  },
  {
    number: 2,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="2" width="8" height="8" rx="1"/>
        <rect x="14" y="2" width="8" height="8" rx="1"/>
        <rect x="2" y="14" width="8" height="8" rx="1"/>
        <rect x="14" y="14" width="8" height="8" rx="1"/>
      </svg>
    ),
    title: 'Choose Your Favorite Movie',
    description: 'Browse hundreds of movies and choose what suits you',
  },
  {
    number: 3,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="1" y="6" width="22" height="14" rx="2"/>
        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
        <line x1="8" y1="14" x2="16" y2="14"/>
      </svg>
    ),
    title: 'Book and Enjoy',
    description: 'Choose your seats and book with one click',
  },
];

const StepItem = ({ step, index, darkMode, colors }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 200);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index]);

  const isLast = index === steps.length - 1;

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '24px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(60px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}
    >
      {/* Left: number bubble + line */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div style={{
          width: '48px', height: '48px',
          borderRadius: '50%',
          background: darkMode
            ? `linear-gradient(135deg, ${colors.primary}, #1d4ed8)`
            : `linear-gradient(135deg, #f97316, ${colors.primary})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontWeight: '700', fontSize: '18px',
          boxShadow: darkMode
            ? `0 4px 14px ${colors.primary}66`
            : '0 4px 14px rgba(249,115,22,0.4)',
          flexShrink: 0,
        }}>
          {step.number}
        </div>
        {!isLast && (
          <div style={{
            width: '2px',
            height: '80px',
            background: visible
              ? `linear-gradient(to bottom, ${colors.primary}, ${darkMode ? "#93c5fd" : "#d4a017"})`
              : 'transparent',
            transition: 'background 0.6s ease 0.4s',
            marginTop: '4px',
          }} />
        )}
      </div>

      {/* Right: card */}
      <div style={{
        flex: 1,
        backgroundColor: darkMode ? '#1e1e1e' : '#fff',
        border: `1px solid ${darkMode ? '#333' : '#f0e0e0'}`,
        borderRadius: '14px',
        padding: '24px 28px',
        marginBottom: isLast ? 0 : '32px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', color: colors.primary }}>
          {step.icon}
          <h3 style={{
            margin: 0,
            fontSize: '17px',
            fontWeight: '700',
            color: darkMode ? '#fff' : '#111',
          }}>
            {step.title}
          </h3>
        </div>
        <p style={{
          margin: 0,
          fontSize: '14px',
          color: darkMode ? '#999' : '#777',
          lineHeight: '1.6',
        }}>
          {step.description}
        </p>
      </div>
    </div>
  );
};

const IntroSteps = ({ darkMode }) => {
  const { colors } = useTheme();
  return (
    <section style={{
      backgroundColor: darkMode ? '#111' : '#fdf6ed',
      padding: '70px 40px',
      textAlign: 'center',
    }}>
      {/* Header */}
      <h2 style={{
        fontSize: '38px',
        fontWeight: '700',
        color: darkMode ? '#fff' : '#111',
        margin: '0 0 10px',
      }}>
        How <span style={{ color: colors.primary }}>Does</span> the platform work?
      </h2>
      <p style={{
        fontSize: '15px',
        color: darkMode ? '#aaa' : '#777',
        margin: '0 0 56px',
      }}>
        Book your ticket in 3 simple steps
      </p>

      {/* Steps */}
      <div style={{
        maxWidth: '700px',
        margin: '0 auto',
        textAlign: 'left',
      }}>
        {steps.map((step, i) => (
          <StepItem key={i} step={step} index={i} darkMode={darkMode} colors={colors} />
        ))}
      </div>
    </section>
  );
};

export default IntroSteps;