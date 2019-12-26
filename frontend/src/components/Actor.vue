<template>
  <div>
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
        :style="{borderRight: '2px solid #CBD5E0', borderBottom: '2px solid #CBD5E0', borderLeft: this.actor.accentColor ? `8px solid ${colors[this.actor.accentColor.split('-')[0]][this.actor.accentColor.split('-')[1]]}` : '2px solid #CBD5E0'}"
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
                <div>
                  <span class="font-medium text-gray-800 text-lg pr-3">{{actor.characterName}}</span>
                  <span class="font-light text-gray-600 text-lg">{{actor.playerName}}</span>
                </div>
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
</style>
