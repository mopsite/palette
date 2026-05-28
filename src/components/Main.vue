<script setup>
import { computed, ref, watch } from 'vue'
import data from '../data'
import { storage } from '@/utils/index.js'
import Palette from './Palette.vue'

const currentTitle = ref(storage.get('palette-group') || data[0].title)

watch(currentTitle, newValue => storage.set('palette-group', newValue))

const currentGroup = computed(() =>
  data.find(item => item.title === currentTitle.value)
)

const example1 = data[1].palettes[7]
const example2 = data[4].palettes[3]
const example3 = data[4].palettes[1]
const example4 = data[8].palettes[7]
const example5 = data[2].palettes[3]
const example6 = data[0].palettes[6]
</script>

<template>
  <main>
    <section>
      <select v-model="currentTitle">
        <option v-for="item in data" :value="item.title">
          {{ item.title }}
        </option>
      </select>
      <div class="group">
        <template v-for="palette in currentGroup.palettes">
          <Palette :palette />
        </template>
      </div>
    </section>
    <section>
      <h3>Example</h3>
      <div class="example">
        <Palette :palette="example1" />
        <Palette :palette="example2" :is-square="true" />
        <Palette :palette="example3" :is-round="true" />
        <Palette :palette="example4" :is-big="true" />
        <Palette :palette="example5" :is-big="true" :is-square="true" />
        <Palette :palette="example6" :is-big="true" :is-round="true" />
      </div>
    </section>
  </main>
</template>

<style scoped>
main {
  max-width: 60%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin: 1rem auto;

  section {
    flex: 1;

    select {
      display: block;
      padding: 3px 0;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      border: none;
      outline: none;
      background: transparent;
      box-shadow: none;
      color: #444;
      cursor: pointer;
    }

    h3,
    select {
      margin: 1rem auto;
      font-size: 1.2rem;
      font-weight: 500;
      text-align: center;
    }

    .group {
      display: grid;
      grid-template-columns: repeat(auto-fit, 180px);
      justify-content: center;
      gap: 20px;
    }

    .example {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }
  }
}
</style>
