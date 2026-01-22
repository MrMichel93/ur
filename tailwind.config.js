/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Cosmic color palette inspired by deep space and ancient Mesopotamian astronomy
        cosmic: {
          void: '#0a0e1a', // Deep space background
          nebula: '#1a1f35', // Dark nebula
          star: '#e8d5b7', // Warm starlight
          'star-glow': '#ffd89b', // Star glow effect
          constellation: '#4a5568', // Dim star connections
        },
        celestial: {
          sun: '#f6b93b', // Ancient sun gold
          moon: '#c9d1d9', // Silvery moonlight
          venus: '#f9ca24', // Venus/Morning star
          mars: '#c0392b', // Mars red
        },
        mystical: {
          ether: '#667eea', // Mystical purple ether
          'ether-light': '#764ba2', // Light ether
          ritual: '#c79100', // Ritualistic gold
          'ritual-glow': '#e5b800', // Glowing ritual gold
        },
        // Semantic game colors
        player: {
          light: '#ffd89b', // Warm golden starlight
          dark: '#667eea', // Cool mystical purple
        },
        tile: {
          normal: '#1a1f35', // Dark nebula
          rosette: '#2d3748', // Darker with gold accent
          war: '#1e2738', // War zone subtle difference
          safe: '#1c2333', // Safe zones
        },
        // Keep some legacy colors for backwards compatibility
        royal: {
          blue: "#1e3a8a",
          gold: "#f59e0b",
        },
        stone: {
          light: "#f3f4f6",
          dark: "#1f2937",
        }
      },
      fontFamily: {
        'display': ['Cinzel', 'serif'], // Ancient/classical display font
        'body': ['Quicksand', 'sans-serif'], // Modern, rounded body font
      },
      fontSize: {
        'cosmic-title': ['3rem', { lineHeight: '1', letterSpacing: '0.05em' }],
        'cosmic-subtitle': ['1.5rem', { lineHeight: '1.2', letterSpacing: '0.1em' }],
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(135deg, #0a0e1a 0%, #1a1f35 50%, #2d1b4e 100%)',
        'star-glow': 'radial-gradient(circle, rgba(255, 216, 155, 0.3) 0%, transparent 70%)',
        'rosette-glow': 'radial-gradient(circle, rgba(199, 145, 0, 0.4) 0%, transparent 70%)',
      },
      boxShadow: {
        'cosmic': '0 0 20px rgba(255, 216, 155, 0.3)',
        'cosmic-lg': '0 0 30px rgba(255, 216, 155, 0.5)',
        'mystic': '0 0 20px rgba(102, 126, 234, 0.4)',
        'mystic-lg': '0 0 30px rgba(102, 126, 234, 0.6)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
      },
    },
  },
  plugins: [],
}
