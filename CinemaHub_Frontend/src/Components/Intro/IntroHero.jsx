import React from 'react';
import { Clapperboard } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { useTheme } from "../../context/ThemeContext";

const IntroHero = ({ darkMode }) => {
const navigate = useNavigate();
const { colors } = useTheme();
  return (
    <section style={{
      backgroundColor: darkMode ? '#111' : '#fff',
      padding: '80px 20px 60px',
      textAlign: 'center',
    }}>
      {/* Icon with glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: '80px', height: '80px',
          backgroundColor: darkMode ? `${colors.primary}22` : '#fee2e2',
          borderRadius: '50%',
          marginBottom: '28px',
          boxShadow: darkMode
            ? `0 0 40px ${colors.primary}66`
            : '0 0 40px rgba(220,38,38,0.3)',
        }}
      >
        <Clapperboard size={70} color={colors.primary} />
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        style={{
          fontSize: '48px', fontWeight: '700',
          color: darkMode ? '#fff' : '#111',
          margin: '0 0 12px',
        }}
      >
        Welcome to{' '}
        <span style={{ color: colors.primary }}>Cinema Hub</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
        style={{
          fontSize: '18px', color: darkMode ? '#aaa' : '#555',
          margin: '0 0 8px', fontWeight: '400',
        }}
      >
        Unforgettable cinematic experience
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45, ease: 'easeOut' }}
        style={{
          fontSize: '14px', color: darkMode ? '#888' : '#777',
          maxWidth: '500px', margin: '0 auto 36px', lineHeight: '1.6',
        }}
      >
        Book your tickets easily, choose your favorite seats, and enjoy the best movies with exclusive offers and reward points
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.55, ease: 'easeOut' }}
        style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
      >
        <motion.button
        onClick={() => navigate("/movies")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            backgroundColor: colors.primary, color: '#fff',
            border: 'none', borderRadius: '10px',
            padding: '14px 28px', cursor: 'pointer',
            fontWeight: '600', fontSize: '15px',
          }}
        >
          ✦ Get Started →
        </motion.button>

        <motion.button
        onClick={() => navigate("/movies")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            backgroundColor: 'transparent', color: colors.primary,
            border: `2px solid ${colors.primary}`, borderRadius: '10px',
            padding: '14px 28px', cursor: 'pointer',
            fontWeight: '600', fontSize: '15px',
          }}
        >
          Browse Movies
        </motion.button>
      </motion.div>
    </section>
  );
};

export default IntroHero;