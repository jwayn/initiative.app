<template>
  <div class="pb-2">
    <transition name="color-fade" mode="out-in">
      <div v-if="step === 1">
        <button @click.prevent="step = 2" class="shadow rounded px-2 py-1 w-full border-2 text-gray-800 font-light flex justify-center items-center" :class="`border-${selectedColor}`">
            Accent Color
            <div class="h-4 w-4 ml-2 rounded-full" :class="`bg-${selectedColor}`"></div>
        </button>
      </div>
      <div v-if="step === 2" class="flex justify-between pb-1 w-full" key="baseColors">
        <button v-for="color in colorsArray" :key="color" class="w-8 h-8 rounded-full shadow border border-gray-300" :class="`bg-${color}-500`" @click.prevent="setBaseColor(color)">
        </button>
        <button class="w-8 h-8 rounded-full shadow border border-gray-300 flex justify-center items-center" @click.prevent="step = 1">
            <svg class="w-4 h-4 text-gray-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path d="M5.828 7l2.536 2.536L6.95 10.95 2 6l4.95-4.95 1.414 1.414L5.828 5H13a8 8 0 1 1 0 16H4v-2h9a6 6 0 1 0 0-12H5.828z"/>
            </svg>
        </button>
      </div>
      <div v-if="step === 3" key="distinctColors" class="flex pb-1 justify-between w-full">
        <button @click.prevent="pickColor(showColors, value)" v-for="value in colorValues" :key="value" :class="`bg-${showColors}-${value}`" class="w-8 h-8 rounded-full shadow border border-gray-300">
        </button>
        <button class="w-8 h-8 rounded-full shadow border border-gray-300 flex justify-center items-center" @click.prevent="step = 2">
            <svg class="w-4 h-4 text-gray-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path d="M5.828 7l2.536 2.536L6.95 10.95 2 6l4.95-4.95 1.414 1.414L5.828 5H13a8 8 0 1 1 0 16H4v-2h9a6 6 0 1 0 0-12H5.828z"/>
            </svg>
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
    data: function() {
        return {
            colorsArray: [
                'red',
                'orange',
                'yellow',
                'green',
                'teal',
                'blue',
                'indigo',
                'purple',
                'pink',
            ],
            colorValues: [
                300,
                400,
                500,
                600,
                700,
                800,
                900,
            ],
            colors: {
                gray: [
                    {value: 100, color: '#F7FAFC'},
                    {value: 200, color: '#EDF2F7'},
                    {value: 300, color: '#E2E8F0'},
                    {value: 400, color: '#CBD5E0'},
                    {value: 500, color: '#A0AEC0'},
                    {value: 600, color: '#718096'},
                    {value: 700, color: '#4A5568'},
                    {value: 800, color: '#2D3748'},
                    {value: 900, color: '#1A202C'},
                ],
                red: [
                    {value: 100, color: '#FFF5F5'},
                    {value: 200, color: '#FED7D7'},
                    {value: 300, color: '#FEB2B2'},
                    {value: 400, color: '#FC8181'},
                    {value: 500, color: '#F56565'},
                    {value: 600, color: '#E53E3E'},
                    {value: 700, color: '#C53030'},
                    {value: 800, color: '#9B2C2C'},
                    {value: 900, colro: '#742A2A'},
                ],
                orange: [
                    {value: 100, color: '#FFFAF0'},
                    {value: 200, color: '#FEEBC8'},
                    {value: 300, color: '#FBD38D'},
                    {value: 400, color: '#F6AD55'},
                    {value: 500, color: '#ED8936'},
                    {value: 600, color: '#DD6B20'},
                    {value: 700, color: '#C95621'},
                    {value: 800, color: '#9CF221'},
                    {value: 900, color: '#7B341E'},
                ],
                yellow: [
                    {value: 100, color: '#FFFFF0'},
                    {value: 200, color: '#FEFCBF'},
                    {value: 300, color: '#FAF089'},
                    {value: 400, color: '#F6E05E'},
                    {value: 500, color: '#ECC94B'},
                    {value: 600, color: '#D69E2E'},
                    {value: 700, color: '#B7791F'},
                    {value: 800, color: '#975A16'},
                    {value: 900, color: '#744210'},
                ],
                green: [
                    {value: 100, color: '#F0FFF4'},
                    {value: 200, color: '#C6F6D5'},
                    {value: 300, color: '#9AE6B4'},
                    {value: 400, color: '#68D391'},
                    {value: 500, color: '#48BB78'},
                    {value: 600, color: '#38A169'},
                    {value: 700, color: '#2F855A'},
                    {value: 800, color: '#276749'},
                    {value: 900, color: '#22543D'},
                ],
                teal: [
                    {value: 100, color: '#E6FFFA'},
                    {value: 200, color: '#B2F5EA'},
                    {value: 300, color: '#81E6D9'},
                    {value: 400, color: '#4FD1C5'},
                    {value: 500, color: '#38B2AC'},
                    {value: 600, color: '#319795'},
                    {value: 700, color: '#2C7A7B'},
                    {value: 800, color: '#285E61'},
                    {value: 900, color: '#234E52'},
                ],
                blue: [
                    {value: 100, color: '#EBF8FF'},
                    {value: 200, color: '#BEE3F8'},
                    {value: 300, color: '#90CDF4'},
                    {value: 400, color: '#63B3ED'},
                    {value: 500, color: '#4299E1'},
                    {value: 600, color: '#3182CE'},
                    {value: 700, color: '#2B6CB0'},
                    {value: 800, color: '#2C5282'},
                    {value: 900, color: '#2A4365'},
                ],
                indigo: [
                    {value: 100, color: '#EBF4FF'},
                    {value: 200, color: '#C3DAFE'},
                    {value: 300, color: '#A3BFFA'},
                    {value: 400, color: '#7F9CF5'},
                    {value: 500, color: '#667EEA'},
                    {value: 600, color: '#5A67D8'},
                    {value: 700, color: '#4C51BF'},
                    {value: 800, color: '#434190'},
                    {value: 900, color: '#3C366B'},
                ],
                purple: [
                    {value: 100, color: '#FAF5FF'},
                    {value: 200, color: '#E9D8FD'},
                    {value: 300, color: '#D6BCFA'},
                    {value: 400, color: '#B794F4'},
                    {value: 500, color: '#9F7AEA'},
                    {value: 600, color: '#805AD5'},
                    {value: 700, color: '#6B46C1'},
                    {value: 800, color: '#553C9A'},
                    {value: 900, color: '#44337A'},
                ],
                pink: [
                    {value: 100, color: '#FFF5F7'},
                    {value: 200, color: '#FED7E2'},
                    {value: 300, color: '#FBB6CE'},
                    {value: 400, color: '#F687B3'},
                    {value: 500, color: '#ED64A6'},
                    {value: 600, color: '#D53F8C'},
                    {value: 700, color: '#B83280'},
                    {value: 800, color: '#97266D'},
                    {value: 900, color: '#902459'},
                ],
            },
            step: 1,
            showColors: false,
            selectedColor: '',
        }
    },
    methods: {
        setBaseColor: function(color) {
            this.step = 3;
            this.showColors = color;
        },
        pickColor: function(color, value) {
            this.step = 1;
            this.selectedColor = color + '-' + value;
            this.showColors = false;
            this.$emit('pickColor', this.selectedColor);
        }
    }
}
</script>

<style>
    .color-fade-enter-active, .color-fade-leave-active {
      transition: all .3s;
    }
    
    .color-fade-enter {
      opacity: 0;
    }
    
    .color-fade-leave-to {
      opacity: 0;
    }
</style>