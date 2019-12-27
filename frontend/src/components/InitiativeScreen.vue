<template>                                                      
    <div class="bg-gray-100 w-full max-w-3xl">
        <div class="flex items-center justify-between m-2 mt-3 mb-4">
            <div>
                <span class="text-lg font-light">Jason's Party</span> 
            </div>
            <div>
                <span class="text-lg font-light">Party Code: </span><span class="text-lg font-medium">DOGE</span>
            </div>
        </div>
        <AddActor />
        <div class="flex justify-end">
            <button class="rounded border border-green-600 p-1 px-3 text-green-600 font-thin uppercase mr-2">
                Add Actor
            </button>
            <button @click="nextTurn()" class="rounded border bg-green-600 p-1 px-3 text-white font-thin uppercase hover:bg-green-500 mr-2">
                Next Turn
            </button>
        </div>
        
        <draggable v-model="actors" @start="drag=true" @end="drag=false" :options="{delay:400, delayOnTouchOnly: true}" class="pt-10 pb-10" v-if="actors">
            <transition-group name="actor-list" tag="div">
                <Actor v-on:deleteActor="deleteActor" v-for="n in actors.length" :actor="actors[n-1]" :index="n - 1" :key="actors[n-1].id" />
            </transition-group>
        </draggable>
        <div v-else>
            Add actors to track
        </div>
    </div>
</template>

<script>
import Actor from './Actor.vue'
import AddActor from './AddActor.vue';
import draggable from 'vuedraggable'

export default {
    data() {
        return {
            actors: [
                {
                    characterName: 'Dacke Silentstep',
                    playerName: 'Davin',
                    passivePerception: 20,
                    passiveInvestigation: 21,
                    passiveInsight: 10,
                    armorClass: 17,
                    currentHitPoints: 94,
                    totalHitPoints: 94,
                    alignment: 'NG',
                    class: ['rogue'],
                    race: 'halfling',
                    level: 13,
                    initiativeModifier: 5,
                    initiative: 20,
                    id: 0,
                    accentColor: 'red-400',
                },
                {
                    characterName: 'Carhan',
                    playerName: 'Scott',
                    passivePerception: 20,
                    passiveInvestigation: 15,
                    passiveInsight: 20,
                    armorClass: 15,
                    currentHitPoints: 94,
                    totalHitPoints: 94,
                    alignment: 'NG',
                    class: ['rogue', 'bard'],
                    race: 'tabaxi',
                    level: 13,
                    initiativeModifier: 9,
                    initiative: 20,
                    id: 1,
                },
                {
                    characterName: 'Ladybug',
                    playerName: 'Carma',
                    passivePerception: 10,
                    passiveInvestigation: 10,
                    passiveInsight: 10,
                    armorClass: 16,
                    currentHitPoints: 108,
                    totalHitPoints: 108,
                    alignment: 'NG',
                    class: ['fighter'],
                    race: 'firbolg',
                    level: 13,
                    initiativeModifier: 6,
                    initiative: 20,
                    id: 2,
                    accentColor: 'teal-600',
                },
                {
                    characterName: 'Stavinn Shadowgrave',
                    playerName: 'Leon',
                    passivePerception: 22,
                    passiveInvestigation: 29,
                    passiveInsight: 12,
                    armorClass: 14,
                    currentHitPoints: 83,
                    totalHitPoints: 83,
                    alignment: 'NG',
                    class: ['wizard', 'rogue'],
                    race: 'human',
                    level: 13,
                    initiativeModifier: 6,
                    initiative: 20,
                    id: 3,
                    accentColor: 'indigo-600',
                },
                {
                    characterName: 'Venzana',
                    playerName: 'Simon',
                    passivePerception: 17,
                    passiveInvestigation: 9,
                    passiveInsight: 12,
                    armorClass: 14,
                    currentHitPoints: 135,
                    totalHitPoints: 135,
                    alignment: 'NG',
                    class: ['barbarian'],
                    race: 'centaur',
                    level: 13,
                    initiativeModifier: 1,
                    initiative: 20,
                    id: 4,
                    accentColor: 'orange-600',
                },
            ],
            menuOpen: false,
        }
    },
    components: {
        Actor,
        draggable,
        AddActor,
    },
    methods: {
        nextTurn: function() {
            this.actors.push(this.actors[0]);
            this.actors.splice(0,1);
        },
        deleteActor: function(actorIndex) {
            this.actors.splice(actorIndex, 1)
        },
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
</style>