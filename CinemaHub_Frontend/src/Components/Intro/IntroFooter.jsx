import React from 'react';
import { Clapperboard } from 'lucide-react';
import { useTheme } from "../../context/ThemeContext";

const IntroFooter = ({ darkMode }) => {
  const { colors } = useTheme();
  return (
    <footer style={{
      backgroundColor: darkMode ? '#1a1a1a' : '#fff1f0',
      borderTop: `1px solid ${darkMode ? '#333' : '#f0e0e0'}`,
      padding: '24px 32px',
      textAlign: 'center',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
        <Clapperboard size={18} color={colors.primary} />
        <span style={{ fontWeight: '700', fontSize: '16px', color: darkMode ? '#fff' : colors.primary }}>
          Cinema Hub
        </span>
      </div>
      <p style={{ margin: 0, fontSize: '12px', color: darkMode ? '#666' : '#aaa' }}>
        © {new Date().getFullYear()} Cinema Hub. All rights reserved.
      </p>
    </footer>
  );
};

export default IntroFooter;