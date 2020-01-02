<template>
  <div class="rounded p-4 bg-white w-full">
    <table class="w-full">
      <thead>
        <tr>
          <th class="px-4 py-2">Character Name</th>
          <th class="px-4 py-2">Initiative</th>
        </tr>
      </thead>
      <tbody>
        <ActorInitRow v-for="(actor, actorIndex) in $store.state.currentInitiativeTracker.actors" :actor="actor" :key="actor.id" :class="actorIndex % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'" />
      </tbody>
    </table>

    <div class="w-full flex justify-end mt-8 mb-2">
      <button @click="$emit('hideStartInit')" class="rounded border border-green-700 text-green-700 px-2 py-1">
        Cancel
      </button>

      <button @click="startInit" class="ml-2 rounded bg-green-700 hover:bg-green-500 text-white px-2 py-1">
        Start Encounter
      </button>
    </div>
  </div>
</template>

<script>
import ActorInitRow from './ActorInitRow';

export default {
  components: {
    ActorInitRow,
  },
  methods: {
    startInit: function() {
      this.$emit('hideStartInit');
      this.$store.dispatch('changeInitiative', 'start');
    },
  },
};
</script>

<style>
</style>
