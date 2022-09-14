/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				"redhat-mono": ["Red Hat Mono", "monospace"]
			},
			animation: {
				blink: "blink 1s linear infinite",
				"shake-0.5": "shake-0.5 1s linear infinite",
				"shake-1": "shake-1 1s linear infinite",
				"shake-10": "shake-10 1s linear infinite"
			},
			keyframes: {
				blink: {
					"0%, 100%": { opacity: 0 },
					"50%": { opacity: 1 }
				},
				"shake-0.5": {
					"0%, 100%": { transform: "rotate(0turn)" },
					"25%": { transform: "rotate(0.005turn)" },
					"75%": { transform: "rotate(-0.005turn)" }
				},
				"shake-1": {
					"0%, 100%": { transform: "rotate(0turn)" },
					"25%": { transform: "rotate(0.01turn)" },
					"75%": { transform: "rotate(-0.01turn)" }
				},
				"shake-10": {
					"0%, 100%": { transform: "rotate(0turn)" },
					"25%": { transform: "rotate(0.1turn)" },
					"75%": { transform: "rotate(-0.1turn)" }
				}
			}
		}
	},
	plugins: []
};
