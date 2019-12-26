<template>
  <div id="app" class="w-full min-h-screen mt-12 sm:mt-0 bg-gray-100">
    <Banner/>
    <div class="flex justify-center w-full">
      <InitiativeScreen/>
    </div>
  </div>
</template>

<script>
import Banner from './components/Banner.vue'
import InitiativeScreen from './components/InitiativeScreen.vue'

export default {
  name: 'app',
  components: {
    Banner,
    InitiativeScreen,
  }
}
</script>

<style>
@tailwind base;

@tailwind components;

@tailwind utilities;
</style>
