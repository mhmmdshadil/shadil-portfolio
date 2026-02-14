/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                serif: ['"Playfair Display"', 'serif'],
                sans: ['"Inter"', 'sans-serif'],
            },
            colors: {
                'pastel-peach': '#FCE7E4',
                'pastel-blue': '#E4F1FC',
                'pastel-purple': '#F4E4FC',
            }
        },
    },
    plugins: [],
}
