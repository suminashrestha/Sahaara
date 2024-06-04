/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#4181B8' ,
        btnColor: '#275C8A',
        // secondary: ,
      },
      boxShadow: {
        'floating-light': '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
        'floating': '0 20px 25px rgba(0, 0, 0, 0.15), 0 10px 10px rgba(0, 0, 0, 0.05)',
        'floating-deep': '0 25px 50px rgba(0, 0, 0, 0.25), 0 12px 15px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};