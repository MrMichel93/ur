/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Ancient Mystical Luxury Palette
        // Screen backgrounds - Deep, rich tones
        'mesopotamia': {
          'night': '#0f172a',      // Deep indigo night
          'dusk': '#1e293b',       // Slate dusk
          'twilight': '#334155',   // Medium slate
        },
        
        // Board and gaming surfaces - Warm, sandy tones (high contrast with dark screens)
        'desert': {
          'sand': '#fef3c7',       // Light warm sand
          'dune': '#fde68a',       // Golden sand
          'oasis': '#fcd34d',      // Rich golden
        },
        
        // Royal colors - Enhanced for the game
        royal: {
          blue: "#1e3a8a",         // Lapis Lazuli (existing)
          'lapis': '#1e40af',      // Deep blue for pieces
          'sapphire': '#2563eb',   // Bright blue
          gold: "#f59e0b",         // Gold highlights (existing)
          'amber': '#d97706',      // Deep amber
          'bronze': '#92400e',     // Bronze accent
        },
        
        // Player piece colors - High contrast with board
        player: {
          'light': '#1e40af',      // Deep blue (dark on light tiles)
          'light-glow': '#3b82f6', // Lighter blue for highlights
          'dark': '#991b1b',       // Deep red (dark on light tiles)
          'dark-glow': '#dc2626',  // Lighter red for highlights
        },
        
        // Special tile colors
        tile: {
          'normal': '#fde68a',     // Normal tile - golden sand
          'rosette': '#fbbf24',    // Rosette - brighter gold
          'war': '#fed7aa',        // War zone - orange tint
          'valid': '#dcfce7',      // Valid move - soft green
          'border': '#d97706',     // Tile borders - deep amber
        },
        
        // UI and text colors
        stone: {
          light: "#f3f4f6",        // Light stone (existing)
          dark: "#1f2937",         // Dark stone (existing)
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        },
        
        // Semantic colors
        'ancient': {
          'gold': '#f59e0b',
          'lapis': '#1e40af',
          'terracotta': '#ea580c',
          'cedar': '#92400e',
        }
      },
      
      // Shadows for depth
      boxShadow: {
        'ancient': '0 10px 40px -10px rgba(217, 119, 6, 0.3)',
        'board': '0 20px 50px -12px rgba(0, 0, 0, 0.5)',
        'piece': '0 4px 10px rgba(0, 0, 0, 0.3)',
        'glow': '0 0 20px rgba(245, 158, 11, 0.4)',
      },
    },
  },
  plugins: [],
}
