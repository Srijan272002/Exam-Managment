// Color palette for the admin dashboard
export const colors = {
    // Primary colors
    primary: '#4361ee',
    primaryLight: '#738eef',
    primaryDark: '#2c41c2',
    
    // Secondary colors
    secondary: '#f72585',
    secondaryLight: '#f85a9f',
    secondaryDark: '#d01a6c',
    
    // Neutrals
    background: '#f8f9fa',
    card: '#ffffff',
    text: '#1a1a2e',
    textSecondary: '#4e4e6a',
    textTertiary: '#9698a3',
    border: '#e9ecef',
    divider: '#f1f3f5',
    
    // Status colors
    success: '#38b000',
    warning: '#ffaa00',
    error: '#e63946',
    info: '#4cc9f0',
    
    // Chart colors
    chart: ['#4361ee', '#f72585', '#4cc9f0', '#38b000', '#ffaa00']
  };
  
  // Theme configuration
  export const theme = {
    colors,
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
      xxl: 48,
    },
    borderRadius: {
      sm: 4,
      md: 8,
      lg: 12,
      xl: 16,
      round: 9999,
    },
    shadows: {
      sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
      },
      md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      },
      lg: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
      },
    },
  };