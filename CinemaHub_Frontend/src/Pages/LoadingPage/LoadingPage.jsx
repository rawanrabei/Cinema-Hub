import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Clapperboard } from 'lucide-react';
import { useTheme } from "../../context/ThemeContext";

const LoadingPage = () => {
  const navigate = useNavigate();
  const { isDarkMode, colors } = useTheme();
  const [progress, setProgress] = useState(0);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const timer = setTimeout(() => {
      setExit(true);
      setTimeout(() => navigate('/intro'), 600);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <AnimatePresence>
      {!exit && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            position: 'fixed', inset: 0,
            backgroundColor: isDarkMode ? '#0f172a' : '#fdf6ed',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '32px',
            zIndex: 9999,
          }}
        >
          {/* Pulsing circle behind icon */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.1, 0.3] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                width: '120px', height: '120px',
                borderRadius: '50%',
                backgroundColor: colors.primary,
              }}
            />
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.2, 0.5] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
              style={{
                position: 'absolute',
                width: '90px', height: '90px',
                borderRadius: '50%',
                backgroundColor: colors.primary,
              }}
            />

            {/* Icon */}
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: '80px', height: '80px',
                backgroundColor: isDarkMode ? '#1e293b' : '#fee2e2',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 30px rgba(220,38,38,0.35)',
                position: 'relative', zIndex: 1,
              }}
            >
              <Clapperboard size={38} color={colors.primary} />
            </motion.div>
          </div>

          {/* Brand name */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{ textAlign: 'center' }}
          >
            <h1 style={{
              fontSize: '32px', fontWeight: '700',
              color: isDarkMode ? '#ffffff' : '#111', margin: '0 0 6px',
            }}>
              Cinema <span style={{ color: colors.primary }}>Hub</span>
            </h1>
            <p style={{ fontSize: '14px', color: isDarkMode ? '#cbd5e1' : '#999', margin: 0 }}>
              Preparing your experience...
            </p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ width: '200px' }}
          >
            <div style={{
              width: '100%', height: '4px',
              backgroundColor: isDarkMode ? '#334155' : '#f0d0d0',
              borderRadius: '99px', overflow: 'hidden',
            }}>
              <motion.div
                style={{
                  height: '100%',
                  width: `${progress}%`,
                  backgroundColor: colors.primary,
                  borderRadius: '99px',
                  transition: 'width 0.1s linear',
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingPage;