<template>
  <div v-if="!savedActorsLoading" key="actorList" class="w-full">
    <div v-if="savedActors.length > 0">
      <transition-group name="fade-right" mode="out-in">
        <ManageActorSingle v-for="actor in savedActors" :trackerList="true" :actor="actor" :key="actor.id" />
      </transition-group>
    </div>

    <p v-else>No actors here...</p>
  </div>

  <Loader v-else />
</template>

<script>
import { mapState } from 'vuex';

import Loader from './Loader';
import ManageActorSingle from './ManageActorSingle';

export default {
  data() {
      return {

      }
  },
  components: {
    Loader,
    ManageActorSingle,
  },
  computed: {
    ...mapState([
      'savedActors',
      'filteredActors',
      'savedActorsLoading',
      'filterActorsBy',
      'sortActorsBy',
    ]),
  }
}
</script>

<style></style>
