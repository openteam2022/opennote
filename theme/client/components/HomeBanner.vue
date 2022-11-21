<script setup lang="ts">
import AutoLink from './AutoLink.vue'
import {
  ClientOnly,
  usePageFrontmatter,
  useSiteLocaleData,
  withBase,
} from '@vuepress/client'
import { isArray } from '@vuepress/shared'
import type { FunctionalComponent } from 'vue'
import { computed, h } from 'vue'
import type { DefaultThemeHomePageFrontmatter } from '../../shared/index.js'
import { useDarkMode } from '../composables/index.js'

const frontmatter = usePageFrontmatter<DefaultThemeHomePageFrontmatter>()
const siteLocale = useSiteLocaleData()
const isDarkMode = useDarkMode()

const heroImage = computed(() => {
  if (isDarkMode.value && frontmatter.value.heroImageDark !== undefined) {
    return frontmatter.value.heroImageDark
  }
  return frontmatter.value.heroImage
})

const heroText = computed(() => {
  if (frontmatter.value.heroText === null) {
    return null
  }
  return frontmatter.value.heroText || siteLocale.value.title || 'Hello'
})
const heroHeight = computed(()=>{
    return frontmatter.value.heroHeight || 300
})
const heroAlt = computed(
  () => frontmatter.value.heroAlt || heroText.value || 'hero'
)

const tagline = computed(() => {
  if (frontmatter.value.tagline === null) {
    return null
  }
  return (
    frontmatter.value.tagline || "当你想要放弃的时候，想想当初为什么要开始？" || siteLocale.value.description ||
    'Welcome to your VuePress site'
  )
})

const actions = computed(() => {
  if (!isArray(frontmatter.value.actions)) {
    return []
  }

  return frontmatter.value.actions.map(({ text, link, type = 'primary' }) => ({
    text,
    link,
    type,
  }))
})

const HomeHeroImage: FunctionalComponent = () => {
  if (!heroImage.value) return null
  const img = h('img', {
    src: withBase(heroImage.value),
    alt: heroAlt.value,
    class: 'banner-img'
  })
  if (frontmatter.value.heroImageDark === undefined) {
    return img
  }
  // wrap hero image with <ClientOnly> to avoid ssr-mismatch
  // when using a different hero image in dark mode
  return h(ClientOnly, () => img)
}
</script>

<template>
    <header class="banner" :style="{height: heroHeight +'px'}">
        <div>
          <!-- <HomeHeroImage /> -->
        <div class="banner-text">
                <h1 v-if="heroText" id="main-title">
                {{ heroText }}
                </h1>
                <p v-if="tagline" class="description">
                {{ tagline }}
                </p>
        </div>
        </div>
    </header>
</template>

<style lang="css">
  .banner{
    box-sizing: border-box;
    margin-top: var(--navbar-height);   
    width:100%;
    position: relative;
    background: #111;
  }
  .banner-text{
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 9;
      transform: translate(-50%,-50%);
      color: #fff;
      text-align: center;
      width: 80%;
  }
  #main-title{
    font-size: 50px;
    color: #fff;
  }
  .description{
    font-size: 30px;
    color: #fff;
  }
  #main-title,.description{
    position: relative;
    animation: bannerBox 1s linear 0s;
  }
  @keyframes bannerBox{
    0%{
        top: 700px;
        opacity: 0;
    }
    100%{
        top: 0px;
        opacity: 1;
    }
  }
  .banner-img{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  @media (max-width: 769px){
    #main-title{
      font-size: 35px;
    }
    .description{
      font-size: 18px;
    }
  }
</style>
