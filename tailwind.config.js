/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,tsx}'],
	theme: {
		container: {
			center: true,
		},
		extend: {
			boxShadow: {
				bottom: '0px 3px 0px #e5e7eb',
			},
		},
	},
	plugins: [],
};
