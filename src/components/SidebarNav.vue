<template>
  <v-card class="pa-5" color="grey lighten-3" flat>
    <h3>By Genre</h3>
    <v-card elevation="12" width="256">
      <v-navigation-drawer floating permanent>
        <v-list dense rounded>
          <v-list-item link @click="setCurrentGenre('All')">
            <v-list-item-content>
              <v-list-item-title>ALL</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-for="(genre, id) in genres" :key="id" link @click="setCurrentGenre(genre)" :class="{active: genre === selectedGenre}">
            <v-list-item-content>
              <v-list-item-title>{{ genre }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'SidebarNav',
  computed: {
    ...mapState({
      genres: state => state.genres,
      selectedGenre: state => state.selectedGenre
    })
  },
  methods: {
    ...mapActions([
      'getMovies',
      'setSelectedGenre'
    ]),
    setCurrentGenre(genre) {
      const query = {
        genre,
        page: 1
      }
      this.setSelectedGenre(genre)
      this.$router.push({name: 'home', query})
    }
  }
}
</script>
<style scoped>
  .active {
    background: lightblue;
  }
</style>
