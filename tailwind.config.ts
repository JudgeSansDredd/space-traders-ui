import flowbite from 'flowbite/plugin';
import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [flowbite],
  darkMode: 'media',
} satisfies Config;
