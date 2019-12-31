<template>
  <div class="bg-gray-100 w-full max-w-3xl mt-4 flex justify-center items-center flex-col">


    <transition name="fade">
      <!-- Actor list controls -->
      <div  v-if="!showActorAdd" class='w-full flex items-center justify-between flex-col sm:flex-row p-2'>

        <div class="flex justify-around flex-col sm:flex-row items-center flex-wrap mb-2">

          <div class="flex mb-4 sm:mb-0">
            <button
            class="py-1 px-3 rounded-l border-t border-l border-b border-green-700 bg-white"
            :class="$store.state.filter === 'all' ? 'bg-green-700 text-white' : 'text-green-700'"
            @click="$store.dispatch('updateFilter', 'all')"
            >
              All
            </button>
            <button
            class="py-1 px-3 border border-green-700 bg-white"
            :class="$store.state.filter === 'player' ? 'bg-green-700 text-white' : 'text-green-700'"
            @click="$store.dispatch('updateFilter', 'player')"
            >
              Player
            </button>
            <button 
            class="p-1 px-3 rounded-r border-t border-r border-b border-green-700 bg-white"
            :class="$store.state.filter === 'npc' ? 'bg-green-700 text-white' : 'text-green-700'"
            @click="$store.dispatch('updateFilter', 'npc')"
            >
              NPC
            </button>
          </div>

          <div class="mx-2 mb-4 sm:mb-0 relative">
            <button @click="showSortDropdown = !showSortDropdown" class="bg-green-700 rounded px-2 py-1 pr-8 text-white">Sort by: {{sortName}}</button>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-700"
            >
              <svg
                class="fill-current text-white h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
            <div v-if="showSortDropdown" class="rounded border border-green-600 bg-white flex flex-col items-start py-1 px-3 absolute">
              <button @click="$store.dispatch('updateSort', 'created'); showSortDropdown = false" class="text-green-700 hover:text-green-500 py-1">Created</button>
              <button @click="$store.dispatch('updateSort', 'updated'); showSortDropdown = false" class="text-green-700 hover:text-green-500 py-1">Updated</button>
              <button @click="$store.dispatch('updateSort', 'actor_name'); showSortDropdown = false" class="text-green-700 hover:text-green-500 py-1">Character Name</button>
              <button @click="$store.dispatch('updateSort', 'player_name'); showSortDropdown = false" class="text-green-700 hover:text-green-500 py-1">Player Name</button>
            </div>
          </div>

        </div>

        <button @click.prevent="showActorAdd = !showActorAdd" class="px-2 py-1 bg-green-700 hover:bg-green-600 text-white rounded self-end sm:self-auto mx-2 sm:mx-0">
          {{showActorAdd ? 'Cancel' : 'Create'}}
        </button>

      </div>
    </transition>

    <transition name="fade" mode="out-in">
      <!-- Create actor form -->
      <div v-if="showActorAdd" key="createActorForm" class="w-full mx-12 sm:max-w-2xl bg-white rounded px-2 px-4 py-4 shadow">
        <div class="flex justify-between">
          <p>Add an Actor</p>
          <button @click="showActorAdd = false" class="mb-1" title="cancel add actor">
            <svg class="text-gray-500 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"/>
            </svg>
          </button>
        </div>
        <form class="my-4">

          <div class="mb-4 flex">
            <input class="shadow border rounded py-2 px-3 mr-2" id="initiativeAdvantage" type="checkbox" v-model="actor.npc">
            <label class="block text-gray-600 text-sm font-bold leading-none" for="initiativeAdvantage">
              NPC?
            </label>
          </div>
          <div class="mb-4">
            <label class="block text-gray-600 text-sm font-bold mb-2" :class="characterNameFailedValidation ? 'text-red-600' : ''" for="characterName">
              Character Name (required)
            </label>
            <input @change="verifyForm" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" :class="characterNameFailedValidation ? 'border-red-600' : ''" id="characterName" type="text" placeholder="Character Name" v-model="actor.characterName">
          </div>

          <div v-if="!actor.npc" class="mb-4">
            <label class="block text-gray-600 text-sm font-bold mb-2" for="playerName">
              Player Name
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="playerName" type="text" placeholder="Player Name" v-model="actor.playerName">
          </div>

          <div class="mb-4">
            <label class="block text-gray-600 text-sm font-bold mb-2" for="imageURL">
              Image URL
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="imageURL" type="text" placeholder="http://image.url/image.png" v-model="actor.imageURL">
          </div>

          <div class="mb-4 flex justify-between">
            <div class="mr-2 sm:w-1/2">
              <label class="block text-gray-600 text-sm font-bold mb-2 leading-none" for="armorClass">
                AC
              </label>
              <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="armorClass" type="number" v-model="actor.armorClass">
            </div>

            <div class="sm:w-1/2">
              <label class="block text-gray-600 text-sm font-bold mb-2 leading-none" for="hitPoints">
                HP
              </label>
              <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="hitPoints" type="number" v-model="actor.hitPoints">
            </div>
          </div>

          <div class="mb-4 flex justify-between items-center">
            <div class="mr-2 w-1/2">
              <label class="block text-gray-600 text-sm font-bold mb-2 leading-none" for="initiativeModifier">
                Initiative Modifier
              </label>
              <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="initiativeModifier" type="number" v-model="actor.initiativeModifier">
            </div>

            <div class="sm:w-1/2 sm:ml-4 flex items-center">
              <input class="shadow border rounded py-2 px-3 mr-2" id="initiativeAdvantage" type="checkbox" v-model="actor.initiativeAdvantage">
              <label class="block text-gray-600 text-sm font-bold leading-none" for="initiativeAdvantage">
                Initiative Advantage
              </label>
            </div>
          </div>

          <div class="mb-4 flex justify-between">
            <div class="mr-2 sm:w-1/2">
              <label class="block text-gray-600 text-sm font-bold mb-2 leading-none" title="Comma separated if multiple classes" for="charClass">
                Class(es)
              </label>
              <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="class" type="text" v-model="actor.charClass">
            </div>

            <div class="sm:w-1/2">
              <label class="block text-gray-600 text-sm font-bold mb-2 leading-none" for="race">
                Race
              </label>
              <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="race" type="text" v-model="actor.race">
            </div>
          </div>

          <div class="mb-4 flex justify-between">
            <div class="w-1/2 mr-2">
              <label class="block text-gray-600 text-sm font-bold mb-2 leading-none" for="level">
                Level
              </label>
              <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="level" type="number" v-model="actor.level">
            </div>

            <div class="w-1/2">
              <label class="block text-gray-600 text-sm font-bold mb-2 leading-none" for="level">
                Alignment
              </label>
              <div class="inline-block relative w-full">
                <select class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="alignment" v-model="actor.alignment">
                  <option value="LG">Lawful Good</option>
                  <option value="NG">Neutral Good</option>
                  <option value="CG">Chaotic Good</option>
                  <option value="LN">Lawful Neutral</option>
                  <option value="N">True Neutral</option>
                  <option value="CN">Chaotic Neutral</option>
                  <option value="LE">Lawful Evil</option>
                  <option value="NE">Neutral Evil</option>
                  <option value="CE">Chaotic Evil</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
          </div>


          <!-- Attributes -->
          <div class="mb-4">
            <p class="text-gray-600 text-sm font-bold w-full border-b border-gray-300 mb-3 mt-8">Attributes</p>

            <div class="flex justify-between mb-2">
              <div class="w-1/2 mr-2">
                <label class="block text-gray-600 text-sm font-bold mb-2 leading-none" for="strength">
                  STR
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="strength" type="number" v-model="actor.strength">
              </div>

              <div class="w-1/2 mr-2">
                <label class="block text-gray-600 text-sm font-bold mb-2 leading-none" for="dexterity">
                  DEX
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="dexterity" type="number" v-model="actor.dexterity">
              </div>

              <div class="w-1/2">
                <label class="block text-gray-600 text-sm font-bold mb-2 leading-none" for="constitution">
                  CON
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="constitution" type="number" v-model="actor.constitution">
              </div>
            </div>

            <div class="flex justify-between">
              <div class="w-1/2 mr-2">
                <label class="block text-gray-600 text-sm font-bold mb-2 leading-none" for="intelligence">
                  INT
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="intelligence" type="number" v-model="actor.intelligence">
              </div>

              <div class="w-1/2 mr-2">
                <label class="block text-gray-600 text-sm font-bold mb-2 leading-none" for="wisdom">
                  WIS
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="wisdom" type="number" v-model="actor.wisdom">
              </div>

              <div class="w-1/2">
                <label class="block text-gray-600 text-sm font-bold mb-2 leading-none" for="charisma">
                  CHA
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="charisma" type="number" v-model="actor.charisma">
              </div>
            </div>

          </div>
          <!-- End Stats -->

          <!-- Passives -->
          <div class="mb-4">
            <p class="text-gray-600 text-sm font-bold w-full border-b border-gray-300 mb-3 mt-8">Passives</p>

            <div class="flex justify-between mb-2">
              <div class="w-1/2 mr-2">
                <label class="block text-gray-600 text-sm font-bold mb-2 leading-none" for="passivePerception">
                  Perception
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="passivePerception" type="number" v-model="actor.passivePerception">
              </div>

              <div class="w-1/2 mr-2">
                <label class="block text-gray-600 text-sm font-bold mb-2 leading-none" for="passiveInvestigation">
                  Investigation
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="passiveInvestigation" type="number" v-model="actor.passiveInvestigation">
              </div>

              <div class="w-1/2">
                <label class="block text-gray-600 text-sm font-bold mb-2 leading-none" for="passiveInsight">
                  Insight
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="passiveInsight" type="number" v-model="actor.passiveInsight">
              </div>
            </div>

          </div>
          <!-- End Passives -->

          <ColorPicker :selectedColor="actor.accentColor" v-on:pickColor="pickColor" />


          <div class="w-full flex justify-center mt-8">
            <button @click.prevent="createActor" class="bg-green-700 rounded text-white px-2 py-1 w-64" :class="saveActorFailed ? 'bg-red-600' : ''">
              Add
            </button>
          </div>
        </form>
      </div>
    

      <!-- Actor list -->
      <div v-if="!savedActorsLoading && !showActorAdd" key="actorList" class="w-full">
        <div v-if="filteredActors.length > 0">
          <transition-group name="fade-right" mode="out-in">
            <ManageActorSingle v-for="actor in filteredActors" :actor="actor" :key="actor.id" v-on:deleteActor="deleteActor" />
          </transition-group>
        </div>

        <p v-else>No actors here...</p>
      </div>
    </transition>

    <Loader v-if="savedActorsLoading" />
  </div>
