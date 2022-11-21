<template>
  <div class="pagation-container">
    <span
      class="jump"
      v-show="currentPage > 1"
      @click="goPrev"
      unselectable="on"
    >
      <svg t="1666086305946" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2551" width="15" height="15"><path d="M377.052007 512l386.3073-388.203486L705.12909 65.290005 318.845327 453.493491l-58.20668 58.506509 58.20668 58.505485 386.283764 388.203486 58.230216-58.506509L377.052007 512zM377.052007 512" p-id="2552" fill="#555555"></path></svg>
    </span>
    <span
      v-show="efont"
      class="jump"
      @click="jumpPage(1)"
    >1</span>
    <span
      class="ellipsis"
      v-show="efont"
    >...</span>
    <span
      class="jump"
      v-for="num in indexs"
      :key="num"
      :class="{active:currentPage == num}"
      @click="jumpPage(num)"
    >{{num}}</span>
    <span
      class="ellipsis"
      v-show="efont && currentPage < tp - 4"
    >...</span>
    <span
      v-show="efont && currentPage < tp - 4"
      class="jump"
      @click="jumpPage(tp)"
    >{{tp}}</span>
    <span
      class="jump"
      v-show="currentPage < tp"
      @click="goNext"
    >
      <svg t="1666086407714" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3567" width="15" height="15"><path d="M260.638647 900.202463l58.230216 58.506509L705.15365 570.505485l58.20668-58.505485-58.20668-58.506509L318.868863 65.290005l-58.230216 58.505485 386.3073 388.203486L260.638647 900.202463zM646.945947 512" p-id="3568" fill="#555555"></path></svg>
    </span>
    <!-- <span class="jumpinput">
      <input type="text" v-model="targetPage">
    </span>
    <span
      class="jump gobtn"
      @click="jumpPage(targetPage)"
    >Go</span> -->
  </div>
</template>

<script setup>
import { computed, ref, toRefs } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 10
  },
  total: {
    type: Number,
    default: 0
  },
  totalPage: {
    type: Number,
    default: 0
  }
})

const emits = defineEmits(['change'])

const targetPage = ref(null)

const tp = computed(() => {
  if (props.totalPage !== 0) return props.totalPage
  return Math.ceil(props.total / props.pageSize)
})

const show = computed(() => {
  return props.tp && props.tp != 1
})

const efont =computed(() => {
  if (tp.value <= 7) return false
  return props.currentPage > 5
})

const indexs = computed(() => {
  const ar = []
  let left = 1
  let right = tp.value
  if (tp.value >= 7) {
    if (props.currentPage > 5 && props.currentPage < tp.value - 4) {
      left = Number(props.currentPage) - 3
      right = Number(props.currentPage) + 3
    } else {
      if (props.currentPage <= 5) {
        left = 1
        right = 7
      } else {
        right = tp.value

        left = tp.value - 6
      }
    }
  }
  while (left <= right) {
    ar.push(left)
    left++
  }
  return ar
})

const jumpPage = (page) => {
  const p = parseInt(page)

  if (p <= tp.value && p > 0) {
    emits('change', page)
    return
  }

  alert(`请输入大于0，并且小于${tp.value}的页码！`)
}

const goPrev = () => {
  let currentPage = props.currentPage
  if (currentPage > 1) {
    emits('change', --currentPage)
  }
}

const goNext = () => {
  let currentPage = props.currentPage
  if (currentPage < tp.value) {
    emits('change', ++currentPage)
  }
}
</script>

<style>
  .pagation-container{
    width: 100%;
    text-align: center;
    padding: 20px 0;
  }
  .jump{
    margin-right: 0.5rem;
    display: inline-block;
    width: 1.2rem;
    cursor: pointer;
    border-radius: 0.25rem;
    background: var(--c-bg);
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    line-height: 2rem;
    --tw-text-opacity: 1;
    color: var(--c-text);
    margin-bottom: 15px;
    box-shadow: 0 1px 5px var(--c-bg-arrow);
  }
  .active{
    background: var(--c-brand-light);
    color: #fff;
    box-shadow: 0 1px 5px var(--c-bg-arrow);
  }
  .jumpinput{
    margin-right: 0.5rem;
    display: inline-block;
    max-width: 6rem;
    cursor: pointer;
    color: var(--c-text);
    position: relative;
    box-sizing: border-box;
    top: -3px;
    padding-right: 5px;
  }
  .jumpinput input{
    width: 100%;
    height: 1.7rem;
    color: var(--c-brand-light);
    border: 2px var(--c-brand-light) solid;
    border-radius: 0.25rem;
    box-sizing: border-box;
    padding: 0 5px;
  }
  .jumpinput input:focus{
    border: 2px var(--c-brand-light) solid;
  }
</style>