<script setup lang="ts">
import HomeContent from './HomeContent.vue'
import HomeFeatures from './HomeFeatures.vue'
import HomeFooter from './HomeFooter.vue'
import HomeSection from './HomeSection.vue'
import HomeBanner from './HomeBanner.vue'
import {
      ClientOnly,
      usePageFrontmatter,
      useSiteLocaleData,
      withBase,
    } from '@vuepress/client'

const frontmatter = usePageFrontmatter();
</script>

<template>
  <main class="home-blog">
    <HomeBanner/>
    <HomeContent />
    <HomeSection/>
    <HomeFooter />
  </main>
</template>

<style>
  .home-blog{
    
  }
</style>
