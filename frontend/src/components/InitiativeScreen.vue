<template>                                                      
    <div v-if="!$store.state.savedActorsLoading" class="bg-gray-100 w-full max-w-3xl">
        <!-- <div class="flex items-center justify-between m-2 mt-3 mb-4">
            <div>
                <span class="text-lg font-light">Jason's Party</span> 
            </div>
            <div>
                <span class="text-lg font-light">Party Code: </span><span class="text-lg font-medium">DOGE</span>
            </div>
        </div> -->
        
        <!-- Initiative Controls -->
        <div class="flex justify-between pt-4">
            <div class="flex justify-start mb-4">
                <!-- Clear encounter -->
                <button @click="showConfirmClearTracker = true" v-if="currentTrackerActors.length" title="Clear the tracker" class="border border-green-700 rounded bg-white text-green-700 hover:text-green-500 p-2 mx-1 flex">
                    <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"/>
                    </svg>
                </button>
            </div>

            <div class="flex justify-end mb-4">
                
                <!-- Save encounter -->
                <!-- <button title="Save this encounter" v-if="$store.getters.isSignedIn && currentTrackerActors.length" class="border border-green-700 rounded bg-white text-green-700 hover:text-green-500 p-2 mx-1 flex">
                    <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path d="M4 3h14l2.707 2.707a1 1 0 0 1 .293.707V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm3 1v5h9V4H7zm-1 8v7h12v-7H6zm7-7h2v3h-2V5z"/>
                    </svg>
                </button> -->
                
                <!-- Start encounter -->
                <button title="Start this encounter" v-if="!$store.state.currentInitiativeTracker.started && currentTrackerActors.length" v-on:hideStartInit="this.showStartInitiative = false" class="border border-green-700 rounded bg-white text-green-700 hover:text-green-500 p-2 mx-1 flex" @click="showStartInitiative = !showStartInitiative">
                    <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path d="M19.376 12.416L8.777 19.482A.5.5 0 0 1 8 19.066V4.934a.5.5 0 0 1 .777-.416l10.599 7.066a.5.5 0 0 1 0 .832z"/>
                    </svg>
                </button>

                <!-- Stop encounter -->
                <button title="Stop this encounter" v-if="$store.state.currentInitiativeTracker.started" @click="stopInit" class="border border-green-700 rounded bg-white text-green-700 hover:text-green-500 p-2 mx-1 flex">
                    <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path d="M6 7v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"/>
                    </svg>
                </button>

                <!-- Add actor -->
                <button @click.prevent="showAddActor = !showAddActor" title="Add an actor to this encounter" class="border border-green-700 hover:text-green-500 rounded bg-white text-green-700 p-2 mx-1 flex">
                    <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path d="M2 18h10v2H2v-2zm0-7h20v2H2v-2zm0-7h20v2H2V4zm16 14v-3h2v3h3v2h-3v3h-2v-3h-3v-2h3z"/>
                    </svg>
                </button>

                <!-- Next turn -->
                <button @click.prevent="nextTurn" v-if="currentTrackerActors.length && $store.state.currentInitiativeTracker.started" title="Next turn" class="border border-green-700 rounded bg-white text-green-700 hover:text-green-500 p-2 mx-1 flex">
                    <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path d="M7.788 17.444A.5.5 0 0 1 7 17.035V6.965a.5.5 0 0 1 .788-.409l7.133 5.036a.5.5 0 0 1 0 .816l-7.133 5.036zM16 7a1 1 0 0 1 2 0v10a1 1 0 1 1-2 0V7z"/>
                    </svg>
                </button>
            </div>
        </div>
        

        <!-- Add actor form -->
        <AddActor v-if="showAddActor" @closeAddActor="showAddActor = false" />

        <transition name="fade-color">
            <StartInitiative v-if="showStartInitiative" key="startInit" v-on:hideStartInit="showStartInitiative = false" />
        </transition>
        
        <!-- Actors list -->
        <draggable v-model="$store.state.currentInitiativeTracker.actors" @start="drag=true" @end="drag=false" ghost-class="actor-ghost" chosen-class="actor-chosen" drag-class="actor-drag" :options="{delay:400, delayOnTouchOnly: true}" class="pb-10" v-if="currentTrackerActors">
            <transition-group name="actor-list" tag="div">
                <Actor v-on:deleteActor="deleteActor" v-for="n in currentTrackerActors.length" :actor="currentTrackerActors[n-1]" :index="n - 1" :key="currentTrackerActors[n-1].id" />
            </transition-group>
        </draggable>
        <div v-else>
            Add actors to track
        </div>


        <!-- Confirm clear tracker modal -->
        <!-- <transition name="color-fade">
            <div v-if="showConfirmClearTracker" class="h-screen w-screen bg-trans absolute left-0 top-0 flex items-end sm:items-center justify-center">
                <div class="rounded bg-white max-w-sm sm:max-w-2xl w-full mb-10 sm:mb-0 sm:mt-0 mx-2 relative p-5 flex flex-col h-40">
                    <button class="absolute right-0 pr-2 top-0 pt-2" @click="showConfirmClearTracker = false">
                        <svg class="text-gray-500 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"/>
                        </svg>
                    </button>
                    <h2 class="text-red-600 font-bold text-lg pb-2">Warning</h2>
                    <p class="pb-6">Are you sure you want to clear the tracker?</p>
                    <div class="w-full flex justify-around pb-4">
                        <button class="rounded bg-gray-400 text-gray-700 px-2 py-1" @click="showConfirmClearTracker = false">Cancel</button>
                        <button class="rounded bg-red-600 px-2 py-1 text-white" @click="clearTracker">Yes</button>
                    </div>
                </div>
            </div>
        </transition> -->
        <transition name="color-fade">
            <Modal v-if="showConfirmClearTracker" :message="`Are you sure you want to clear the tracker?`" @confirm="clearTracker" @cancel="showConfirmClearTracker = false" title="Warning" titleColor="red" />
        </transition>
    </div>

    <div v-else class="mt-12">
        <Loader />
    </div>