</template>

<script>
import ColorPicker from './ColorPicker';
import ManageActorSingle from './ManageActorSingle';
import Loader from './Loader';

import { mapState, mapGetters } from 'vuex';

export default {
  components: {
    ColorPicker,
    Loader,
    ManageActorSingle,
  },
  data() {
    return {
      actor: {
        npc: false,
        characterName: '',
        playerName: '',
        initiative: '',
        initiativeModifier: '',
        initiativeAdvantage: false,
        armorClass: '',
        hitPoints: '',
        charClass: '',
        race: '',
        level: '',
        alignment: '',
        strength: '',
        dexterity: '',
        constitution: '',
        intelligence: '',
        wisdom: '',
        charisma: '',
        passivePerception: '',
        passiveInvestigation: '',
        passiveInsight: '',
        accentColor: '',
        imageURL: '',
      },
      filterActors: 'all',
      sortActors: 'created',
      showActorAdd: false,
      saveActorFailed: false,
      characterNameFailedValidation: false,
      showSortDropdown: false,
    }
  },
  watch: {
    filterActors: function(newFilter, oldFilter) {
      if(newFilter !== oldFilter) {
        this.$store.dispatch('filterActors', newFilter);
      }
    },
    sortActors: function(oldSort, newSort) {
      if(newSort !== oldSort) {
        this.$store.dispatch('sortActors', newSort);
      }
    }
  },
  computed: {
    ...mapState([
      'savedActors',
      'filteredActors',
      'savedActorsLoading',
      'filterActorsBy',
      'sortActorsBy',
    ]),
    ...mapGetters([
      'isSignedIn',
    ]),
    sortName: function() {
      let sortReturn = '';

      switch(this.$store.state.sort) {
        case 'updated':
          sortReturn = 'Updated';
          break;
        case 'player_name':
          sortReturn = 'Player Name'
          break;
        case 'actor_name':
          sortReturn = 'Character Name';
          break;
        default:
          sortReturn = 'Created';
          break;
      }

      return sortReturn;
    },
  },
  methods: {
    createActor: function() {
      this.verifyForm();
      if(!this.characterNameFailedValidation) {
        this.$store.dispatch('saveActor', this.actor).then(res => {
          if(res) {
            this.clearForm();
          } else {
            this.saveActorFailed = true;
          }
        })
      }
    },
    deleteActor: function(actor_id) {
      this.$store.dispatch('deleteActor', actor_id);
    },
    verifyForm: function() {
      if(this.actor.characterName.trim().length < 1) {
        this.characterNameFailedValidation = true;
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        this.characterNameFailedValidation = false;
      }
    },
    pickColor: function(color) {
      this.actor.accentColor = color;
    },
    clearForm: function() {
      this.actor.npc = false;
      this.actor.characterName = '';
      this.actor.playerName = '';
      this.actor.initiative = '';
      this.actor.initiativeModifier = '';
      this.actor.initiativeAdvantage = false;
      this.actor.armorClass = '';
      this.actor.hitPoints = '';
      this.actor.charClass = '';
      this.actor.race = '';
      this.actor.level = '';
      this.actor.alignment = '';
      this.actor.strength = '';
      this.actor.dexterity = '';
      this.actor.constitution = '';
      this.actor.intelligence = '';
      this.actor.wisdom = '';
      this.actor.charisma = '';
      this.actor.passivePerception = '';
      this.actor.passiveInvestigation = '';
      this.actor.passiveInsight = '';
      this.actor.accentColor = '';
      this.actor.imageURL = '';
      this.showActorAdd = false;
    },
  },
  mounted() {
    if(this.isSignedIn) {
      //eslint-disable-next-line
      console.log(this.isSignedIn);
      this.$store.dispatch('retrieveSavedActors');
    }
  },
};
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: all .3s ease;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
    transform: translateY(50px)
  }

  .fade-right-enter-active, .fade-right-leave-active {
    transition: all .3s ease;
  }

  .fade-right-enter, .fade-right-leave-to {
    opacity: 0;
    transform: translateX(50px)
  }

  .fade-right-move {
    transition: transform 0.3s;
  }


</style>
