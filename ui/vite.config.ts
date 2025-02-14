/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
    },
    test: {
        globals: true,
        environment: 'happy-dom',
        setupFiles: './test/setup.ts',
        testTransformMode: {
            web: ['.jsx', '.tsx', '.ts'],
        },
    },
});
