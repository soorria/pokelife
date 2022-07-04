const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      zIndex: {
        fab: 100,
        dialog: 200,
      },
    },
  },
  plugins: [
    require('daisyui'),
    plugin(({ addVariant }) => {
      addVariant('hocus', ['&:hover', '&:focus'])
      addVariant('hocus-within', ['&:hover', '&:focus-within'])
      addVariant('group-hocus', [
        ':merge(.group):hover &',
        ':merge(.group):focus &',
      ])
      addVariant('active', ['&[data-active]', '&:active'])
    }),
  ],
  daisyui: {
    themes: ['dracula'],
  },
}
