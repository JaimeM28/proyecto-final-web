import { defineConfig, loadEnv } from 'vite';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id: string) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '');
        return path.resolve(__dirname, 'src/assets', filename);
      }
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const frontendUrl = env.FRONTEND_URL || 'http://localhost';

  let frontendHost = 'localhost';

  try {
    frontendHost = new URL(frontendUrl).hostname;
  } catch {
    frontendHost = 'localhost';
  }

  return {
    plugins: [
      figmaAssetResolver(),
      react(),
      tailwindcss(),
    ],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },

    assetsInclude: ['**/*.svg', '**/*.csv'],

    server: {
      host: '0.0.0.0',
      port: 5173,
      allowedHosts: [
        'localhost',
        frontendHost,
      ],
    },
  };
});