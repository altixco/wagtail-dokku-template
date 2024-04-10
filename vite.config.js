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
  const env = loadEnv(mode, process.cwd(), '');

  const INPUT_DIR = './assets';
  const OUTPUT_DIR = './static/vite_bundles';

  return {
    plugins: [
      vue(),
      fullReload(['**/templates/**/*.html']),
    ],
    resolve: {
      alias: {
        '@': resolve(INPUT_DIR),
        'vue': 'vue/dist/vue.esm-bundler.js',
      },
    },
    root: resolve(INPUT_DIR),
    base: '/static/',
    css: {
      postcss: postcssConfig,
    },
    server: {
      host: env.DJANGO_VITE_DEV_SERVER_HOST,
      port: 5173,
    },
    build: {
      manifest: true,
      emptyOutDir: true,
      outDir: resolve(OUTPUT_DIR),
      rollupOptions: {
        input: {
          home: join(INPUT_DIR, '/js/app.ts'),
          css: join(INPUT_DIR, '/css/app.css.js'),
        },
      },
    },
  };
});
