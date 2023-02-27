<template>
  <div>
    <h1>Formularz komentarzy</h1>
    <CommentForm @newComment="addComment" />
    <hr />
    <h1>Komentarze</h1>
    <CommentList :comments="comments" />
  </div>
</template>

<script>
import axios from 'axios'
import CommentForm from '~/components/CommentForm.vue'
import CommentList from '~/components/CommentList.vue'

export default {
  name: 'Index',
  components: {
    CommentForm,
    CommentList,
  },
  data() {
    return {
      comments: [],
    }
  },
  async created() {
    const { data: comments } = await axios.get('/comments')
    this.comments = comments
  },
  methods: {
    async addComment(comment) {
      const { data: newComment } = await axios.post('/comments', comment)
      this.comments.unshift(newComment)
    },
  },
}

/*

W pliku tym importujemy komponenty CommentForm i CommentList, które połączymy w celu umożliwienia użytkownikom dodawania i wyświetlania komentarzy. W sekcji data inicjujemy tablicę comments jako pusty tablicę, którą wypełnimy komentarzami z serwera.

W metodzie created pobieramy dane z serwera za pomocą metody GET z użyciem axiosa i przypisujemy je do właściwości comments. W metodzie addComment tworzymy nowy komentarz za pomocą metody POST i dodajemy go na początek listy za pomocą metody unshift.

W szablonie mamy dwie sekcje: CommentForm, która zawiera formularz umożliwiający użytkownikom dodawanie nowych komentarzy, oraz CommentList, która wyświetla wszystkie komentarze znajdujące się w tablicy comments.

*/
</script>
