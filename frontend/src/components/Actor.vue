<template>
  <div class="m-2 rounded shadow bg-gray-200">

    <!-- health indicator -->
    <div class="h-1 rounded-t bg-red-600">
      <div class="bg-green-600 h-full rounded-t" :style="{width: this.healthWidth + '%'}">
      </div>
    </div>
    
    <!-- rest of actor -->
    <div
      class="flex flex-row p-3 rounded-b"
      :class="actor.accentColor ? `border-2 border-${actor.accentColor}` : 'border border-gray-400'"
    >
      <div class="flex flex-col w-full">
        <div class="flex flex-row">
          <div
            class="bg-gray-700 rounded-full w-16 h-16 flex items-center justify-center mr-4 min-w-16"
          >
            <svg
              class="text-white fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path
                d="M4 22a8 8 0 1 1 16 0H4zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6z"
              />
            </svg>
          </div>
          <div class="flex flex-col flex-grow">
            <div class="flex justify-between pb-1">
              <span class="font-medium text-gray-800 text-lg">{{actor.characterName}}</span>
              <span class="font-light text-gray-600 text-lg self-end">{{actor.playerName}}</span>
              <button @click="$emit('deleteActor', index)">
                <svg class="text-gray-500 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"/>
                </svg>
              </button>
            </div>
            <div class="my-1 text-sm sm:self-end">
              <div class="flex flex-row sm:flex-col flex-wrap justify-between sm:justify-start">
                <div class="sm:text-right">
                  <span class="font-thin text-gray-600 mr-1">Per.</span><span class="text-gray-800">{{actor.passivePerception}}</span>
                </div>
                <div class="sm:text-right">
                  <span class="font-thin text-gray-600 mr-1">Inv.</span><span class="text-gray-800">{{actor.passiveInvestigation}}</span> 
                </div>
                <div class="sm:text-right">
                  <span class="font-thin text-gray-600 mr-1">Ins.</span><span class="text-gray-800">{{actor.passiveInsight}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-1 flex flex-row justify-between">
          <div>
            <span class="text-gray-700 text-xs">Level {{actor.level}} {{actor.alignment}} {{actor.race.charAt(0).toUpperCase() + actor.race.substring(1)}} {{actor.class.length == 1 ? actor.class[0] : actor.class.join('/')}}</span>
          </div>
          <div>
            <span class="mr-1 font-light text-gray-600">AC</span>
            <span class="mr-2">{{actor.armorClass}}</span>
            <button @click="showHealthModal = !showHealthModal">
              <span class="mr-1 font-light text-gray-600">HP</span>
              <span>{{actor.currentHitPoints}}</span><span class="font-light text-gray-600">/</span><span>{{actor.totalHitPoints}}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      showHealthModal: false,
    }
  },
  props: {
    actor: Object,
    index: Number
  },
  methods: {
    alterHealth: function() {
      //eslint-disable-next-line
      this.actor.currentHitPoints -= 5;
    }
  },
  computed: {
    healthWidth: function() {
      return Math.ceil((this.actor.currentHitPoints / this.actor.totalHitPoints) * 100);
    },
  }
};
</script>

<style>
  .min-w-16 {
    min-width: 4rem;
  }
</style>
