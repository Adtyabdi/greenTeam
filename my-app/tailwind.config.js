// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         background: "var(--background)",
//         foreground: "var(--foreground)",
//       },
//     },
//   },
//   plugins: [],
// };


/** @type {import('tailwindcss').Config} */
module.exports = {
  // Konten yang mencakup semua file di folder app, pages, dan components
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  // Penambahan tema custom
  theme: {
    extend: {
      // Definisikan warna custom menggunakan CSS variables
      colors: {
        background: "var(--background)", // Mengambil nilai dari variabel CSS --background
        foreground: "var(--foreground)", // Mengambil nilai dari variabel CSS --foreground
      },
    },
  },

  // Plugin tambahan (optional)
  plugins: [],
};
