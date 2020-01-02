<template>
    <div class="h-screen w-screen bg-trans absolute left-0 flex items-end sm:items-start justify-center" :style="{top: `${scrollTop}px`}">
        <div class="rounded bg-white max-w-sm sm:max-w-2xl w-full mb-10 sm:mb-0 sm:mt-20 mx-2 relative p-5 flex flex-col modal">
            <button class="absolute right-0 pr-2 top-0 pt-2" @click="$emit('cancel')">
                <svg class="text-gray-500 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"/>
                </svg>
            </button>
            <h2 class="font-bold text-2xl pb-2" :class="titleColor ? `text-${titleColor}-600` : ''">{{title}}</h2>
            <p class="pb-6">{{message}}</p>
            <div class="w-full flex justify-around pb-4">
                <button class="rounded bg-gray-400 text-gray-700 px-2 py-1" @click="$emit('cancel')">Cancel</button>
                <button class="rounded bg-red-600 px-2 py-1 text-white" @click="$emit('confirm')">Yes</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        message: String,
        title: String,
        titleColor: String,
    },
    data: function() {
        return{
            scrollTop: window.pageYOffset,
        }
    },
    mounted() {
        document.body.style.overflowY = 'hidden';
        document.body.style.width = '100%';
    },
    destroyed() {
        document.body.style.position = '';
        document.body.style.overflowY = 'auto';
    }
}
</script>

<style>
    .modal {
        min-height: 40px;
    }
</style>