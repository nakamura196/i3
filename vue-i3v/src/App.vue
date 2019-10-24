<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>
        <span>IIIF Viewers</span>
      </v-toolbar-title>
  
    </v-app-bar>

    <v-content>
      <HelloWorld/>
    </v-content>

    <v-footer
      class="py-5"
    >
      <v-col
        class="text-center"
        cols="12"
      >
        <a href="https://researchmap.jp/nakamura.satoru/?lang=english">Satoru Nakamura</a>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  data: () => ({
    //
  }),
};
</script>
