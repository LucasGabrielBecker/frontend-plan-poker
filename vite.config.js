import { defineConfig, Alias } from 'vite'
import preact from '@preact/preset-vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [preact()],
	minify: true,
})
