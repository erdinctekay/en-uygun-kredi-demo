import { defineConfig } from 'vite'

import path from 'path'

import autoprefixer from 'autoprefixer'
import strip from '@rollup/plugin-strip'
import htmlMinifier from 'html-minifier'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		// strip({
		// 	// Remove console.log statements and comments
		// 	functions: ['console.log'],
		// 	inline: true,
		// 	comments: true,
		// 	include: ['**/*.js', '**/*.html', '**/*.css', '**/*.vue'],
		// 	exclude: 'node_modules/**',
		// }),
		// {
		// 	name: 'html-minifier',
		// 	transformIndexHtml(html) {
		// 		return htmlMinifier.minify(html, {
		// 			collapseWhitespace: true,
		// 			removeComments: true,
		// 			minifyCSS: true,
		// 		})
		// 	},
		// },
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'~': path.resolve(__dirname, 'node_modules/'),
		},
	},
	css: {
		postcss: {
			plugins: [
				autoprefixer({}), // options can be added here
			],
		},
	},
})
