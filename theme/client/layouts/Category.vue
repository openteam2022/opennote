<template>
    <Common>
        <Transition
        v-if="category == 'category'"
        name="fade-slide-y"
        mode="out-in"
        @before-enter="onBeforeEnter"
        @before-leave="onBeforeLeave"
        >
            <div class="category" > 
                <div class="category-header">
                    <Tabs :currentTabs="chooseCategory" :data="categoryList[1]" @changeTabs="change"/>
                </div>
                <BlogList :data="data"/>
                <Pagation v-if="totalPageSize > 10"
                :currentPage="currentPage"
                :total="totalPageSize" 
                @change="change"/>
            </div>
        </Transition>
    </Common>
</template>

<script setup lang="ts">
import Pagation from '../components/Pagation.vue'
import PageHeader from '../components/PageHeader.vue'
import OpenTransition from '../components/OpenTransition.vue'
import Tabs from '../components/Tabs.vue'
import { usePageData, usePageFrontmatter } from '@vuepress/client'
import type { DefaultThemePageFrontmatter } from '../../shared/index.js'
import { useScrollPromise } from '../composables/index.js'
import {computed,onMounted,ref,reactive} from 'vue'
import BlogList from '../components/BlogList.vue'
import comm from '../utils/comm.js'
import { useStore } from "vuex";
import {categoryData} from '@temp/categoryData.js'

const store = useStore()

const categoryBlogData = categoryData;

const pageSize = ref(10);//每页显示10
const pages = ref(0);// 当前页起始页码
const totalPageSize = ref(0); //总条数
const currentPage = ref(1); //当前页面
const totalPage = ref(1); // 总页数
const blogData = ref([]);

const categoryList = computed(()=>{
    let i = 0;
    let data = [];
    let categoryIndexlist = {}
    let categoryKeylist = {}

    for(let item in categoryBlogData){
        if(i == 0){
            store.commit('updateCategory', item);
            data[0] = item;
        }
        categoryIndexlist[i] = item;
        categoryKeylist[item] = i;
        i+= 1;
    }
    data[1] = categoryIndexlist;
    data[2] = categoryKeylist
    return data;
})
let chooseCategory = ref(0)
let data = ref(null)
const indexList = categoryList.value[1];
const keyList = categoryList.value[2];
const temporary  = computed(()=>{
    if(store.state.category){
        return categoryBlogData[store.state.category]; 
    }else{
        return categoryBlogData[indexList[chooseCategory.value]];

    }
})

data.value = temporary.value;
const page = usePageData()
const frontmatter = usePageFrontmatter<DefaultThemePageFrontmatter>()
const category = computed(()=>{
    return page.value.frontmatter.layout;
})
// handle scrollBehavior with transition
const scrollPromise = useScrollPromise()
const onBeforeEnter = scrollPromise.resolve
const onBeforeLeave = scrollPromise.pending

onMounted(()=>{
    if(frontmatter)
    store.commit('updatePageHeader','category');
    comm.on('updateCurrentCategory',()=>{
        data.value = categoryBlogData[store.state.category]; 
        store.commit('updatePageHeader','category');
        chooseCategory.value = keyList[store.state.category]
    })
})

const change = (category)=>{
    data.value = categoryBlogData[category]
    store.commit('updateCategory',category);
}

</script>

<style>
    .category{
        padding-top: var(--navbar-height);
        max-width: var(--content-width);
        margin: 1rem auto;
        padding-bottom: 50px;
    }
    @media (max-width: 960px ) {
        .category{
            margin: 1rem;
        }
    }
    @media (max-width: 768px ) {
        .category{
            flex-direction: column;
        }
    }
    @media (max-width: 419px ) {
        .category{
            margin: 0.7rem;
        }
    }
</style>
