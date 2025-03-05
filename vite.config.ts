import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/setupTests.ts',
        include: ['src/__tests__/**/*.{test,spec}.{ts,tsx}'],
        coverage: {
            reporter: ['text', 'html', 'lcov'],
            exclude: ['node_modules/', '__tests__'],
        },
    },
})
