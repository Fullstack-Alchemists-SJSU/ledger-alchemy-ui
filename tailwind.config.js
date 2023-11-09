/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,tsx}'],
	theme: {
		container: {
			center: true,
		},
		extend: {
			colors: {
				"dark-purple": "#080325",
				"light-white": "rgba(255,255,255,0.17)",
			  },
			boxShadow: {
				bottom: '0px 3px 0px #e5e7eb',
			},
			colors: {
				'dark-purple': '#080325',
			},
		},
	},
	plugins: [],
};
