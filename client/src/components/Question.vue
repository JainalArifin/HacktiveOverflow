<template lang="html">
  <div class="container">
    <div class="">
      <div class="panel panel-primary  tambahTodoStyle" style="padding:10px">
        <h4>Question</h4>
        <!-- <div class="panel-heading"> -->
          <label>Judul</label>
          <input type="text" v-model="postData.judul" class="form-control" placeholder="Judul ...">
        <!-- </div> -->
        <div class="panel-content">
          <label>Content</label>
          <input type="text" v-model="postData.content" class="form-control" placeholder="Content...">
        </div><br>
        <div>
          <button type="button" name="button" class="btn btn-success glyphicon glyphicon-plus" @click="tambah"> Tambah Question</button>
        </div>
      </div>

    </div>
    <div class="panel-question">
      <div class="panel panel-primary" v-for="question in allQuestion">
        <div class="panel-heading">
          <h4>{{question.author.username}}</h4>
          <p>{{question.judul}}</p>
        </div>
        <div class="panel-body">
          <p>{{question.content}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sweetalert from 'sweetalert'
export default {
  data () {
    return {
      allQuestion: [],
      postData: {
        judul: '',
        content: ''
      }
    }
  },
  methods: {
    getQuestion () {
      this.$http.get('/question')
      .then((dataQuestion) => {
        this.allQuestion = dataQuestion.data
      })
    },
    tambah () {
      var self = this
      this.$http.post(`http://localhost:3000/question`, {
        judul: self.postData.judul,
        content: self.postData.content
      }, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then((response) => {
        console.log(response, '<------')
        this.allQuestion.push(response.data)
        this.$router.push('/')
      })
      .catch((err) => {
        console.log(err)
        sweetalert('anda belum login', 'silahkan login terlebih dahulu')
      })
    }
  },
  created () {
    this.getQuestion()
  }
}
</script>

<style lang="css">
.panel-question{
  margin-top: 30px;
}
</style>
