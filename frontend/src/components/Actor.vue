<template>
  <div class="my-5 cursor-pointer">
    <div v-if="index==0 && $store.state.currentInitiativeTracker.started">
      <span class="ml-3 text-lg text-gray-500 font-light">
          Current
      </span>
    </div>
    <div v-if="index==1 && $store.state.currentInitiativeTracker.started" class="mt-5">
      <span class="ml-3 text-lg text-gray-500 font-light">
          Up Next
      </span>
    </div>
    <div v-if="index==2 && $store.state.currentInitiativeTracker.started" class="mt-5">
      <span class="ml-3 text-lg text-gray-500 font-light">
          Coming Up
      </span>
    </div>
    <div 
      class="m-2 rounded shadow"
      :class="this.checkSavedActor.accent_color ? `bg-${this.checkSavedActor.accent_color.split('-')[0]}-100` : 'bg-gray-200'"
      :id="`index-${index}`"
    >
      <!-- health indicator -->
      <div v-if="this.checkSavedActor.total_hit_points" class=" h-6 rounded-t bg-red-600 relative">
        <div v-if="this.checkSavedActor.total_hit_points" class="absolute w-full flex justify-center">
          <button @click="showHealthModal = !showHealthModal">
            <span class="text-white">{{actor.current_hit_points}}</span><span class="font-light text-white">/</span><span class="text-white">{{checkSavedActor.total_hit_points}}</span>
          </button>
          <div v-if="showHealthModal" class="health-modal bg-white absolute shadow p-2 rounded">
              <input v-model="healthAmountToChange" class="w-full shadow mb-1 px-2" type="number">
              <div class="flex justify-between m-2">
                <button @click="damage" class="border border-red-600 text-red-600 rounded px-1">Damage</button>
                <button @click="heal" class="border border-green-600 text-green-600 rounded px-1">Heal</button>
              </div>
          </div>
        </div>
        <div class="bg-green-600 h-full animate-width flex justify-center" :class="this.healthWidth < 100 ? 'rounded-tl' : 'rounded-t'" :style="{width: this.healthWidth + '%'}"></div>
      </div>
      
      <!-- rest of actor -->
      <div
        class="flex flex-row p-3 rounded-b"
        :style="{
          borderLeft: this.checkSavedActor.accent_color ? `4px solid ${colors[this.checkSavedActor.accent_color.split('-')[0]][this.checkSavedActor.accent_color.split('-')[1]]}` : ''}">
        <div class="w-full flex">
          <div class="flex flex-col flex-grow">
            <div class="flex flex-row">
              <div
                class="rounded-full w-16 h-16 flex items-center justify-center mr-4 min-w-16 bg-center bg-cover shadow"
                :class="this.checkSavedActor.accent_color ? `bg-${this.checkSavedActor.accent_color}` : 'bg-gray-700' "
                :style="{backgroundImage: this.checkSavedActor.image_url ? `url(${this.checkSavedActor.image_url})` : ''}"
              >
                <svg v-if="!this.checkSavedActor.npc && !this.checkSavedActor.image_url"
                  :class="this.checkSavedActor.accent_color && this.checkSavedActor.accent_color.split('-')[1] < 400 ? 'text-gray-700' : `text-white` "
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

                <svg v-if="this.checkSavedActor.npc && !this.checkSavedActor.image_url"
                  :class="this.checkSavedActor.accent_color && this.checkSavedActor.accent_color.split('-')[1] < 400 ? 'text-gray-700' : `text-white` "
                  class="text-white fill-current"
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  width="24" 
                  height="24"
                >
                  <path d="M18 18v3a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-3H3a1 1 0 0 1-1-1v-5C2 6.477 6.477 2 12 2s10 4.477 10 10v5a1 1 0 0 1-1 1h-3zM7.5 14a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm9 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                </svg>
              </div>
              <div class="flex flex-col flex-grow">
                <div class="flex justify-between pb-1">
                  <div class="flex flex-wrap">


                    <span class="text-lg font-bold text-gray-800" :class="checkSavedActor.initiative ? 'pr-2' : ''">{{checkSavedActor.initiative}}</span>
                    
                    <span v-if="this.actor.is_linked && isSignedIn" class="flex items-center mr-1 text-gray-600">
                      <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                        <path d="M18.364 15.536L16.95 14.12l1.414-1.414a5 5 0 1 0-7.071-7.071L9.879 7.05 8.464 5.636 9.88 4.222a7 7 0 0 1 9.9 9.9l-1.415 1.414zm-2.828 2.828l-1.415 1.414a7 7 0 0 1-9.9-9.9l1.415-1.414L7.05 9.88l-1.414 1.414a5 5 0 1 0 7.071 7.071l1.414-1.414 1.415 1.414zm-.708-10.607l1.415 1.415-7.071 7.07-1.415-1.414 7.071-7.07z"/>
                      </svg>
                    </span>

                    <span v-if="this.actor.is_linked && !isSignedIn" class="flex items-center mr-1 text-gray-600">
                      <svg  class="fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path d="M17.657 14.828l-1.414-1.414L17.657 12A4 4 0 1 0 12 6.343l-1.414 1.414-1.414-1.414 1.414-1.414a6 6 0 0 1 8.485 8.485l-1.414 1.414zm-2.829 2.829l-1.414 1.414a6 6 0 1 1-8.485-8.485l1.414-1.414 1.414 1.414L6.343 12A4 4 0 1 0 12 17.657l1.414-1.414 1.414 1.414zm0-9.9l1.415 1.415-7.071 7.07-1.415-1.414 7.071-7.07zM5.775 2.293l1.932-.518L8.742 5.64l-1.931.518-1.036-3.864zm9.483 16.068l1.931-.518 1.036 3.864-1.932.518-1.035-3.864zM2.293 5.775l3.864 1.036-.518 1.931-3.864-1.035.518-1.932zm16.068 9.483l3.864 1.035-.518 1.932-3.864-1.036.518-1.931z"/>
                      </svg>
                    </span>

                    <span 
                      class="font-medium text-gray-800 text-lg pr-3"
                      :class="this.checkSavedActor.accent_color && this.checkSavedActor.accent_color.split('-')[1] < 400 ? `text-${this.checkSavedActor.accent_color.split('-')[0]}-400` : `text-${this.checkSavedActor.accent_color}` "
                      
                    >
                      {{checkSavedActor.actor_name}}
                    </span>
                    <span class="font-light text-gray-600 text-lg">{{checkSavedActor.player_name}}</span>
                  </div>
                </div>
                  <div v-if="this.checkSavedActor.total_hit_points || this.checkSavedActor.armor_class" class="mt-2 flex flex-row justify-start">
                    <div v-if="this.checkSavedActor.armor_class">
                      <span class="mr-1 font-light text-gray-600">AC</span>
                      <span class="mr-2">{{checkSavedActor.armor_class}}</span>
                    </div>
                    <!-- <div v-if="this.checkSavedActor.total_hit_points" class="relative">
                      <button @click="showHealthModal = !showHealthModal">
                        <span class="mr-1 font-light text-gray-600">HP</span>
                        <span>{{current_hit_points}}</span><span class="font-light text-gray-600">/</span><span>{{checkSavedActor.total_hit_points}}</span>
                      </button>
                      <div v-if="showHealthModal" class="health-modal bg-white absolute shadow p-2 rounded">
                          <input v-model="healthAmountToChange" class="w-full shadow mb-1 px-2" type="number">
                          <div class="flex justify-between m-2">
                            <button @click="damage" class="border border-red-600 text-red-600 rounded px-1">Damage</button>
                            <button @click="heal" class="border border-green-600 text-green-600 rounded px-1">Heal</button>
                          </div>
                      </div>
                    </div> -->
                  </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col ml-2 justify-start items-center">
            <div class="flex flex-col ml-2 justify-start">

            <button @click="$emit('deleteActor', index)" class="mb-1" title="Remove actor from combat">
              <svg class="text-gray-500 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"/>
              </svg>
            </button>

            <button v-if="actor.visibleToGuests" class="" title="Show actor to guests">
              <svg class="text-gray-500 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path d="M17.882 19.297A10.949 10.949 0 0 1 12 21c-5.392 0-9.878-3.88-10.819-9a10.982 10.982 0 0 1 3.34-6.066L1.392 2.808l1.415-1.415 19.799 19.8-1.415 1.414-3.31-3.31zM5.935 7.35A8.965 8.965 0 0 0 3.223 12a9.005 9.005 0 0 0 13.201 5.838l-2.028-2.028A4.5 4.5 0 0 1 8.19 9.604L5.935 7.35zm6.979 6.978l-3.242-3.242a2.5 2.5 0 0 0 3.241 3.241zm7.893 2.264l-1.431-1.43A8.935 8.935 0 0 0 20.777 12 9.005 9.005 0 0 0 9.552 5.338L7.974 3.76C9.221 3.27 10.58 3 12 3c5.392 0 9.878 3.88 10.819 9a10.947 10.947 0 0 1-2.012 4.592zm-9.084-9.084a4.5 4.5 0 0 1 4.769 4.769l-4.77-4.769z"/>
              </svg>
            </button>
            <button v-if="!actor.visibleToGuests" class="" title="Hide actor from guests">
              <svg class="text-gray-500 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path d="M12 3c5.392 0 9.878 3.88 10.819 9-.94 5.12-5.427 9-10.819 9-5.392 0-9.878-3.88-10.819-9C2.121 6.88 6.608 3 12 3zm0 16a9.005 9.005 0 0 0 8.777-7 9.005 9.005 0 0 0-17.554 0A9.005 9.005 0 0 0 12 19zm0-2.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0-2a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
              </svg>
            </button>
          </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {

  data: function() {
    return {
      showHealthModal: false,
      healthAmountToChange: 1,
      colors: {
        gray: {
          100: '#F7FAFC',
          200: '#EDF2F7',
          300: '#E2E8F0',
          400: '#CBD5E0',
          500: '#A0AEC0',
          600: '#718096',
          700: '#4A5568',
          800: '#2D3748',
          900: '#1A202C',
        },
        red: {
          100: '#FFF5F5',
          200: '#FED7D7',
          300: '#FEB2B2',
          400: '#FC8181',
          500: '#F56565',
          600: '#E53E3E',
          700: '#C53030',
          800: '#9B2C2C',
          900: '#742A2A',
        },
        orange: {
          100: '#FFFAF0',
          200: '#FEEBC8',
          300: '#FBD38D',
          400: '#F6AD55',
          500: '#ED8936',
          600: '#DD6B20',
          700: '#C95621',
          800: '#9CF221',
          900: '#7B341E',
        },
        yellow: {
          100: '#FFFFF0',
          200: '#FEFCBF',
          300: '#FAF089',
          400: '#F6E05E',
          500: '#ECC94B',
          600: '#D69E2E',
          700: '#B7791F',
          800: '#975A16',
          900: '#744210',
        },
        green: {
          100: '#F0FFF4',
          200: '#C6F6D5',
          300: '#9AE6B4',
          400: '#68D391',
          500: '#48BB78',
          600: '#38A169',
          700: '#2F855A',
          800: '#276749',
          900: '#22543D',
        },
        teal: {
          100: '#E6FFFA',
          200: '#B2F5EA',
          300: '#81E6D9',
          400: '#4FD1C5',
          500: '#38B2AC',
          600: '#319795',
          700: '#2C7A7B',
          800: '#285E61',
          900: '#234E52',
        },
        blue: {
          100: '#EBF8FF',
          200: '#BEE3F8',
          300: '#90CDF4',
          400: '#63B3ED',
          500: '#4299E1',
          600: '#3182CE',
          700: '#2B6CB0',
          800: '#2C5282',
          900: '#2A4365',
        },
        indigo: {
          100: '#EBF4FF',
          200: '#C3DAFE',
          300: '#A3BFFA',
          400: '#7F9CF5',
          500: '#667EEA',
          600: '#5A67D8',
          700: '#4C51BF',
          800: '#434190',
          900: '#3C366B',
        },
        purple: {
          100: '#FAF5FF',
          200: '#E9D8FD',
          300: '#D6BCFA',
          400: '#B794F4',
          500: '#9F7AEA',
          600: '#805AD5',
          700: '#6B46C1',
          800: '#553C9A',
          900: '#44337A',
        },
        pink: {
          100: '#FFF5F7',
          200: '#FED7E2',
          300: '#FBB6CE',
          400: '#F687B3',
          500: '#ED64A6',
          600: '#D53F8C',
          700: '#B83280',
          800: '#97266D',
          900: '#902459',
        },
      }
    }
  },
  props: {
    actor: Object,
    index: Number,
  },
  methods: {
    damage: function() {
      if(this.actor.current_hit_points - Number(this.healthAmountToChange) <= 0) {
        this.$store.dispatch('updateActorCurrentHealth', {actorId: this.actor.id, newHealth: 0})
      } else {
        this.$store.dispatch('updateActorCurrentHealth', {actorId: this.actor.id, newHealth: Number(this.actor.current_hit_points) - Number(this.healthAmountToChange)});
      }
    },
    heal: function() {
      if(this.actor.current_hit_points + Number(this.healthAmountToChange) >= this.checkSavedActor.total_hit_points) {
        this.$store.dispatch('updateActorCurrentHealth', {actorId: this.actor.id, newHealth: this.checkSavedActor.total_hit_points})
      } else {
        this.$store.dispatch('updateActorCurrentHealth', {actorId: this.actor.id, newHealth: Number(this.actor.current_hit_points) + Number(this.healthAmountToChange)});
      }
    },
  },
  computed: {
    ...mapGetters(['isSignedIn',]),
    healthWidth: function() {
      return Math.ceil((this.actor.current_hit_points / this.checkSavedActor.total_hit_points) * 100);
    },
    checkSavedActor: function() {
      if(this.actor.is_linked && this.$store.state.isSignedIn) {
        //74b6a57f-9e98-4f50-ac9e-62a3371108de
        //eslint-disable-next-line 
        console.log(this.$store.state.savedActors)
        //eslint-disable-next-line 
        console.log('computer property lelx')
        //eslint-disable-next-line
        console.log(this.actor.id);
        //eslint-disable-next-line
        console.log(this.$store.state.savedActors.find(actor => actor.id === this.actor.id))
        return this.$store.state.savedActors.find(actor => actor.id === this.actor.id)
      }
      return this.actor;
    },
  }
};
</script>

<style>
  .min-w-16 {
    min-width: 4rem;
  }

  .health-modal {
    left: calc(50% - 8rem);
    top: -6rem;
    width: 10rem;
    z-index: 0;
  }

  .health-modal:before {
    content: "";
    position: absolute;
    top: 100%;
    left: calc(85% - 5px);
    border: solid 10px transparent;
    border-top-color: #FFF;
  }

  .animate-width {
    transition: width .5s ease-in-out;
  }

  .text-shadow {
    text-shadow: 0 1px 3px #A0AEC0;
  }
</style>
