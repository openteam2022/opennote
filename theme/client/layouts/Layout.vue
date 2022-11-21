<script setup lang="ts">
import Home from '../components/Home.vue'
import HomeBlog from '../components/HomeBlog.vue'
import Page from '../components/Page.vue'
import { usePageData, usePageFrontmatter } from '@vuepress/client'
import type { DefaultThemePageFrontmatter } from '../../shared/index.js'
import {
  useScrollPromise,
} from '../composables/index.js'

const page = usePageData()
const frontmatter = usePageFrontmatter<DefaultThemePageFrontmatter>()


// handle scrollBehavior with transition
const scrollPromise = useScrollPromise()
const onBeforeEnter = scrollPromise.resolve
const onBeforeLeave = scrollPromise.pending

</script>

<template>
    <Common>
        
        <div v-if="frontmatter.home" >
        <!-- <Home v-if/> -->
            <HomeBlog/>
        </div>
       
        <Transition
        v-else
        name="fade-slide-y"
        mode="out-in"
        @before-enter="onBeforeEnter"
        @before-leave="onBeforeLeave"
        >
            <Page :key="page.path"></Page>
        </Transition>
    </Common>
</template>

<style lang="css">
    ::-webkit-scrollbar{
        width: 5px;
        height: 5px;
    }
    ::-webkit-scrollbar-track{
        -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.3);
        background-color:#F5F5F5;
    }
    ::-webkit-scrollbar-thumb{
        -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,.3);
        background-color: #ddd;
    }
</style>
