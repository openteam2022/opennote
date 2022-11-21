<template>
  <main class="page">
    <slot name="top" />
    <div class="theme-default-content">
      <slot name="content-top" />
      <PageHeader v-if="!frontmatter.pageInfo"/>
      <div class="page-content-title">
          <div class="page-content-title-text">
              {{frontmatter.title}}
          </div>
          <PageInfo v-if="!frontmatter.pageInfo" :data="data"/>
      </div>
      <Content />
    </div>

    <PageMeta />

    <PageNav />

    <slot name="bottom" />
  </main>
</template>

<script setup lang="ts">
import PageMeta from './PageMeta.vue'
import PageNav from './PageNav.vue'
import PageHeader from './PageHeader.vue'
import PageInfo from './PageInfo.vue'
import {
      ClientOnly,
      usePageFrontmatter,
      useSiteLocaleData,
      withBase,
    } from '@vuepress/client'
import {
  useSidebarItems,
  useThemeLocaleData,
} from '../composables/index.js'

import {computed} from 'vue'

const frontmatter = usePageFrontmatter();
const theme = useThemeLocaleData()
const author = computed(()=>{
  return frontmatter.author || theme.value.author
})
const data = computed(()=>{
  let pageData = {
      frontmatter: frontmatter.value,
      author: author.value
  }
  return pageData
})

</script>

<style type="text/css">
  
  .page{
    padding-left: none!important;
    overflow: hidden;
  }
  .page-content-title{
      margin-bottom: 30px;
  }
  .page-content-title-text{
      padding: 20px 0;
      font-size: 36px;
      font-weight: bold;
      line-height: 70px;
      padding-bottom: 0px;
     
  }
  @media (max-width: 419px){
    .page-content-title{
      margin-bottom: 20px;
  }
   .page-content-title-text{
      padding: 20px 0;
      font-size: 30px;
      font-weight: bold;
      line-height: 60px;
      padding-bottom: 0px;
      padding-top: 10px;
     
  }
    .page .theme-default-content {
        padding: 0 0.9rem!important; 
    }
  }
</style>