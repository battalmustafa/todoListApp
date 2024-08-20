module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-to-right': 'linear-gradient(to right, #1a2b3d, #476570)', // Modern purple gradient
      },
      colors: {
        'button-contrast': '#0af7cc', 
        'status-todo': '#ff8c00',
        'status-inprogress': '#00bfff',
        'status-done': '#0af7cc',
        'status-unknown': '#dddddd',

      },
    },
  },
  plugins: [],
};
