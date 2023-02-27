<template>
  <!-- Ten komponent będzie odpowiedzialny za WYŚWIETLANIE LISTY KOMENTARZY. -->
  <div>
    <h2>Lista komentarzy:</h2>
    <div v-if="loading" class="spinner-border" role="status">
      <span class="sr-only">Ładowanie...</span>
    </div>
    <div v-else>
      <div v-for="(comment, index) in comments" :key="index" class="card mb-3">
        <div class="card-header">{{ comment.author }} napisał:</div>
        <div class="card-body">
          <p class="card-text">{{ comment.message }}</p>
          <p class="card-text">
            <small class="text-muted">{{ comment.createdAt }}</small>
          </p>
        </div>
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
        this.comments = response.data
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

Kod JavaScript znajduje się w tagu <script>. Zdefiniowane są dwie zmienne, comments oraz loading. Zmienna loading określa, czy trwa ładowanie danych z API. Zmienna comments zawiera tablicę komentarzy, pobieranych z API za pomocą funkcji getComments().

Funkcja getComments() jest wywoływana podczas utworzenia komponentu. Za pomocą modułu Axios, pobieramy dane z backendu i ustawiamy zmienną comments na wartość zwróconą z API. W razie błędu wyświetlamy błąd w konsoli, a na końcu ustawiamy zmienną loading na false, aby zakończyć animację ładowania.

W tagu <style> można dodać niestandardowe style CSS do komponentu.

*/
</script>

<style>
/* Add custom styles here */
</style>
