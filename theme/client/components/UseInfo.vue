<script lang="ts" setup>
    import type { FunctionalComponent } from 'vue'
    import { computed, h } from 'vue'
    import {
      ClientOnly,
      useSiteLocaleData,
      withBase,
    } from '@vuepress/client'
    import { useThemeLocaleData } from '../composables/index.js'

    import {categoryData} from '@temp/categoryData.js'
    import {tagsData} from '@temp/tagsData.js'
    import {pagesData} from '@temp/pagesData.js'
    import {useRouter} from 'vue-router'
    import { useStore } from "vuex";

    const themeData = useThemeLocaleData();
    const avatorImage = computed(() => {
        return themeData.value.avator || themeData.value.logo || null
    })
    const AvatorImage: FunctionalComponent = () => {
        if (!avatorImage) return null
        const img = h('img', {
            src: withBase('/imgs/opennote.jpg'),
            class: 'avator-image'
        })
        // wrap hero image with <ClientOnly> to avoid ssr-mismatch
        // when using a different hero image in dark mode
        return h(ClientOnly, () => img)
    } 
    const author = computed(()=>{
        return themeData.value.author;
    })
    const summary = computed(()=>{
        return themeData.value.summary;
    })
    const friends = computed(()=>{
        return themeData.value.friends;
    })
    const category = categoryData;
    const tags = tagsData;
    const router = useRouter()
    
    const store = useStore()
    const goCategory = (key)=>{
        store.commit('updateCategory',key)
        router.push({path:'/category.html'})
    }
    const goTags = (key)=>{
        store.commit('updateTags',key)
        router.push({path:'/tags.html'})
    }
</script>

