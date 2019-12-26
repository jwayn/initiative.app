<template>                                                      
    <div class="bg-gray-100 w-full max-w-3xl" v-if="actors">
        <div class="flex items-center justify-between m-2 mt-3 mb-4">
            <div>
                <span class="text-lg font-light">Jason's Party</span> 
            </div>
            <div>
                <span class="text-lg font-light">Party Code: </span><span class="text-lg font-medium">DOGE</span>
            </div>
        </div>
        <div class="flex justify-end">
            <button class="rounded border border-green-600 p-1 px-3 text-green-600 font-thin uppercase mr-2">
                Add Actor
            </button>
            <button @click="nextTurn()" class="rounded border bg-green-600 p-1 px-3 text-white font-thin uppercase hover:bg-green-500 mr-2">
                Next Turn
            </button>
        </div>
        
        <draggable v-model="actors" @start="drag=true" @end="drag=false" class="pt-10 pb-10">
            <!-- <div class="mt-6" v-if="actors.length >= 1">
                <span class="ml-3 text-lg text-gray-500 font-light">
                    Current
                </span>
                <Actor v-on:deleteActor="deleteActor" :actor="actors[0]" :index="0" :key="0" />
            </div>
            <div class="mt-6" v-if="actors.length > 1">
                <span class="ml-3 text-lg text-gray-500 font-light">
                    Up Next
                </span>
                <Actor v-on:deleteActor="deleteActor" :actor="actors[1]" :index="1" :key="1" />
            </div>
            <div class="mt-6" v-if="actors.length > 2">
                <span class="ml-3 text-lg text-gray-500 font-light">
                    Up Later
                </span>
                <Actor v-on:deleteActor="deleteActor" v-for="n in actors.length - 2" :actor="actors[n+1]" :index="n+1" :key="n+1" />
            </div> -->
             <Actor v-on:deleteActor="deleteActor" v-for="n in actors.length" :actor="actors[n-1]" :index="n" :key="actors[n-1].id" />
        </draggable>
    </div>
</template>

<script>
import Actor from './Actor.vue'
import draggable from 'vuedraggable'

export default {
    data() {
        return {
            actors: [
                {
                    characterName: 'Dacke Silentstep',
                    playerName: '0',
                    passivePerception: 20,
                    passiveInvestigation: 21,
                    passiveInsight: 10,
                    armorClass: 17,
                    currentHitPoints: 55,
                    totalHitPoints: 94,
                    alignment: 'NG',
                    class: ['rogue', 'bard'],
                    race: 'halfling',
                    level: 13,
                    initiative: 20,
                    id: 0,
                },
                {
                    characterName: 'Dacke Silentstep',
                    playerName: '1',
                    passivePerception: 20,
                    passiveInvestigation: 21,
                    passiveInsight: 10,
                    armorClass: 17,
                    currentHitPoints: 27,
                    totalHitPoints: 94,
                    alignment: 'NG',
                    class: ['rogue', 'bard'],
                    race: 'halfling',
                    level: 13,
                    initiative: 20,
                    id: 1,
                },
                {
                    characterName: 'Dacke Silentstep',
                    playerName: '2',
                    passivePerception: 20,
                    passiveInvestigation: 21,
                    passiveInsight: 10,
                    armorClass: 17,
                    currentHitPoints: 27,
                    totalHitPoints: 94,
                    alignment: 'NG',
                    class: ['rogue', 'bard'],
                    race: 'halfling',
                    level: 13,
                    initiative: 20,
                    id: 2,
                },
                {
                    characterName: 'Dacke Silentstep',
                    playerName: '3',
                    passivePerception: 20,
                    passiveInvestigation: 21,
                    passiveInsight: 10,
                    armorClass: 17,
                    currentHitPoints: 27,
                    totalHitPoints: 94,
                    alignment: 'NG',
                    class: ['rogue', 'bard'],
                    race: 'halfling',
                    level: 13,
                    initiative: 20,
                    id: 3,
                },
                {
                    characterName: 'Dacke Silentstep',
                    playerName: '4',
                    passivePerception: 20,
                    passiveInvestigation: 21,
                    passiveInsight: 10,
                    armorClass: 17,
                    currentHitPoints: 27,
                    totalHitPoints: 94,
                    alignment: 'NG',
                    class: ['rogue', 'bard'],
                    race: 'halfling',
                    level: 13,
                    initiative: 20,
                    id: 4,
                },
                {
                    characterName: 'Dacke Silentstep',
                    playerName: '5',
                    passivePerception: 20,
                    passiveInvestigation: 21,
                    passiveInsight: 10,
                    armorClass: 17,
                    currentHitPoints: 27,
                    totalHitPoints: 94,
                    alignment: 'NG',
                    class: ['rogue', 'bard'],
                    race: 'halfling',
                    level: 13,
                    initiative: 20,
                    id: 5,
                },
                {
                    characterName: 'Dacke Silentstep',
                    playerName: '6',
                    passivePerception: 20,
                    passiveInvestigation: 21,
                    passiveInsight: 10,
                    armorClass: 17,
                    currentHitPoints: 27,
                    totalHitPoints: 94,
                    alignment: 'NG',
                    class: ['rogue', 'bard'],
                    race: 'halfling',
                    level: 13,
                    initiative: 20,
                    id: 6,
                },
                {
                    characterName: 'Dacke Silentstep',
                    playerName: '7',
                    passivePerception: 20,
                    passiveInvestigation: 21,
                    passiveInsight: 10,
                    armorClass: 17,
                    currentHitPoints: 27,
                    totalHitPoints: 94,
                    alignment: 'NG',
                    class: ['rogue', 'bard'],
                    race: 'halfling',
                    level: 13,
                    initiative: 20,
                    id: 7,
                },
                {
                    characterName: 'Dacke Silentstep',
                    playerName: '8',
                    passivePerception: 20,
                    passiveInvestigation: 21,
                    passiveInsight: 10,
                    armorClass: 17,
                    currentHitPoints: 27,
                    totalHitPoints: 94,
                    alignment: 'NG',
                    class: ['rogue'],
                    race: 'halfling',
                    level: 13,
                    initiative: 20,
                    id: 8,
                }
            ],
            menuOpen: false,
        }
    },
    components: {
        Actor,
        draggable,
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
</style>