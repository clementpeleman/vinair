import {nextui} from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    "./sections/**/*.{js,ts,jsx,tsx, mdx}",
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
  	extend: {
		saturate: {
			125: '1.25',
			75: '.75',
		  },
  		boxShadow: {
  			custom: '0 0 15px rgba(0, 0, 0, 0.02), 0 0 15px rgba(0, 0, 0, 0.02)'
  		},
  		fontFamily: {
  			sans: ["var(--font-sans)"],
  			mono: ["var(--font-mono)"],
  			mundo: ["var(--font-mundo)"],
  			milo: ["var(--font-milo)"]
  		},
  		animation: {
  			pulseSaturation: 'pulseSaturation 2s infinite'
  		},
  		keyframes: {
  			pulseSaturation: {
  				'0%': {
  					filter: 'saturate(1)'
  				},
  				'25%': {
  					filter: 'saturate(1.1)'
  				},
  				'50%': {
  					filter: 'saturate(1.2)'
  				},
  				'75%': {
  					filter: 'saturate(1.05)'
  				},
  				'100%': {
  					filter: 'saturate(1)'
  				}
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		}
  	}
  },
  darkMode: ["class", 'class'],
  plugins: [nextui({
    themes: {
      light: {
        colors: {
			primary: "#ee5830",
        //   primary: "#e54726",
          deepPink: "#fd4b8b",
          deepBlue: "rgba(137, 121, 236)"
        }
      }
    }
  }),
      require("tailwindcss-animate")
],
}
