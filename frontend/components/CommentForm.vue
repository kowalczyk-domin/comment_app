<template>
  <!-- Będzie on odpowiedzialny za wyświetlanie FORMULARZA, za pomocą którego użytkownik będzie mógł DODAĆ NOWY KOMENTARZ. -->

  <div class="comment-form-container">
    <h1>Dodaj komentarz</h1>
    <form @submit.prevent="addComment">
      <div class="form-group author">
        <input
          id="author"
          v-model="comment.author"
          class="form-control"
          type="text"
          placeholder="Imię"
        />
      </div>
      <div class="form-group">
        <textarea
          id="message"
          v-model="comment.message"
          class="form-control"
          placeholder="Komentarz"
        ></textarea>
      </div>

      <button type="submit" class="btn btn-primary">Dodaj</button>
    </form>
  </div>
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
        if (!this.comment.author || !this.comment.message) {
          alert('Proszę wypełnić wszystkie pola')
          return
        }
        // const response = await axios.post('/comments', this.comment)
        const response = await axios.post(
          `${process.env.backendUrl}/comments`,
          this.comment
        )
        // this.$emit('comment-added', response.data)
        this.$emit('comment-created', response.data)
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

*/
</script>

<style>
.comment-form-container {
  max-width: 800px;
  margin: 0 auto;
  text-align: right;
  margin-top: 80px;
}

.comment-form-container h1 {
  float: left;
  font-size: 20px;
  padding-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
  width: 800px;
  display: flex;
  align-items: center;
}

.form-group.author:before {
  content: '';
  display: block;
  width: 55px;
  height: 45px;
  border-radius: 50%;
  background-color: #ccc;
}

.form-group.author input {
  margin-left: 75px;
  /* margin-right: 10px; */
}

.form-control {
  border-radius: 0.7rem;
  border-color: #ccc;
  box-shadow: 0 6px 6px rgba(0, 0, 0, 0.1);
  border: solid 2px;
  margin-left: 120px;
}

.btn {
  border-radius: 1rem;
  width: 100px;
  box-shadow: 0 6px 6px rgba(0, 0, 0, 0.1);
}

.btn-primary {
  background-color: #007bff !important;
  background: linear-gradient(to right, #0260c4, #6a9cf2);
  border-color: #0057b3;
  box-shadow: 0 2px 5px rgba(0, 123, 255, 0.5);
  transition: all 0.3s ease;
}

.btn-primary:focus,
.btn-primary:hover {
  background: linear-gradient(to right, #6a9cf2, #0260c4);
  border-color: #0057b3;
}

.btn-primary.right {
  background-color: #0b3d91;
}

@media (max-width: 768px) {
  .comment-form-container {
    margin-top: 20px;
  }
  .comment-form-container h1 {
    margin-left: 30px;
  }
  .form-group {
    margin-bottom: 15px;
    width: 780px;

    margin-left: -90px;
    display: flex;
    align-items: center;
  }
  .form-group.author:before {
    display: none;
  }
  .form-group.author input {
    margin-left: 120px;
    /* margin-right: 10px; */
  }
  .form-control {
    box-shadow: 0 6px 6px rgba(0, 0, 0, 0.1) !important;
    border: solid 2px cornflowerblue;
  }
  .btn {
    margin-right: 80px;
    box-shadow: 0 6px 6px rgba(0, 0, 0, 0.1) !important;
  }
}
</style>
