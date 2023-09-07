/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			screens: {
				base: '865px'
			},
			fontFamily: {
				playfair: ['Playfair Display']
			}
		}
	},
	plugins: []
};
