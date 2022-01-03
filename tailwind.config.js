module.exports = {
	mode: "jit",
	purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			fontFamily: {
				fira: "Fira Sans",
				lato: "Lato",
				sans: "Lato",
			},
			textColor: {
				primary: "#34495E",
				secondary: "#557392",
			},
			backgroundColor: {
				primary: "#34495E",
				secondary: "#557392",
				navbar: "#042541",
			},
			borderColor: {
				navbar: "#042541",
			},
			width: {
				128: "600px",
				card: "300px",
			},
			height: {
				card: "500px",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
