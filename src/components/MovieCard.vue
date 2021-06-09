<template>
  <v-card @click="openMoviePage" class="movie-card">
    <div class="movie-header">
      <span>{{movie.title}}</span><span>({{new Date(movie.release_date).getFullYear()}})</span>
    </div>
    <div class="movie-overview">{{movie.overview}}</div>
    <div class="movie-genres">
      <v-chip v-for="genre in movie.genres" :key="genre">{{genre}}</v-chip>
    </div>
  </v-card>
</template>

<script>

export default {
  name: 'MovieCard',
  props: {
    movie: {}
  },
  methods: {
    openMoviePage() {
      window.open(this.movie.url, '_blank')
    }
  }
}
</script>

<style scoped>
  .v-chip {
    margin: 1px;
  }
  .movie-card {
    flex-basis: 31%;
    min-width: 50px;
    margin: 1.1%;
    padding: 15px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #efefef;
  }

  .movie-header {
    display: flex;
    flex-direction: row;
    font-weight: 600;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    padding-bottom: 15px;
  }

  .movie-overview {
    padding: 15px 5px 0;
    height: 100%;
  }
  .movie-genres {
    padding: 15px 0 0;
  }

</style>
