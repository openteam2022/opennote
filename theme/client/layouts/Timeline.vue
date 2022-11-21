<template>
    <Common>
        <Transition
        v-if="timeline == 'timeline'"
        name="fade-slide-y"
        mode="out-in"
        @before-enter="onBeforeEnter"
        @before-leave="onBeforeLeave"
        >
            <div class="timeline" > 
                <h3 class="timeline-header">
                    归档
                </h3>
                <ul class="timeline-list">
                    <li class="timeline-list-item" v-for="(item) in timelineData">
                        <p class="timeline-list-item-title">{{item.name}}</p>
                        <ul class="timeline-list-item-list">
                            <li class="tlil-item" v-for="i in item.data">
                                <a :href="i.path">
                                    <p><span>{{i.title}}</span></p>
                                    <p><span>{{i.frontmatter.date.substring(5,10)}}</span></p>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </Transition>
    </Common>
</template>

<script setup lang="ts">

import { usePageData, usePageFrontmatter } from '@vuepress/client'
import type { DefaultThemePageFrontmatter } from '../../shared/index.js'
import {
  useScrollPromise,
} from '../composables/index.js'
import {computed,ref} from 'vue'
import BlogList from '../components/BlogList.vue'
import {pagesData} from '@temp/pagesData.js'

const page = usePageData()
const frontmatter = usePageFrontmatter<DefaultThemePageFrontmatter>()

const timeline = computed(()=>{
    return page.value.frontmatter.layout;
})
// handle scrollBehavior with transition
const scrollPromise = useScrollPromise()
const onBeforeEnter = scrollPromise.resolve
const onBeforeLeave = scrollPromise.pending

let timelineData = ref(null)



const filterTimeline = (data)=>{
    let pageData = {};
    data.forEach(page=>{
        let time = page.frontmatter.date.substring(0,4)
        if(pageData[time]){
            pageData[time].push(page);
        }else{
            pageData[time] = [page];
        }
    })
    let array = [];
    for(let i in pageData){
        let item = {
            name: i,
            data: pageData[i]
        }
        array.unshift(item)
    }
    return array;
}
timelineData.value = filterTimeline(pagesData);

</script>

<style>
    .timeline{
        padding-top: var(--navbar-height);
        max-width: var(--content-width);
        margin: 1rem auto;
    }
    .timeline-header{
        border-bottom: 1px var(--c-border) solid;
        padding-bottom: 1.5rem;
        margin-bottom: 2rem;
        font-weight: 400;
        padding-left: 0.5rem;
    }
    .timeline-list,.timeline-list-item-list{
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .timeline-list-item-title{
        font-size: 1.3rem;
        font-weight: bold;
        line-height: 2rem!important;
        padding-left: 0.5rem;
    }
    .timeline-list-item-list{
        border: 1px #ededed solid;
        box-sizing: border-box;
        padding: 10px 1rem ;
        box-shadow: 0px 2px 10px var(--c-bg-lighter);
    }
    .tlil-item a{
        display: block;
        display: flex;
        justify-content: space-between;
        color: var(--c-text);
        font-size: 15px;
        font-weight: 400;
    }
     .tlil-item a:hover{
       color: var(--c-brand);

    }
    .tlil-item a p{
        padding-top: 5px;
        margin: 5px 0;
    }
     .tlil-item a p:nth-child(1){
        flex: 1;
     }
     .tlil-item a p:nth-child(2){
        width: 70px;
        margin-left: 10px;
        text-align: right;
     }
    @media (max-width: 960px ) {
        .timeline{
            margin: 1rem;
        }
    }
    @media (max-width: 768px ) {
        .timeline{
            flex-direction: column;
        }
    }
    @media (max-width: 419px ) {
        .timeline{
            margin: 0.7rem;
        }
    }
</style>
