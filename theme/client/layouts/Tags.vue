<template>
    <Common>
        <Transition
        v-if="tags == 'tags'"
        name="fade-slide-y"
        mode="out-in"
        @before-enter="onBeforeEnter"
        @before-leave="onBeforeLeave"
        >
            <div class="tags" > 
                <div class="tags-header">
                    <Tabs :currentTabs="chooseTags" :data="tagsList[1]" @changeTabs="change"/>
                </div>
                <BlogList :data="data"/>
            </div>
        </Transition>
    </Common>
</template>

<script setup lang="ts">
import OpenTransition from '../components/OpenTransition.vue'
import { usePageData, usePageFrontmatter } from '@vuepress/client'
import type { DefaultThemePageFrontmatter } from '../../shared/index.js'
import { useScrollPromise,} from '../composables/index.js'
import {computed,onMounted,ref} from 'vue'
import BlogList from '../components/BlogList.vue'
import Tabs from '../components/Tabs.vue'

import comm from '../utils/comm.js'
import { useStore } from "vuex";

import {tagsData} from '@temp/tagsData.js'

const store = useStore()

const tagsBlogData = tagsData;

const tagsList = computed(()=>{
    let i = 0;
    let data = [];
    let tagsIndexlist = {}
    let tagsKeylist = {}

    for(let item in tagsBlogData){
        if(i == 0){
            store.commit('updateTags', item);
            data[0] = item;
        }
        tagsIndexlist[i] = item;
        tagsKeylist[item] = i;
        i+= 1;
    }
    data[1] = tagsIndexlist;
    data[2] = tagsKeylist
    return data;
})
let chooseTags = ref(0)
let data = ref(null)
const indexList = tagsList.value[1];
const keyList = tagsList.value[2];

data.value = tagsBlogData[indexList[chooseTags.value]];

const page = usePageData()
const frontmatter = usePageFrontmatter<DefaultThemePageFrontmatter>()


const tags = computed(()=>{
    return page.value.frontmatter.layout;
})

// handle scrollBehavior with transition
const scrollPromise = useScrollPromise()
const onBeforeEnter = scrollPromise.resolve
const onBeforeLeave = scrollPromise.pending

onMounted(()=>{
    store.commit('updatePageHeader','home');

    comm.on('updateCurrentTags',()=>{
        data.value = tagsBlogData[store.state.tags]; 
        store.commit('updatePageHeader','tags');
        chooseTags.value = keyList[store.state.tags]
    })
})
const change = (tags)=>{
    data.value = tagsBlogData[tags]
    store.commit('updateTags',tags);

}

</script>


<style>
    .tags{
        padding-top: var(--navbar-height);
        max-width: var(--content-width);
        margin: 1rem auto;
        padding-bottom: 50px;
    }
    @media (max-width: 960px ) {
        .tags{
            margin: 1rem;
        }
    }
    @media (max-width: 768px ) {
        .tags{
            flex-direction: column;
        }
    }
    @media (max-width: 419px ) {
        .tags{
            margin: 0.7rem;
        }
    }
</style>
