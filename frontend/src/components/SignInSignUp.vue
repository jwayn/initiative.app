<template>
  <div class="w-full max-w-md">
      <form action="submit" class="flex flex-col justify-center w-full max-w-md m-4">
        <input type="email" class="p-3 my-2 rounded shadow w-5/6" v-model="email">
        <input type="password" class="p-3 my-2 rounded shadow w-5/6" v-model="password">
        <div class="flex justify-around my-2">
          <button>Sign Up</button>
          <button @click.prevent="login">Sign In</button>
        </div>
      </form>
  </div>
</template>

<script>
export default {
  name: 'signin',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    login() {
      this.$store.dispatch('retrieveToken', {
        email: this.email,
        password: this.password,
      // eslint-disable-next-line no-unused-vars
      }).then(res => {
        this.$router.push({path: 'tracker'})
      })
    }
  }
}
</script>

<style>

</style>