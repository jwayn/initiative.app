<template>
  <div class="w-full max-w-xs">
  <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 my-4" @submit.prevent="handleFormSubmit">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
        Email
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" v-model="email">
    </div>
    <div v-if="showSignup" class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
        Username
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" v-model="username">
    </div>
    <div :class="showSignup ? 'mb-4' : 'mb-6'">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Password
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" v-model="password">
    </div>
    <div v-if="showSignup" class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Verify Password
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" v-model="verifyPassword">
    </div>
    <div class="flex items-center justify-around">
      <a v-if="!showSignup" class="font-light text-green-700 border border-green-700 py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer" @click.prevent="showSignup = !showSignup">Sign Up</a>
      <a v-if="showSignup" class="font-light text-green-700 border border-green-700 py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer" @click.prevent="showSignup = !showSignup">Sign In</a>
      <button v-if="showSignup" class="bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Sign Up
      </button>
      <button v-if="!showSignup" class="bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Sign In
      </button>
    </div>
    <div class="flex justify-center mt-6">
      <a v-if="!showSignup" class="align-baseline font-bold text-sm text-green-700 hover:text-green-500" href="#">
        Forgot Password?
      </a>
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
      username: '',
      password: '',
      verifyPassword: '',
      showSignup: false,
    }
  },
  methods: {
    login() {
      this.$store.dispatch('retrieveToken', {
        email: this.email,
        password: this.password,
      }).then(() => {
        this.$router.push({path: 'tracker'});
      })
    },
    signUp() {
      this.$store.dispatch('signUp', {
        email: this.email,
        username: this.username,
        password: this.password,
        
      }).then(() => {
        this.$router.push({path: 'tracker'});
      })
    },
    verifySignup() {
      if(this.password === this.verifyPassword) {
        return true;
      }
    },
    handleFormSubmit() {
      !this.showSignup ? this.login() : this.signUp();
    }
  }
}
</script>

<style>

</style>