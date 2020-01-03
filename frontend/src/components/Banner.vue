<template>
    <header class="banner h-16 sm:h-12 bg-gray-300 sm:flex sm:justify-between p-2 sm:px-4 sm:py-3 sm:items-center fixed sm:static left-0 sm:left-auto top-0 sm:top-auto w-full">
        <div class="flex justify-between items-center sm:p-0">
            <svg width="48" height="48" viewBox="0 0 367 286" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M183.371 237.861L109.724 111.948L256.227 111.948L183.371 237.861Z" fill="#68D391"/>
                <path d="M109.724 111.948L183.371 237.861L62.2095 222.023L109.724 111.948Z" fill="#2F855A"/>
                <path d="M256.227 111.948L183.371 237.861L304.137 222.023L256.227 111.948Z" fill="#1D1C1C"/>
                <path d="M256.227 111.948L183.371 237.861L304.137 222.023L256.227 111.948Z" fill="#276749"/>
                <path d="M183.371 34.3408L256.227 111.947L109.724 111.947L183.371 34.3408Z" fill="#38A169"/>
                <path d="M183.371 34.3408L304.533 93.0357L256.227 111.948L183.371 34.3408Z" fill="#276749"/>
                <path d="M304.137 222.023L183.371 279.04L183.371 237.861L304.137 222.023Z" fill="#22543D"/>
                <path d="M62.2095 222.023L183.371 279.04L183.371 237.861L62.2095 222.023Z" fill="#276749"/>
                <path d="M304.137 222.023L304.272 92.9419L256.227 111.948L304.137 222.023Z" fill="#22543D"/>
                <path d="M62.2095 222.023L62.2095 92.942L109.724 111.948L62.2095 222.023Z" fill="#38A169"/>
                <path d="M183.371 34.3408L62.2096 92.942L109.724 111.948L183.371 34.3408Z" fill="#68D391"/>
            </svg>

            <span class="text-green-700 font-sans text-2xl">Initiative</span>
            <div class="sm:hidden">
                <button @click="menuOpen = !menuOpen" type="button" class="block text-black focus:text-gray-600 focus:outline-none cursor-pointer">
                    <svg class="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path v-if="!menuOpen" d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z"/>
                        <path v-else d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"/>
                    </svg>
                </button>
            </div>
        </div>
        <div @click="menuOpen = false" :class="menuOpen ? 'block' : 'hidden'" class="px-4 pt-1 pb-4 sm:flex sm:p-0 absolute left-0 sm:right-1 sm:left-auto bg-gray-300 w-full sm:w-auto">
            <router-link v-if="isSignedIn" to="/actors" class="block text-gray-800 font-semibold p-2 mt-1 text-md hover:bg-gray-200 rounded sm:mt-0 sm:ml-2">Actors</router-link>
            <!-- <router-link v-if="isSignedIn" to="/encounters" class="block text-gray-800 font-semibold p-2 mt-1 text-md hover:bg-gray-200 rounded sm:mt-0 sm:ml-2">Encounters</router-link> -->
            <router-link to="/tracker" class="block text-gray-800 font-semibold p-2 mt-1 text-md hover:bg-gray-200 rounded sm:mt-0 sm:ml-2">Tracker</router-link>
            <router-link v-if="!isSignedIn" to="/signin" class="block text-gray-800 font-semibold p-2 text-md hover:bg-gray-200 rounded sm:mt-0 sm:ml-2">Sign In</router-link>
            <button v-if="isSignedIn" @click="signOut" class="block text-gray-800 w-full text-left font-semibold p-2 text-md hover:bg-gray-200 rounded sm:mt-0 sm:ml-2">Sign Out</button>
        </div>
    </header> 
</template>
<script>
import { mapGetters } from 'vuex';

export default {
    name: 'Banner',
    data() {
        return {
            menuOpen: false,
        }
    },
    computed: {
        ...mapGetters(['isSignedIn',]),
    },
    methods: {
        signOut() {
            this.$store.state.token = null;
            localStorage.removeItem('token');
            this.$router.push('tracker')
        }
    }
}
</script>

<style>
    @media (min-width: 640px) {
    .sm\:right-1 { right: 1rem }
    }
    
    .right-1 {
        right: 1rem;
    }
    
    .banner {
        z-index: 9999;
    }
</style>

