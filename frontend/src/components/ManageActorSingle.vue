<template>
  <div 
  class="m-2 rounded shadow bg-gray-200 my-4"
  >
      <div
          class="flex flex-row p-3 rounded-b"
          :style="{
          borderBottom: this.actor.accent_color ? `4px solid ${colors[this.actor.accent_color.split('-')[0]][this.actor.accent_color.split('-')[1]]}` : ''}"
      >
        <div class="w-full flex">
          <div class="flex flex-col flex-grow">
            <div class="flex flex-row">
              <div
              class="rounded-full w-16 h-16 flex items-center justify-center mr-4 min-w-16 bg-center bg-cover"
              :class="this.actor.accent_color ? `bg-${this.actor.accent_color}` : 'bg-gray-700'"
              :style="{backgroundImage: this.actor.image_url ? `url(${this.actor.image_url})` : ''}"
              >
                <svg
                  v-if="!this.actor.image_url"
                  :class="this.actor.accent_color && this.actor.accent_color.split('-')[1] < 400 ? 'text-gray-700' : `text-white` "
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
              <div class="flex flex-col justify-between flex-grow">

                <div class="flex justify-between pb-1">
                  <div class="flex flex-wrap">
                    <span 
                    class="font-medium text-gray-800 text-lg pr-3"
                    :class="this.actor.accent_color && this.actor.accent_color.split('-')[1] < 400 ? `text-${this.actor.accent_color.split('-')[0]}-400` : `text-${this.actor.accent_color}` "
                    > 
                      {{actor.actor_name}}
                    </span>
                    <span v-if="actor.player_name" class="font-light text-gray-600 text-lg">{{actor.player_name}}</span>
                  </div>
                </div>

                <div>
                  <div class="flex" v-if="actor.total_hit_points || actor.armor_class">
                    <span class="mr-1 font-light text-gray-600">AC</span>
                    <span class="mr-2">{{actor.armor_class}}</span>
                  <div>
                    <span class="mr-1 font-light text-gray-600">HP</span>
                    <span>{{actor.total_hit_points}}</span>
                  </div>
                </div>

              </div>
            </div>
            </div>
          </div>
          <div class="flex flex-col ml-2 justify-start">
            <button @click="$emit('deleteActor', index)" class="mb-1" title="Remove actor from combat">
              <svg class="text-gray-500 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"/>
              </svg>
            </button>
            <svg class="text-gray-500 fill-current mb-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path d="M21 6.757l-2 2V4h-9v5H5v11h14v-2.757l2-2v5.765a.993.993 0 0 1-.993.992H3.993A1 1 0 0 1 3 20.993V8l6.003-6h10.995C20.55 2 21 2.455 21 2.992v3.765zm.778 2.05l1.414 1.415L15.414 18l-1.416-.002.002-1.412 7.778-7.778z"/>
            </svg>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
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
            },
        }
    },
    props: {
        actor: Object,
    }
}
</script>

<style>

</style>