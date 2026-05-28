<script setup>
import { ref } from 'vue'
import { copyToClipboard } from '@/utils'

const props = defineProps({
  palette: {
    type: Object,
    default: () => ({ title: '', colors: [] })
  },
  isBig: {
    type: Boolean,
    default: false
  },
  isSquare: {
    type: Boolean,
    default: false
  },
  isRound: {
    type: Boolean,
    default: false
  }
})

const isShow = ref(false)
let timer = null

const copyClick = text => {
  if (timer) clearTimeout(timer)
  copyToClipboard(text)
  isShow.value = true
  timer = setTimeout(() => {
    isShow.value = false
    timer = null
  }, 1000)
}
</script>

<template>
  <div
    class="palette"
    :class="{ big: isBig, square: isSquare, round: isRound }"
  >
    <div class="colors">
      <div
        @click="copyClick(palette.colors[0])"
        :style="{ background: palette.colors[0] }"
      ></div>
      <div
        @click="copyClick(palette.colors[1])"
        :style="{ background: palette.colors[1] }"
      ></div>
      <span class="tip" v-if="isShow">Copied!</span>
    </div>
    <div class="info">
      <h4>{{ palette.title }}</h4>
      <p>{{ palette.colors.join(', ') }}</p>
    </div>
  </div>
</template>

<style scoped>
.palette {
  --palette-width: 180px;
  --palette-height: 100px;
  --palette-radius: 10px;

  width: var(--palette-width);
  height: var(--palette-height);
  border-radius: var(--palette-radius);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.5);
  overflow: hidden;

  & > div {
    height: 50%;
  }

  .colors {
    position: relative;
    display: flex;

    & > div {
      flex: 1;
      cursor: pointer;
      @media (pointer: fine) {
        &:hover {
          filter: brightness(102%);
        }
      }
    }

    .tip {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 65px;
      height: 25px;
      color: #fff;
      line-height: 25px;
      text-align: center;
      background: #333;
      border-radius: 2px;
      transform: translate(-50%, -50%);

      &::before {
        content: '';
        position: absolute;
        top: -4px;
        left: 50%;
        width: 8px;
        height: 8px;
        background: #333;
        transform: translateX(-50%) rotate(45deg);
      }
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5px 15px;
    font-size: 12px;
    background: #fff;

    h4 {
      color: #444;
      font-size: 1.1em;
    }

    p {
      color: #aaa;
    }
  }

  &.big {
    --palette-width: 260px;
  }

  &.square {
    --palette-height: var(--palette-width);
  }

  &.round {
    --palette-height: var(--palette-width);
    --palette-radius: 50%;
  }

  &.big.square,
  &.big.round {
    .info {
      font-size: 14px;
    }
  }
}
</style>
