/* JS */
// Babel Polyfills (Enable use of modern javascript)
import 'core-js/stable'
import 'regenerator-runtime/runtime'
// esm-bundlers includes the compiler, the compiler is needed for in-DOM templates or templates via inline JavaScript strings
// See: https://v3.vuejs.org/guide/installation.html#explanation-of-different-builds
import { createApp } from 'vue/dist/vue.esm-bundler.js'
import DemoComponent from './components/DemoComponent.vue'
import '@/scss/app.scss'

// Typescript syntax is supported!, rename this file to app.js if you don't want to use typescript
const message: string = 'Typescript and Vite are working!'
// Vite is working!
console.log(message)

const Root = {
  delimiters: ['[[', ']]'],
}

// Mount Vue application
const app = createApp(Root)
app.component('demo-component', DemoComponent)
app.config.globalProperties.window = window
app.mount('#vueApp')

// On window load add the class load to the body
window.addEventListener('load', () => {
  document.body.classList.add('loaded')
})
