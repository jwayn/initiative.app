<template>
  <div class="flex flex-col pb-3 pl-3 pr-3 overflow-y-hidden actor-full-data">

    <button @click="showEditActor = !showEditActor" class="mb-1 self-end" title="Edit Actor">
      <svg class="text-gray-500 fill-current mb-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path d="M21 6.757l-2 2V4h-9v5H5v11h14v-2.757l2-2v5.765a.993.993 0 0 1-.993.992H3.993A1 1 0 0 1 3 20.993V8l6.003-6h10.995C20.55 2 21 2.455 21 2.992v3.765zm.778 2.05l1.414 1.415L15.414 18l-1.416-.002.002-1.412 7.778-7.778z"/>
      </svg>
    </button>

    <div class="my-2">
      <span class="text-gray-700 text-sm font-bold">
        {{actor.alignment}} {{actor.level ? `Level ${actor.level}` : ''}} {{actor.race}} {{actor.actor_class}}
      </span>
    </div>
    
    <div v-if="actor.initiative_modifier !== null || actor.initiative_advantage === true || actor.initiative_advantage === false">
      <div v-if="actor.initiative_modifier !== null" class="text-sm text-gray-800">
        Initiative Modifier: {{actor.initiative_modifier > 0 ? `+${actor.initiative_modifier}` : actor.initiative_modifier}}
      </div>
      <div v-if="actor.initiative_advantage === true || actor.initiative_advantage === false" class="text-sm text-gray-800">
        Initiative Advantage: {{actor.initiative_advantage}}
      </div>
    </div>

    <!-- stats -->
    <div v-if="actor.strength || actor.dexterity || actor.constitution || actor.intelligence || actor.wisdom || actor.charisma" class="flex flex-col my-2">
      <p class="text-sm text-gray-600">Attributes</p>
      <div v-if="actor.strength || actor.dexterity || actor.constitution" class="flex flex-row justify-around my-2">
        <div class="flex flex-col items-center justify-start">
          <span class="text-xs text-gray-700">STR</span>
          <span class="text-sm font-semibold text-gray-900">{{actor.strength || 'N/A'}}</span>
        </div>

        <div class="flex flex-col items-center justify-start">
          <span class="text-xs text-gray-700">DEX</span>
          <span class="text-sm font-semibold text-gray-900">{{actor.dexterity || 'N/A'}}</span>
        </div>

        <div class="flex flex-col items-center justify-start">
          <span class="text-xs text-gray-700">CON</span>
          <span class="text-sm font-semibold text-gray-900">{{actor.constitution || 'N/A'}}</span>
        </div>
      </div>

      <div v-if="actor.intelligence || actor.wisdom || actor.charisma" class="flex flex-row justify-around my-2">
        <div class="flex flex-col items-center justify-start">
          <span class="text-xs text-gray-700">INT</span>
          <span class="text-sm font-semibold text-gray-900">{{actor.intelligence || 'N/A'}}</span>
        </div>

        <div class="flex flex-col items-center justify-start">
          <span class="text-xs text-gray-700">WIS</span>
          <span class="text-sm font-semibold text-gray-900">{{actor.wisdom || 'N/A'}}</span>
        </div>

        <div class="flex flex-col items-center justify-start">
          <span class="text-xs text-gray-700">CHA</span>
          <span class="text-sm font-semibold text-gray-900">{{actor.charisma || 'N/A'}}</span>
        </div>
      </div>
    </div>

    <!-- Passives -->
    <div v-if="actor.passive_perception || actor.passive_insight || actor.passive_investigation" class="flex flex-col my-2">
      <p class="text-sm text-gray-600">Passive</p>
      <div class="flex flex-row justify-around my-2">
        <div class="flex flex-col items-center justify-start">
          <span class="text-xs text-gray-700">Perception</span>
          <span class="text-sm font-semibold text-gray-900">{{actor.passive_perception || 'N/A'}}</span>
        </div>

        <div class="flex flex-col items-center justify-start">
          <span class="text-xs text-gray-700">Investigation</span>
          <span class="text-sm font-semibold text-gray-900">{{actor.passive_investigation || 'N/A'}}</span>
        </div>

        <div class="flex flex-col items-center justify-start">
          <span class="text-xs text-gray-700">Insight</span>
          <span class="text-sm font-semibold text-gray-900">{{actor.passive_insight || 'N/A'}}</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    actor: Object,
  }
}
</script>

<style>
  .actor-full-data {
    max-height: 500px;
  }
</style>