<template>
  <div class="m-2 py-2">
    <transition name="color-fade" mode="out-in">
      <div v-if="!showColors" class="flex justify-between w-full" key="baseColors">
        <button v-for="color in colorsArray" :key="color" class="w-8 h-8 rounded-full shadow border border-gray-300" :class="`bg-${color}-500`" @click="setBaseColor(color)">
        </button>
      </div>
      <div v-if="showColors" key="distinctColors" class="flex justify-between w-full">
        <button @click="pickColor(showColors, value)" v-for="value in colorValues" :key="value" :class="`bg-${showColors}-${value}`" class="w-8 h-8 rounded-full shadow border border-gray-300">
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
                100,
                200,
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
            showColors: false,
            selectedColor: '',
        }
    },
    methods: {
        setBaseColor: function(color) {
            this.showColors = color;
        },
        pickColor: function(color, value) {
            this.selectedColor = color + '-' + value;
            this.showColors = false;
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
      transform: translateX(-50px);
    }
    
    .color-fade-leave-to {
      opacity: 0;
      transform: translateX(50px);
    }
</style>