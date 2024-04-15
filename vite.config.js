import {defineConfig, loadEnv} from 'vite';
import {resolve, join} from 'path';
import vue from '@vitejs/plugin-vue';
import postcssImport from 'postcss-import';
import postcssSimpleVars from 'postcss-simple-vars';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import fullReload from 'vite-plugin-full-reload';


const postcssConfig = {
  plugins: [
    postcssImport(),
    postcssSimpleVars(),
    tailwindcss,
    autoprefixer(),
  ],
};

export default defineConfig((mode) => {
  // @ts-ignore
  const env = loadEnv(mode, process.cwd(), '')
  const INPUT_DIR = './assets/vite_assets';
  const OUTPUT_DIR = './static/vite_bundles';

  return {
    plugins: [
      vue(),
      fullReload(['**/templates/**/*.html']),
    ],
    resolve: {
      alias: {
        '@': resolve(INPUT_DIR),
      },
    },
    root: resolve(INPUT_DIR),
    base: '/static/',
    css: {
      postcss: postcssConfig,
    },
    server: {
      origin: env.DJANGO_VITE_DEV_SERVER_ORIGIN,
      host: env.DJANGO_VITE_DEV_SERVER_HOST,
      port: env.DJANGO_VITE_DEV_SERVER_PORT,
    },
    assetsInclude: ['**/*.woff2', '**/*.woff', '**/*.ttf'],
    build: {
      manifest: true,
      emptyOutDir: true,
      outDir: resolve(OUTPUT_DIR),
      rollupOptions: {
        input: {
          main: join(INPUT_DIR, '/js/app.ts'),
          css: join(INPUT_DIR, '/css/app.css.js'),
        },
      },
    },
  };
});