<template>
    <div class="use-info">
        <div class="use-info-item">
            <AvatorImage/>
            <h3 class="use-info-item-author">{{author}}</h3>
            <p class="use-info-item-view">
                <span>{{pagesData.length}}篇文章</span><!-- &nbsp;&nbsp;|&nbsp;&nbsp;<span></span> -->
            </p>
            <p class="use-info-item-summary">{{summary}}</p>
        </div>
        <div class="use-info-item text-left">
            <p class="use-info-item-title">
                <svg t="1666249073736" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="42916" width="17" height="17"><path d="M983.04 330.1376h-7.5776v-81.92a107.7248 107.7248 0 0 0-107.52-107.52H371.9168l-7.3728-15.1552A40.96 40.96 0 0 0 327.68 102.4H122.88a122.88 122.88 0 0 0-122.88 122.88v573.44a122.88 122.88 0 0 0 122.88 122.88h778.24a122.88 122.88 0 0 0 122.88-122.88V371.0976a40.96 40.96 0 0 0-40.96-40.96z m-115.0976-138.0352a56.32 56.32 0 0 1 56.32 56.32v81.92H469.8112a10.24 10.24 0 0 1-9.216-5.7344l-64.1024-132.5056zM972.8 798.72a71.68 71.68 0 0 1-71.68 71.68H122.88A71.68 71.68 0 0 1 51.2 798.72V225.28A71.68 71.68 0 0 1 122.88 153.6h198.2464l93.3888 193.1264a61.44 61.44 0 0 0 55.296 34.816H972.8z" p-id="42917" fill="#666666"></path></svg>
                <span>分类</span>
            </p>
            <ul style="list-style:none;padding: 0;margin: 0;">
                <li class="uiil-item" v-for="(val,key,index) in category">
                    <a @click="goCategory(key)">
                        <span>{{key}}</span>
                        <span class="uiil-category-link">{{val.length}}篇</span>
                    </a>
                </li>
            </ul>
        </div>
        <div class="use-info-item text-left">
            <p class="use-info-item-title">
                 <svg t="1666248738923" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="21999" width="18" height="18"><path d="M533.205333 895.957333l-413.866666-413.866666a33.194667 33.194667 0 0 1-8.533334-21.333334v-277.333333a70.314667 70.314667 0 0 1 68.266667-68.266667h281.6a33.066667 33.066667 0 0 1 21.333333 8.533334l413.866667 413.866666a79.701333 79.701333 0 0 1 0 110.933334l-251.733333 251.733333a139.690667 139.690667 0 0 1-55.466667 17.066667 80.384 80.384 0 0 1-55.466667-21.333334z m-358.4-716.8l-4.266666 264.533334 405.333333 405.333333a18.688 18.688 0 0 0 21.333333 0l251.733334-251.733333a19.114667 19.114667 0 0 0 0-21.333334l-405.333334-405.333333h-264.533333c-4.266667 0-4.266667 4.266667-4.266667 8.533333z m81.066667 213.333334a100.053333 100.053333 0 0 1-29.866667-68.266667 85.077333 85.077333 0 0 1 29.866667-68.266667 109.952 109.952 0 0 1 68.266667-29.866666 85.333333 85.333333 0 0 1 68.266666 29.866666 100.864 100.864 0 0 1 29.866667 68.266667 102.4 102.4 0 0 1-98.133333 98.133333 84.778667 84.778667 0 0 1-68.266667-29.866666z m42.666667-93.866667c-8.533333 4.266667-8.533333 12.8-8.533334 25.6a45.44 45.44 0 0 0 8.533334 25.6 35.797333 35.797333 0 0 0 25.6 8.533333 36.565333 36.565333 0 0 0 34.133333-34.133333 61.525333 61.525333 0 0 0-8.533333-25.6 62.464 62.464 0 0 0-25.6-8.533333 61.696 61.696 0 0 0-25.6 8.533333z" p-id="22000" fill="#666666"></path></svg>
                <span>标签</span>
            </p>
            <ul style="list-style:none;padding: 0;margin: 0;">
                <li class="uiil-tags" v-for="(val,key,index) in tags">
                    <a @click="goTags(key)">
                        <span>{{key}}</span>
                        <span class="uiil-tags-link">{{val.length}}篇</span>
                    </a>
                </li>
            </ul>
        </div>
        <div class="use-info-item text-left">
            <p class="use-info-item-title friends-link">
                <svg t="1666248590018" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16067" width="18" height="18"><path d="M172.9 536.9V201.8c0-16.5 13.5-29.9 30.2-29.9h448.8c16.7 0 30.2 13.4 30.2 29.9V537c0 16.5-13.5 29.9-30.2 29.9h-153c-15 0-27.2 12.2-27.2 27.2v5.5c0 15 12.2 27.2 27.2 27.2H682c33.3 0 60.4-26.8 60.4-59.9v-395c0-33.1-27-59.9-60.4-59.9H142.7c-16.7 0-30.2 13.4-30.2 29.9v424.9c0 33.1 27 59.9 60.4 59.9h30.2c15 0 27.2-12.2 27.2-27.2V594c0-15-12.2-27.2-27.2-27.2-16.7 0.1-30.2-13.3-30.2-29.9z" fill="#666666" p-id="16068"></path><path d="M852.1 397.3h-30.2c-13.3 0-24.2 10.8-24.2 24.2V433c0 13.3 10.8 24.2 24.2 24.2 16.7 0 30.2 13.4 30.2 29.9v335.2c0 16.5-13.5 29.9-30.2 29.9H370.1c-16.7 0-30.2-13.4-30.2-29.9V487.1c0-16.5 13.5-29.9 30.2-29.9h159c13.3 0 24.2-10.8 24.2-24.2v-11.5c0-13.3-10.8-24.2-24.2-24.2H339.9c-33.3 0-60.4 26.8-60.4 59.9v395c0 33.1 27 59.9 60.4 59.9h512.2c33.3 0 60.4-26.8 60.4-59.9v-395c0-33.1-27-59.9-60.4-59.9z" fill="#666666" p-id="16069"></path></svg>
                <span> 友情链接</span>
            </p>
            <ul style="list-style:none;padding: 0;margin: 0;">
                <li class="uiil-item" v-for="item in friends">
                    <a :href="item.link" target="_blank">
                        <span class="uiil-item-name">{{item.name}}</span>
                        <span class="uiil-item-link">{{item.text}}</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<style>
    .use-info{
        position: sticky;
        top: calc(var(--navbar-height) + 0.5rem);
        width: 100%;
        box-sizing: border-box;
    }
    .use-info-item{
        padding: 1.5rem 1.2rem;
        text-align: center;
        cursor: pointer;
        margin-bottom: 10px;
        background: var(--c-bg);
        border: 1px solid var(--c-border);
        box-shadow: 0px 2px 10px var(--c-bg-lighter);
    }

    
    .avator-image{
        width: 85px;
        height: 85px;
        border-radius: 42.5px;
        margin-top: 10px;
    }
    .use-info-item-author{
        margin: 1rem 0;
    }
    .use-info-item-summary{
        font-size: 14px;
        color: var(--c-text);
        margin: 10px 0;
    }
    .use-info-item-title{
        margin: 0;
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 5px;
        color: var(--c-text);
    }
    .use-info-item-title .icon{
        position: relative;
        top: 3px;
        margin-right: 5px;
    }
    .friends-link .icon{
        margin-right: 1px;
    }
    .use-info-item-view{
        font-size: 14px;
        margin-bottom: 5px;
    }
    .uiil-item a{
        display: inline-block;
        display: flex;
        justify-content: space-between;
        padding: 4px 0;
        font-size: 14px;
        color: var(--c-text);
        font-weight: 400;
    }
    .uiil-item a:hover{
        color: var(--c-brand);
    }
    .uiil-category-link{
        color: var(--c-text-quote);
        font-size: 13px;
    }
    .uiil-tags{
        display: inline-block;
        background: var(--c-bg-light);
        padding: 2px 13px;
        font-size: 15px;
        border-radius: 3px;
        margin: 5px 0;
        margin-right: 10px;
    }
    .uiil-tags a{
        color: var(--c-text);
        font-weight: 400;
    }
    .uiil-tags:hover a{
        color: var(--c-brand);
    }
    .uiil-tags:hover{
        color: var(--c-brand);
        background: #ecf5ff;
    }
    .uiil-tags-link{
        display: inline-block;
        margin-left: 5px;
        font-size: 13px;
        color: var(--c-brand);
    }
    .uiil-item-name{
        color: var(--c-text-base);
        font-size: 14px;
    }
    .uiil-item-link{
        display: inline-block;
        font-size: 13px;
        background: var(--c-bg-light);
        padding: 1px 13px;
        font-weight: 400;
        color: var(--c-text-quote);
    }
    .uiil-item a:hover .uiil-item-name{
        color: var(--c-brand);
    }
    .uiil-item a:hover .uiil-item-link{
        color: var(--c-brand);
    }
    .text-left{
        text-align: left;
        padding-top: 1.3rem;
        padding-bottom: 1.3rem;
    }
</style>