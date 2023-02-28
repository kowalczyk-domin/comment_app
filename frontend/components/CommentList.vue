<template>
  <!-- Ten komponent będzie odpowiedzialny za WYŚWIETLANIE LISTY KOMENTARZY. -->
  <div class="kontener">
    <div class="container">
      <h2 class="d-inline-block pr-3">Komentarze wspierających</h2>
      <span class="badge badge-primary">{{ comments.length }}</span>
    </div>
    <div v-if="loading" class="spinner-border" role="status">
      <span class="sr-only">Ładowanie...</span>
    </div>
    <div v-else>
      <div
        v-for="(comment, index) in comments"
        :key="index"
        class="card mb-3 p-3 rounded"
      >
        <div class="d-flex">
          <div
            class="rounded-circle bg-secondary d-flex align-items-center justify-content-center mr-3"
            style="width: 40px; height: 40px"
          >
            <span class="text-light">{{
              comment.author.charAt(0).toUpperCase()
            }}</span>
          </div>
          <div>
            <h5 class="card-title mb-0">
              {{ comment.author }}
            </h5>

            <p class="card-subtitle text-muted">
              {{
                comment.daysAgo === 0
                  ? 'Dzisiaj'
                  : `${comment.daysAgo} dni temu`
              }}
            </p>
          </div>
        </div>

        <p class="card-text mt-3">{{ comment.message }}
        <div class="comment-actions">
          <span class="mr-3">Odpowiedz</span>
          <span>Edytuj</span>
        </div>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      comments: [],
      loading: true,
    }
  },
  async created() {
    await this.getComments()
  },
  methods: {
    async getComments() {
      try {
        const response = await axios.get(`${process.env.backendUrl}/comments`)
        this.comments = response.data.map((comment) => {
          const timeDiff = Date.now() - new Date(comment.createdAt).getTime()
          const daysAgo = Math.floor(timeDiff / 86400000)
          return { ...comment, daysAgo }
        })
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },
  },
}
/*
  W tej części kodu, definiujemy szablon HTML za pomocą tagu <template>. Wyświetlany jest nagłówek "Lista komentarzy", a następnie tworzony jest kontener, w którym wyświetlają się komentarze. Dodana została również prosta animacja ładowania, wyświetlająca się podczas pobierania komentarzy.
  Zdefiniowane są dwie zmienne, comments oraz loading. Zmienna loading określa, czy trwa ładowanie danych z API. Zmienna comments zawiera tablicę komentarzy, pobieranych z API za pomocą funkcji getComments().
  Funkcja getComments() jest wywoływana podczas utworzenia komponentu. Za pomocą modułu Axios, pobieramy dane z backendu i ustawiamy zmienną comments na wartość zwróconą z API. W razie błędu wyświetlamy błąd w konsoli, a na końcu ustawiamy zmienną loading na false, aby zakończyć animację ładowania.
  
  */
</script>

<style>
h2 {
  font-size: 20px;
}

.container {
  max-width: 52%;
  margin-bottom: 10px;
}

.comment-container {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: solid;
  border-width: 10px;
}

.author-circle {
  width: 40px;
  height: 40px;
  background-color: #ccc;
  border-radius: 50%;
  display: inline-block;
  margin-right: 10px;
}

.comment-author {
  display: inline-block;
  font-weight: bold;
}

.comment-date {
  display: block;
  font-size: 0.8rem;
  color: #aaa;
  margin-bottom: 10px;
}

.comment-text {
  margin-top: 10px;
}
.comment-count {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.comment-count__circle {
  width: 30px;
  height: 30px;
  background-color: rgb(255, 0, 0);
  color: white;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  font-size: 1.2rem;
  font-weight: bold;
}

.badge {
  font-size: 1.2rem;
  margin-left: -15px;
  border-radius: 0.9rem;
  background-color: #fff;
  color: rgb(15, 104, 229);
  border: solid;
  border-width: 2px;
}

.card {
  box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.3);
  margin-bottom: 2rem !important;
  max-width: 50%;
  margin: 0 auto;
  border-radius: 1rem !important;
}

.card:last-child {
  margin-bottom: 0;
}

.card-subtitle {
  margin-top: 2px;
  margin-left: 1px;
}

.comment-actions {
  font-size: 0.8rem;
  margin-top: -10px;
  margin-bottom: -10px;
  text-align: right;
}

.comment-actions span {
  color: #007bff;
  cursor: pointer;
}

.comment-actions span:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .container{
    margin-left: -60px;
  }
  .card{
    max-width: 120%;
    margin-left: -45px;
  }
}

</style>
