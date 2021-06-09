<template>
  <v-container class="movies-container">
    <v-row class="movies-list-header">
        <span>Genre: <span class="genre">{{ genre }}</span></span>
        <v-text-field
          label="Items per page"
          filled
          dense
          type="number"
          rounded
          hide-details="auto"
          class="shrink"
          @change="handleChange"
          @click="handleChange"
          v-model="itemsPerPage"></v-text-field>
    </v-row>
    <v-row class="pagination">
      <v-pagination v-model="selectedPage" :value="selectedPage" :length="Number(pageCount)" total-visible="9" circle @input="setPageNum"></v-pagination>
    </v-row>
    <v-row class="movie-list">
      <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
    </v-row>
  </v-container>
</template>

<script>
import MovieCard from '../components/MovieCard'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'Home',

  data () {
    return {
      debounce: null
    }
  },

  components: {
    MovieCard
  },
  computed: {
    ...mapState({
      genre: state => state.selectedGenre || 'All',
    }),
    ...mapGetters({
      movies: 'getPage',
      pageCount: 'pageCount'
    }),
    itemsPerPage: {
      get () {
        return this.$store.state.itemsPerPage
      },
      set (newValue) {
        if (!isNaN(newValue))
          return this.$store.dispatch('setItemsPerPage', newValue)
      }
    },
    selectedPage: {
      get () {
        return this.$store.state.selectedPage * 1
      },
      set (newValue) {
          return this.$store.dispatch('setSelectedPage', newValue)
      }
    }
  },
  methods: {
    ...mapActions(['setItemsPerPage']),
    handleChange () {
      clearTimeout(this.debounce)
      this.debounce = setTimeout(() => {
        this.setItemsPerPage(this.itemsPerPage)
      }, 750)
    },
    setPageNum() {
      const query = {
        page: this.selectedPage
      }
      if(this.$route.query.genre) query.genre = this.$route.query.genre
      this.$router.push({name: 'home', query})
    }
  }
}
</script>

<style scoped>
.movies-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.movies-list-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 15px 20px;
  background: #eee;
  width: 100%;
  align-items: center;
  max-height: 82px;
}
.movies-list-header span {
  font-size: 20px;
}
.movies-list-header span.genre {
  font-weight: 600;
}
.movie-list {
  overflow-y: auto;
}
.pagination {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 10px;
  max-height: 64px;
}
.v-input {
  width: 128px;
}
.v-input >>> input {
  text-align: center
}
</style>
