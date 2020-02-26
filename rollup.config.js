import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import resolve from 'rollup-plugin-node-resolve';
import svelte from 'rollup-plugin-svelte';
import {terser} from 'rollup-plugin-terser';
import replace from '@rollup/plugin-replace';

const production = !process.env.ROLLUP_WATCH;

import apiConfig from './dppm_api_config.json';
export default {
  input: 'src/main.js',
  output:
      {sourcemap: true, format: 'iife', name: 'app', file: 'public/bundle.js'},
  plugins:
      [
        svelte({
          // enable run-time checks when not in production
          dev: !production,
          // we'll extract any component CSS out into
          // a separate file  better for performance
          css: css => {
            css.write('public/bundle.css');
          }
        }),
        replace(Object.keys(apiConfig).reduce((n, k) => (n[k] = JSON.stringify(apiConfig[k]), n), {})),

        // If you have external dependencies installed from
        // npm, you'll most likely need these plugins. In
        // some cases you'll need additional configuration 
        // consult the documentation for details:
        // https://github.com/rollup/rollup-plugin-commonjs
        resolve({
          browser: true,
          dedupe: importee =>
            importee === 'svelte' || importee.startsWith('svelte/')
        }),
        commonjs(),

        // Watch the `public` directory and refresh the
        // browser on changes when not in production
        !production && livereload('public'),

        // If we're building for production (npm run build
        // instead of npm run dev), minify
        production && terser()
      ],
  watch: {clearScreen: false},

  // Throw error on warning in production
  onwarn: warning => {
    if (production && !/A11y:/.test(warning.message)) { throw new Error(warning.message); }
  }
};
