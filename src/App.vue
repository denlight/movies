<template>
  <v-app>
    <v-row class="body-container">

      <v-col cols="3">
        <SidebarNav/>
      </v-col>
 
      <v-col cols="9">
        <router-view/>
      </v-col>

    </v-row>
  </v-app>
</template>

<script>

import {mapActions} from 'vuex'
import SidebarNav from './components/SidebarNav.vue'

export default {
  name: 'App',
  components: {
    SidebarNav
  },
  methods: {
    ...mapActions([
      'init'
    ])
  },
  async mounted() {
    await this.init()
  }
};
</script>

<style scoped>
.body-container {
  position: relative;
  max-height: 100vh;
}
.col {
  max-height: 100%;
}
</style>
