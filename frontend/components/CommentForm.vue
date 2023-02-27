<template>
  <!-- Będzie on odpowiedzialny za wyświetlanie FORMULARZA, za pomocą którego użytkownik będzie mógł DODAĆ NOWY KOMENTARZ. -->
  <form @submit.prevent="addComment">
    <div class="form-group">
      <label for="message">Wiadomość</label>
      <textarea
        id="message"
        v-model="comment.message"
        class="form-control"
      ></textarea>
    </div>
    <div class="form-group">
      <label for="author">Autor</label>
      <input
        id="author"
        v-model="comment.author"
        class="form-control"
        type="text"
      />
    </div>
    <button type="submit" class="btn btn-primary">Dodaj komentarz</button>
  </form>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      comment: {
        message: '',
        author: '',
      },
    }
  },
  methods: {
    async addComment() {
      try {
        // const response = await axios.post('/comments', this.comment)
        const response = await axios.post(
          `${process.env.backendUrl}/comments`,
          this.comment
        )
        this.$emit('comment-added', response.data)
        this.comment.message = ''
        this.comment.author = ''
      } catch (error) {
        console.log(error)
      }
    },
  },
}

/*

W powyższym kodzie definiujemy formularz za pomocą tagu <form>, a następnie dodajemy pola tekstowe, w których użytkownik może wpisać swoją treść i imię/nazwisko.

W sekcji script importujemy moduł axios, który pozwoli nam na wywoływanie zapytań API. W sekcji data definiujemy obiekt comment, który będzie zawierał informacje o nowym komentarzu.

W metodzie addComment wywołujemy zapytanie POST do API, przekazując dane z formularza. Następnie emitujemy zdarzenie comment-added z dodanym komentarzem, aby odświeżyć listę komentarzy. W przypadku błędu wyświetlamy informację w konsoli.

Ten komponent można wykorzystać w widoku pages/index.vue, aby umożliwić użytkownikowi dodawanie nowych komentarzy.

*/
</script>
