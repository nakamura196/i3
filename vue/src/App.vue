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
