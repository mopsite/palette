<script setup>
import { ref } from 'vue'
import { storage } from './utils/index.js'
import Main from './components/Main.vue'

const isDark = ref(storage.get('palette-isDark') || false)
const titleClick = () => {
  isDark.value = !isDark.value
  storage.set('palette-isDark', isDark.value)
}
</script>

<template>
  <div class="container" :class="{ dark: isDark }">
    <header>
      <h1 @click="titleClick">Color Palette</h1>
      <h2>design by <a href="mailto:37662788@qq.com">Paul</a></h2>
    </header>
    <Main />
  </div>
</template>

<style scoped>
.container {
  min-height: 100vh;
  padding: 2rem;
  color: #444;
  background: #f0f0f0;
  transition:
    color 0.3s ease,
    background 0.3s ease;

  header {
    text-align: center;

    h1 {
      display: inline-block;
      font-size: 1.8rem;
      cursor: pointer;
    }

    h2 {
      font-size: 1.1rem;
      font-weight: 300;

      a {
        color: #eb4d4b;
        transition: color 0.3s ease;
        @media (pointer: fine) {
          &:hover {
            color: #fd79a8;
          }
        }
      }
    }
  }

  &.dark {
    color: #eee;
    background: #444;

    :deep(select) {
      color: #eee;
    }
  }
}
</style>
