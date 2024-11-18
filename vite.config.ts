import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {fileURLToPath} from 'url';

export default defineConfig({
  resolve: {alias: [{find: 'src', replacement: fileURLToPath(new URL('./src', import.meta.url))}]},
  plugins: [react()]
});
