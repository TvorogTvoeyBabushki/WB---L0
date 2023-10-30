import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
	base: '/WB-L0/',
	resolve: {
		alias: {
			'@': resolve(__dirname, './src')
		},
		extensions: ['.js']
	},
	server: {
		cors: true,
		port: 7000,
		open: true
	}
})
