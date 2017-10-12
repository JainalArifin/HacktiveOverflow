<template lang="html">
  <nav class="navbar navbar-inverse">
    <div class="container-fluid">
      <div class="navbar-header">
        <a class="navbar-brand" href="#">HactiveOverflow</a>
      </div>
      <ul class="nav navbar-nav navbar-right jarak-button">
        <li>
          <Login></Login>
        </li>
        <li>
            <button type="button" name="button" class=" btn btn-danger glyphicon glyphicon-remove" @click="removeUser"> Log Out</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import Login from '@/components/Login'
export default {
  components: {
    Login
  },
  data () {
    return {
      token: localStorage.getItem('token')
    }
  },
  methods: {
    Register () {
      this.$router.push('/register')
    },
    removeUser () {
      localStorage.removeItem('token')
      localStorage.removeItem('fbaccesstoken')
      this.$router.push('/')
    }
  },
  created () {
    if (this.token == null) {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="css">
.jarak-button{
  padding-top: 10px;
  padding-right: 10px;
}
</style>