</template>

<script>
import Actor from './Actor.vue'
import AddActor from './AddActor'
import draggable from 'vuedraggable'
import Loader from './Loader';
import Modal from './Modal';
import StartInitiative from './StartInitiative';

import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            menuOpen: false,
            showAddActor: false,
            initiativeActive: false,
            showConfirmClearTracker: false,
            showStartInitiative: false,
        }
    },
    components: {
        Actor,
        AddActor,
        draggable,
        Loader,
        Modal,
        StartInitiative,
    },
    methods: {
        nextTurn: function() {
            this.$store.state.currentInitiativeTracker.actors.push(this.$store.state.currentInitiativeTracker.actors[0]);
            this.$store.state.currentInitiativeTracker.actors.splice(0,1);
            localStorage.setItem('currentInitiativeTracker', JSON.stringify(this.$store.state.currentInitiativeTracker))
        },
        deleteActor: function(actorIndex) {
            this.$store.state.currentInitiativeTracker.actors.splice(actorIndex, 1);
            localStorage.setItem('currentInitiativeTracker', JSON.stringify(this.$store.state.currentInitiativeTracker))
        },
        clearTracker: function() {
            this.$store.dispatch('clearCurrentTracker');
            this.showConfirmClearTracker = false;
        },
        stopInit: function() {
            this.$store.dispatch('changeInitiative', 'stop');
        },
    },
    computed: {
        ...mapGetters(['currentTrackerActors', 'isSignedIn'])
    },
    mounted() {
        if(this.isSignedIn) {
            this.$store.dispatch('retrieveSavedActors');
        }
    }
}
</script>

<style>
    .h-fixed {
        height: calc(100vh - 4.5rem);
        position: fixed;
        overflow-y: scroll;
    }

    .actor-list-enter-active, .actor-list-leave-active {
        transition: all 0.3s;
    }

    .actor-list-enter, .actor-list-leave-to {
        opacity: 0;
        transform: translateX(100px);
    }

    .actor-list-move {
        transition: transform 0.5s;
    }

    .bg-trans {
        background-color: #00000080;
        z-index: 9999;
    }

    .actor-ghost {
        opacity: 1;
        height: 50px;
        visibility: hidden;
    }

    .actor-chosen {
        cursor: grabbing;
    }

    .actor-drag {
        opacity: 1;
    }
</style>