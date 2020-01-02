<template>
    <tr>
        <td class="border px-4 py-2">
            {{actor.actor_name}} {{actor.initiative_modifier ? actor.initiative_modifier > 0 ? `(+${actor.initiative_modifier})` : `(-${actor.initiative_modifier})` : '(+0)'}}
        </td>
        <td class="border px-4 py-2" :style="{width: '50px'}">
            <div class="w-full flex justify-center">
                <input type="number" class="w-full shadow px-2 py-1" :style="{width: '50px'}" v-model="initiative" @change="updateInitiative">
            </div>
        </td>
    </tr>
</template>

<script>
export default {
    props: {
        actor: Object,
    },
    data: function() {
        return {
            initiative: this.rollInit(),
        }
    },
    methods: {
        rollInit() {
            let roll1 = this.roll20();
            if(this.actor.initiative_advantage) {
                let roll2 = this.roll20();
                if(roll1 > roll2) return roll1;
                else return roll2;
            }
            return roll1;
        },
        updateInitiative() {
            this.$store.dispatch('updateInitiative', {actorId: this.actor.id, initiative: this.initiative})
        },
        roll20() {
            return Math.floor(Math.random() * Math.floor(20)) + 1 + Number(this.actor.initiative_modifier || 0);
        }
    },
    mounted() {
        this.$store.dispatch('updateInitiative', {actorId: this.actor.id, initiative: this.initiative})
    },
}
</script>

<style>

</style>