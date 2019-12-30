<template>
  <div class="px-2">
    <form class="my-4">
      <div class="mb-4 flex">
        <input
          class="shadow border rounded py-2 px-3 mr-2"
          id="initiativeAdvantage"
          type="checkbox"
          v-model="actor.npc"
        />
        <label
          class="block text-gray-600 text-sm font-bold leading-none"
          for="initiativeAdvantage"
        >
          NPC?
        </label>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-600 text-sm font-bold mb-2"
          :class="characterNameFailedValidation ? 'text-red-600' : ''"
          for="characterName"
        >
          Character Name (required)
        </label>
        <input
          @change="verifyForm"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          :class="characterNameFailedValidation ? 'border-red-600' : ''"
          id="characterName"
          type="text"
          placeholder="Character Name"
          v-model="actor.actor_name"
        />
      </div>

      <div v-if="!actor.npc" class="mb-4">
        <label
          class="block text-gray-600 text-sm font-bold mb-2"
          for="playerName"
        >
          Player Name
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="playerName"
          type="text"
          placeholder="Player Name"
          v-model="actor.player_name"
        />
      </div>

      <div class="mb-4">
        <label class="block text-gray-600 text-sm font-bold mb-2" for="imageURL">
          Image URL
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="imageURL"
          type="text"
          placeholder="http://image.url/image.png"
          v-model="actor.image_url"
        />
      </div>

      <div class="mb-4 flex justify-between">
        <div class="mr-2 sm:w-1/2">
          <label
            class="block text-gray-600 text-sm font-bold mb-2 leading-none"
            for="armorClass"
          >
            AC
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="armorClass"
            type="number"
            v-model="actor.armor_class"
          />
        </div>

        <div class="sm:w-1/2">
          <label
            class="block text-gray-600 text-sm font-bold mb-2 leading-none"
            for="hitPoints"
          >
            HP
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="hitPoints"
            type="number"
            v-model="actor.total_hit_points"
          />
        </div>
      </div>

      <div class="mb-4 flex justify-between items-center">
        <div class="mr-2 w-1/2">
          <label
            class="block text-gray-600 text-sm font-bold mb-2 leading-none"
            for="initiativeModifier"
          >
            Initiative Modifier
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="initiativeModifier"
            type="number"
            v-model="actor.initiative_modifier"
          />
        </div>

        <div class="sm:w-1/2 sm:ml-4 flex items-center">
          <input
            class="shadow border rounded py-2 px-3 mr-2"
            id="initiativeAdvantage"
            type="checkbox"
            v-model="actor.initiative_advantage"
          />
          <label
            class="block text-gray-600 text-sm font-bold leading-none"
            for="initiativeAdvantage"
          >
            Initiative Advantage
          </label>
        </div>
      </div>

      <div class="mb-4 flex justify-between">
        <div class="mr-2 sm:w-1/2">
          <label
            class="block text-gray-600 text-sm font-bold mb-2 leading-none"
            title="Comma separated if multiple classes"
            for="charClass"
          >
            Class(es)
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="class"
            type="text"
            v-model="actor.actor_class"
          />
        </div>

        <div class="sm:w-1/2">
          <label
            class="block text-gray-600 text-sm font-bold mb-2 leading-none"
            for="race"
          >
            Race
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="race"
            type="text"
            v-model="actor.race"
          />
        </div>
      </div>

      <div class="mb-4 flex justify-between">
        <div class="w-1/2 mr-2">
          <label
            class="block text-gray-600 text-sm font-bold mb-2 leading-none"
            for="level"
          >
            Level
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="level"
            type="number"
            v-model="actor.level"
          />
        </div>

        <div class="w-1/2">
          <label
            class="block text-gray-600 text-sm font-bold mb-2 leading-none"
            for="level"
          >
            Alignment
          </label>
          <div class="inline-block relative w-full">
            <select
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="alignment"
              v-model="actor.alignment"
            >
              <option value="LG">Lawful Good</option>
              <option value="NG">Neutral Good</option>
              <option value="CG">Chaotic Good</option>
              <option value="LN">Lawful Neutral</option>
              <option value="N">True Neutral</option>
              <option value="CN">Chaotic Neutral</option>
              <option value="LE">Lawful Evil</option>
              <option value="NE">Neutral Evil</option>
              <option value="CE">Chaotic Evil</option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
            >
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Attributes -->
      <div class="mb-4">
        <p
          class="text-gray-600 text-sm font-bold w-full border-b border-gray-300 mb-3 mt-8"
        >
          Attributes
        </p>

        <div class="flex justify-between mb-2">
          <div class="w-1/2 mr-2">
            <label
              class="block text-gray-600 text-sm font-bold mb-2 leading-none"
              for="strength"
            >
              STR
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="strength"
              type="number"
              v-model="actor.strength"
            />
          </div>

          <div class="w-1/2 mr-2">
            <label
              class="block text-gray-600 text-sm font-bold mb-2 leading-none"
              for="dexterity"
            >
              DEX
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="dexterity"
              type="number"
              v-model="actor.dexterity"
            />
          </div>

          <div class="w-1/2">
            <label
              class="block text-gray-600 text-sm font-bold mb-2 leading-none"
              for="constitution"
            >
              CON
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="constitution"
              type="number"
              v-model="actor.constitution"
            />
          </div>
        </div>

        <div class="flex justify-between">
          <div class="w-1/2 mr-2">
            <label
              class="block text-gray-600 text-sm font-bold mb-2 leading-none"
              for="intelligence"
            >
              INT
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="intelligence"
              type="number"
              v-model="actor.intelligence"
            />
          </div>

          <div class="w-1/2 mr-2">
            <label
              class="block text-gray-600 text-sm font-bold mb-2 leading-none"
              for="wisdom"
            >
              WIS
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="wisdom"
              type="number"
              v-model="actor.wisdom"
            />
          </div>

          <div class="w-1/2">
            <label
              class="block text-gray-600 text-sm font-bold mb-2 leading-none"
              for="charisma"
            >
              CHA
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="charisma"
              type="number"
              v-model="actor.charisma"
            />
          </div>
        </div>
      </div>
      <!-- End Stats -->

      <!-- Passives -->
      <div class="mb-4">
        <p
          class="text-gray-600 text-sm font-bold w-full border-b border-gray-300 mb-3 mt-8"
        >
          Passives
        </p>

        <div class="flex justify-between mb-2">
          <div class="w-1/2 mr-2">
            <label
              class="block text-gray-600 text-sm font-bold mb-2 leading-none"
              for="passivePerception"
            >
              Perception
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="passivePerception"
              type="number"
              v-model="actor.passive_perception"
            />
          </div>

          <div class="w-1/2 mr-2">
            <label
              class="block text-gray-600 text-sm font-bold mb-2 leading-none"
              for="passiveInvestigation"
            >
              Investigation
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="passiveInvestigation"
              type="number"
              v-model="actor.passive_investigation"
            />
          </div>

          <div class="w-1/2">
            <label
              class="block text-gray-600 text-sm font-bold mb-2 leading-none"
              for="passiveInsight"
            >
              Insight
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="passiveInsight"
              type="number"
              v-model="actor.passive_insight"
            />
          </div>
        </div>
      </div>
      <!-- End Passives -->

      <ColorPicker :selectedColor="actor.accent_color" v-on:pickColor="pickColor" />

      <div class="w-full flex justify-around mt-8 pb-4">
        <button
          @click.prevent="$emit('closeEditActor');"
          class="border border-green-700 rounded text-green-700 px-2 py-1 w-64 mx-2"
          :class="saveActorFailed ? 'bg-red-600' : ''"
        >
          Cancel
        </button>

        <button
          @click.prevent="updateActor"
          class="bg-green-700 rounded text-white px-2 py-1 w-64 mx-2"
          :class="saveActorFailed ? 'bg-red-600' : ''"
        >
          Save
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import ColorPicker from './ColorPicker';

export default {
  props: {
      propsActor: Object
  },
  components: {
      ColorPicker,
  },
  methods: {
    pickColor: function(color) {
      this.actor.accent_color = color;
    },
    verifyForm: function() {
      if(this.actor.actor_name.trim().length < 1) {
        this.characterNameFailedValidation = true;
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        this.characterNameFailedValidation = false;
      }
    },
    updateActor: function() {
      this.verifyForm();
      if(!this.characterNameFailedValidation) {
        this.$store.dispatch('saveEditedActor', this.actor).then(res => {
          if(res) {
            this.$emit('closeEditActor');
          } else {
            this.saveActorFailed = true;
          }
        })
      }
    }
  },
  data() {
    return {
      actor: {
        ...this.propsActor
      },
      filter: 'all',
      showActorAdd: false,
      saveActorFailed: false,
      characterNameFailedValidation: false,
    }
  },
};
</script>

<style></style>
