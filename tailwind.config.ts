import type {Config} from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './i18n/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        sipanel: {
          orange: 'var(--color-orange-primary)',
          orangeHover: 'var(--color-orange-hover)',
          black: 'var(--color-black-primary)',
          deep: 'var(--color-black-deep)',
          surface: 'var(--color-gray-background)',
          gray: 'var(--color-gray-medium)'
        }
      },
      borderRadius: {
        sipanel: 'var(--radius-card)',
        button: 'var(--radius-button)'
      },
      boxShadow: {
        subtle: 'var(--shadow-subtle)',
        card: 'var(--shadow-card)'
      },
      maxWidth: {
        container: 'var(--container-max)'
      },
      fontFamily: {
        heading: 'var(--font-heading)',
        body: 'var(--font-body)'
      }
    }
  },
  plugins: []
};

export default config;
