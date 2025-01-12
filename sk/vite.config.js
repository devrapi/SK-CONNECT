import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/Components/App.jsx',
                'resources/js/MainApp.jsx',
            ],
            refresh: true, // Enables live reload
        }),
        react({
            include: /\.(js|jsx)$/, // Fixed regular expression for React files
        }),
    ],
});
