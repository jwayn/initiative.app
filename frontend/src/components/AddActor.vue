<template>
  <div class="w-full bg-white rounded p-4">

    <div class="flex justify-between mb-8">

      <div class="flex flex-wrap items-center">
        <p class="text-lg mr-4 mb-2">
          Add actor to encounter
        </p>

        <div v-if="$store.getters.isSignedIn">
          <button 
            title="Show new actor form"
            class="border-t border-l border-b border-green-700 py-1 px-2 rounded-l"
            :class="!showSavedActors ? 'bg-green-700 text-white' : 'text-green-700 bg-white'"
            @click.prevent="showSavedActors = false">
            New Actor
          </button>
          <button 
            title="Show saved actors"
            class="border border-green-700 py-1 px-2 rounded-r"
            :class="showSavedActors ? 'bg-green-700 text-white' : 'text-green-700 bg-white'"
            @click.prevent="showSavedActors = true">
            Saved Actors
          </button>
        </div>
      </div>

      <button @click="$emit('closeAddActor')" class="mb-1 flex align-start" title="Remove actor from combat">
        <svg class="text-gray-500 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"/>
        </svg>
      </button>
    </div>

    <!-- new actor form -->
    <form v-if="!showSavedActors">

      <!-- NPC & Num actors -->
      <div class="flex items-center justify-between">
        <!-- NPC checkbox -->
        <div class="mb-4 flex">
          <input
            @click="newActor.player_name = ''; numOfActorsToAdd = 1"
            class="shadow border rounded py-2 px-3 mr-2"
            id="initiativeAdvantage"
            type="checkbox"
            v-model="newActor.npc"
          />
          <label
            class="block text-gray-600 text-sm font-bold leading-none"
            for="initiativeAdvantage"
          >
            NPC?
          </label>
        </div>

        <!-- Number of actors to add -->
        <div v-if="newActor.npc" class="mr-2 sm:w-1/2">
          <label
            class="block text-gray-600 text-sm font-bold mb-2 leading-none"
            for="numActors"
          >
            Number of Actors to Add
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            min="1" max="10"
            id="numActors"
            type="number"
            v-model="numOfActorsToAdd"
          />
        </div>
      </div>

      <!-- Character Name -->
      <div class="mb-4">
        <label
          class="block text-gray-600 text-sm font-bold mb-2"
          :class="characterNameFailedValidation ? 'text-red-600' : ''"
          for="characterName"
        >
          Character Name (required)
        </label>
        <input
          @change="verifyForm"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          :class="characterNameFailedValidation ? 'border-red-600' : ''"
          id="characterName"
          type="text"
          placeholder="Character Name"
          v-model="newActor.actor_name"
        />
      </div>


      <!-- Player Name -->
      <div v-if="!newActor.npc" class="mb-4">
        <label
          class="block text-gray-600 text-sm font-bold mb-2"
          for="playerName"
        >
          Player Name
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="playerName"
          type="text"
          placeholder="Player Name"
          v-model="newActor.player_name"
        />
      </div>


      <!-- Image URL -->
      <div class="mb-4">
        <label class="block text-gray-600 text-sm font-bold mb-2" for="imageURL">
          Image URL
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="imageURL"
          type="text"
          placeholder="http://image.url/image.png"
          v-model="newActor.image_url"
        />
      </div>
      

      <!-- AC and HP -->
      <div class="mb-4 flex justify-between">
        <div class="mr-2 sm:w-1/2">
          <label
            class="block text-gray-600 text-sm font-bold mb-2 leading-none"
            for="armorClass"
          >
            AC
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="armorClass"
            type="number"
            v-model="newActor.armor_class"
          />
        </div>

        <div class="sm:w-1/2">
          <label
            class="block text-gray-600 text-sm font-bold mb-2 leading-none"
            for="hitPoints"
          >
            HP
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="hitPoints"
            type="number"
            v-model="newActor.total_hit_points"
          />
        </div>
      </div>
      

      <!-- Init mod and Init Advantage -->
      <div class="mb-4 flex justify-between items-center">
        <div class="mr-2 w-1/2">
          <label
            class="block text-gray-600 text-sm font-bold mb-2 leading-none"
            for="initiativeModifier"
          >
            Initiative Modifier
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="initiativeModifier"
            type="number"
            v-model="newActor.initiative_modifier"
          />
        </div>

        <div class="sm:w-1/2 sm:ml-4 flex items-center">
          <input
            class="shadow border rounded py-2 px-3 mr-2"
            id="initiativeAdvantage"
            type="checkbox"
            v-model="newActor.initiative_advantage"
          />
          <label
            class="block text-gray-600 text-sm font-bold leading-none"
            for="initiativeAdvantage"
          >
            Initiative Advantage
          </label>
        </div>
      </div>

      <!-- Color Picker -->
      <ColorPicker :selectedColor="newActor.accent_color" v-on:pickColor="pickColor" />
      
      <!-- Action buttons -->
      <div class="flex py-4" :class="$store.getters.isSignedIn ? 'justify-around' : 'justify-end'">
        
        <button @click.prevent="" v-if="$store.getters.isSignedIn" class="border border-green-700 bg-white text-green-700 hover:text-green-500 rounded px-2 py-1">
          Save Actor
        </button>

        <button @click.prevent="addActor" class="w-20 bg-green-700 hover:bg-green-500 text-white rounded px-2 py-1">
          Add
        </button>
      </div>

    </form>
    <!-- end new actor form -->

    <TrackerSavedActorsList v-else />

  </div>
</template>

<script>
import uuidv4 from 'uuid';
import TrackerSavedActorsList from './TrackerSavedActorsList';
import ColorPicker from './ColorPicker';

export default {
  components: {
    TrackerSavedActorsList,
    ColorPicker,
  },
  data() {
    return {
      newActor: {
        npc: false,
        actor_name: '',
        player_name: '',
        armor_class: '',
        total_hit_points: '',
        iniatitive_modifier: 0,
        initative_advantage: false,
        image_url: '',
        accent_color: '',
        initiative: null,
      },
      characterNameFailedValidation: false,
      showSavedActors: false,
      numOfActorsToAdd: 1,
    }
  },
  methods: {
    verifyForm: function() {
      return true;
    },
    addActor: function() {
      //eslint-disable-next-line
      console.log('Add button clicked');
      if(this.numOfActorsToAdd > 1) {
        for(let i = 0; i < this.numOfActorsToAdd; i++) {
          let actor = {...this.newActor};
          if(actor.total_hit_points) actor.current_hit_points = this.newActor.total_hit_points;
          actor.actor_name = this.newActor.actor_name + ` ${i + 1}`
          actor.id = uuidv4();
          this.$store.dispatch('addActor', actor)
        }
      } else {
        if(this.newActor.total_hit_points) this.newActor.current_hit_points = this.newActor.total_hit_points;
        this.newActor.id = uuidv4();
        this.$store.dispatch('addActor', this.newActor)
      }
    },
    pickColor(color) {
      this.newActor.accent_color = color;
    }
  },
}
</script>

<style>

</style>