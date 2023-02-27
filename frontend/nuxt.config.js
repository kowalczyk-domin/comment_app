export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'frontend',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
  ],
  axios: {
    baseURL: process.env.backendUrl || 'http://localhost:5000', // adres API backendu ?? chyba 5000

    // baseURL: 'http://localhost:3001',

    /*
    Obiekt axios definiuje konfigurację dla biblioteki Axios, która jest używana do wysyłania zapytań HTTP do backendu. W tym przypadku, konfiguracja baseURL jest ustawiona na adres URL backendu (http://localhost:5000).
    */
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  env: {
    backendUrl: 'http://localhost:5000',
    /*
    Obiekt env definiuje zmienne środowiskowe, które są dostępne w kodzie frontendu. W tym przypadku, zmienna backendUrl jest ustawiona na ten sam adres URL backendu (http://localhost:5000).
    */
  },
  /*
  Oba obiekty mają związek z backendem, ale są używane w różnych kontekstach. Obiekt axios jest używany przez bibliotekę Axios do wysyłania zapytań HTTP do backendu. Obiekt env jest używany przez kod frontendu, aby uzyskać dostęp do zmiennej środowiskowej backendUrl i skontaktować się z backendem.
  */
}
