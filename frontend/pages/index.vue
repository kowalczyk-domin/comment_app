<template>
  <div>
    <div class="navbar">
      <div class="navbar-left">
        <ul class="nav">
          <li class="nav-item">
            <a href="#" class="nav-link">Opis projektu</a>
          </li>
          <li class="nav-item"><a href="#" class="nav-link">Cele</a></li>
          <li class="nav-item"><a href="#" class="nav-link">Aktualności</a></li>
          <li class="nav-item">
            <a href="#" class="nav-link active">Komentarze</a>
          </li>
        </ul>
      </div>
      <div class="navbar-right">
        <button class="navbar-button">Wspieram projekt</button>
      </div>
    </div>
    <div class="comment-form">
      <CommentForm @newComment="addComment" />
    </div>
    <div class="parent-component">
      <div class="comment-list">
        <CommentList :comments="comments" />
      </div>
    </div>
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

W pliku tym importujemy komponenty CommentForm i CommentList, które połączymy w celu umożliwienia użytkownikom dodawania i wyświetlania komentarzy. W sekcji data inicjujemy tablicę comments jako pustą tablicę, którą wypełnimy komentarzami z serwera.

W metodzie created pobieramy dane z serwera za pomocą metody GET z użyciem axiosa i przypisujemy je do właściwości comments. W metodzie addComment tworzymy nowy komentarz za pomocą metody POST i dodajemy go na początek listy za pomocą metody unshift.

W szablonie mamy dwie sekcje: CommentForm, która zawiera formularz umożliwiający użytkownikom dodawanie nowych komentarzy, oraz CommentList, która wyświetla wszystkie komentarze znajdujące się w tablicy comments.

*/
</script>

<style>
.parent-component {
  display: flex;
  justify-content: center;
}

.comment-list {
  width: 80%;
  margin-top: 50px;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
  height: 50px;
  padding: 0 20px;
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.1);
}

.navbar-left {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: 50px;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
}

.navbar-item {
  font-size: 1.2rem;
  font-weight: 400;
  color: #333;
  cursor: pointer;
  display: inline-block;
  margin-right: 20px;
}

.navbar-item:hover {
  color: #000;
}

.navbar-right {
  display: flex;
  align-items: center;
  margin-right: 90px;
}

.navbar-button {
  color: #fff;
  font-size: 19px;
  font-weight: 200;
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  cursor: pointer;
  background-color: #007bff !important;
  background: linear-gradient(to right, #0260c4, #6a9cf2);
  border-color: #0057b3;
  box-shadow: 0 2px 5px rgba(0, 123, 255, 0.5);
  transition: all 0.3s ease;
}

.navbar-button:focus,
.navbar-button:hover {
  background: linear-gradient(to right, #6a9cf2, #0260c4);
  border-color: #0057b3;
}

.nav {
  list-style: none;
  display: inline-block;
  margin: 0;
  padding: 0;
}

.nav-item {
  display: inline-block;
  margin-right: 20px;
  margin-top: 5px;
}

.nav-link {
  color: #333;
  text-decoration: none;
}

.nav-link.active {
  color: #0f68e5;
  border-bottom: 4px solid #0f68e5;
}

@media (max-width: 768px) {
  .navbar-left {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 0;
  }

  .nav-item {
    display: inline-block;
    margin: 0;
    font-size: 16px;
  }
  .nav-link.active {
    /* color: #0f68e5; */
    font-weight: 600;
    color: #000;
    border-bottom: none;
  }
  .navbar-right {
    margin-right: 40px;
  }
}
</style>
