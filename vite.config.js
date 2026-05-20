import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // Tambahkan ini

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'), // Ini memberitahu Vite bahwa @ = folder src
        },
    },
})