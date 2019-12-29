<template>
  <div class="my-5">
    <div v-if="index==0">
      <span class="ml-3 text-lg text-gray-500 font-light">
          Current
      </span>
    </div>
    <div v-if="index==1" class="mt-5">
      <span class="ml-3 text-lg text-gray-500 font-light">
          Up Next
      </span>
    </div>
    <div v-if="index==2" class="mt-5">
      <span class="ml-3 text-lg text-gray-500 font-light">
          Coming Up
      </span>
    </div>
    <div 
      class="m-2 rounded shadow bg-gray-200"
      :id="`index-${index}`"
    >

      <!-- health indicator -->
      <div class="h-1 rounded-t bg-red-600">
        <div class="bg-green-600 h-full rounded-t animate-width" :style="{width: this.healthWidth + '%'}">
        </div>
      </div>
      
      <!-- rest of actor -->
      <div
        class="flex flex-row p-3 rounded-b"
        :style="{
          borderBottom: this.actor.accentColor ? `4px solid ${colors[this.actor.accentColor.split('-')[0]][this.actor.accentColor.split('-')[1]]}` : ''}"
      >
        <div class="flex flex-col w-full">
          <div class="flex flex-row">
            <div
              class="rounded-full w-16 h-16 flex items-center justify-center mr-4 min-w-16"
              :class="this.actor.accentColor ? `bg-${this.actor.accentColor}` : 'bg-gray-700' "
            >
              <svg
                :class="this.actor.accentColor && this.actor.accentColor.split('-')[1] < 400 ? 'text-gray-700' : `text-white` "
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
                <div class="flex flex-wrap">
                  <span 
                    class="font-medium text-gray-800 text-lg pr-3"
                    :class="this.actor.accentColor && this.actor.accentColor.split('-')[1] < 400 ? `text-${this.actor.accentColor.split('-')[0]}-400` : `text-${this.actor.accentColor}` "
                    
                  >
                    {{actor.characterName}}
                  </span>
                  <span class="font-light text-gray-600 text-lg">{{actor.playerName}}</span>
                </div>
                <button @click="$emit('deleteActor', index)" class="self-start" title="Remove actor from combat">
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
            <div class="flex">
              <span class="mr-1 font-light text-gray-600">AC</span>
              <span class="mr-2">{{actor.armorClass}}</span>
              <div class="relative">
                <button @click="showHealthModal = !showHealthModal">
                  <span class="mr-1 font-light text-gray-600">HP</span>
                  <span>{{actor.currentHitPoints}}</span><span class="font-light text-gray-600">/</span><span>{{actor.totalHitPoints}}</span>
                </button>
                <div v-if="showHealthModal" class="health-modal bg-white absolute shadow p-2 rounded">
                    <input v-model="healthAmountToChange" class="w-full shadow mb-1 px-2" type="number">
                    <div class="flex justify-between m-2">
                      <button @click="damage" class="border border-red-600 text-red-600 rounded px-1">Damage</button>
                      <button @click="heal" class="border border-green-600 text-green-600 rounded px-1">Heal</button>
                    </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-4 flex flex-row justify-end">
            <button v-if="actor.visibleToGuests" class="px-1" title="Show actor to guests">
              <svg class="text-gray-500 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path d="M17.882 19.297A10.949 10.949 0 0 1 12 21c-5.392 0-9.878-3.88-10.819-9a10.982 10.982 0 0 1 3.34-6.066L1.392 2.808l1.415-1.415 19.799 19.8-1.415 1.414-3.31-3.31zM5.935 7.35A8.965 8.965 0 0 0 3.223 12a9.005 9.005 0 0 0 13.201 5.838l-2.028-2.028A4.5 4.5 0 0 1 8.19 9.604L5.935 7.35zm6.979 6.978l-3.242-3.242a2.5 2.5 0 0 0 3.241 3.241zm7.893 2.264l-1.431-1.43A8.935 8.935 0 0 0 20.777 12 9.005 9.005 0 0 0 9.552 5.338L7.974 3.76C9.221 3.27 10.58 3 12 3c5.392 0 9.878 3.88 10.819 9a10.947 10.947 0 0 1-2.012 4.592zm-9.084-9.084a4.5 4.5 0 0 1 4.769 4.769l-4.77-4.769z"/>
              </svg>
            </button>
            <button v-if="!actor.visibleToGuests" class="px-1" title="Hide actor from guests">
              <svg class="text-gray-500 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path d="M12 3c5.392 0 9.878 3.88 10.819 9-.94 5.12-5.427 9-10.819 9-5.392 0-9.878-3.88-10.819-9C2.121 6.88 6.608 3 12 3zm0 16a9.005 9.005 0 0 0 8.777-7 9.005 9.005 0 0 0-17.554 0A9.005 9.005 0 0 0 12 19zm0-2.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0-2a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
              </svg>
            </button>
            <button class="pl-1" title="Edit actor">
              <svg class="text-gray-500 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path d="M21 6.757l-2 2V4h-9v5H5v11h14v-2.757l2-2v5.765a.993.993 0 0 1-.993.992H3.993A1 1 0 0 1 3 20.993V8l6.003-6h10.995C20.55 2 21 2.455 21 2.992v3.765zm.778 2.05l1.414 1.415L15.414 18l-1.416-.002.002-1.412 7.778-7.778z"/>
              </svg>
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
      if(this.actor.currentHitPoints - Number(this.healthAmountToChange) <= 0) {
        this.actor.currentHitPoints = 0;
      } else {
        this.actor.currentHitPoints -= Number(this.healthAmountToChange);
      }
    },
    heal: function() {
      if(this.actor.currentHitPoints + Number(this.healthAmountToChange) >= this.actor.totalHitPoints) {
        this.actor.currentHitPoints = this.actor.totalHitPoints;
      } else {
        this.actor.currentHitPoints += Number(this.healthAmountToChange);
      }
    },
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
    transition: width .3s cubic-bezier(.2,.98,.24,.39);
  }

  .text-shadow {
    text-shadow: 0 1px 3px #A0AEC0;
  }
</style>
