<template>
    <main class="home-section" id="section">
        <div class="bloglist">
            <BlogList :data="data"></BlogList>
            <Pagation v-if="totalPageSize > 10"
            :currentPage="currentPage"
            :total="totalPageSize" 
            @change="change"/>
        </div>
        <div class="useinfo">
            <UseInfo></UseInfo>
        </div>
    </main>
</template>
<script setup lang="ts">
import BlogList from './BlogList.vue'
import Pagation from './Pagation.vue'
import UseInfo from './UseInfo.vue'
import {pagesData} from '@temp/pagesData.js'
import {useStore} from 'vuex'
import { usePageData, usePageFrontmatter } from '@vuepress/client'
import {ref,computed} from 'vue'

const data = ref([])
const pageSize = ref(10);//每页显示10
const pages = ref(0);// 当前页起始页码
const totalPageSize = ref(0); //总条数
const currentPage = ref(1); //当前页面
const totalPage = ref(1); // 总页数

const blogData = ref(pagesData);
const frontmatter = usePageFrontmatter()
const store = useStore();
totalPageSize.value = blogData.value.length;
totalPage.value = Math.ceil(totalPageSize.value / pageSize.value);
data.value = blogData.value.slice(pages.value,pageSize.value)
const change = (index)=>{
    currentPage.value = index;
    pages.value = (index - 1) * 10;
    pageSize.value = pages.value + 10;
    const number = blogData.value.length - pages.value
    if(number < 10){
        pageSize.value = blogData.value.length;
    }
    data.value = blogData.value.slice(pages.value, pageSize.value)
    window.scrollTo({ top: 300, behavior: 'smooth' });
}
</script>

<style>
    .home-section{
        max-width: var(--homepage-width) ;
        box-sizing: border-box;
        margin: 1rem auto;
        display: flex;
    }
    .bloglist{
        flex: 1;
        box-sizing: border-box;
    }
    .useinfo{
        width: 280px;
        box-sizing: border-box;
        margin-left: 1rem;
    }
    @media (max-width: 960px ) {
        .home-section{
            margin: 1rem;
        }
    }
    @media (max-width: 768px ) {
        .home-section{
            flex-direction: column;
        }
        .useinfo{
            width: 100%;
            margin: 0;
        }
    }
    @media (max-width: 419px ) {
        .home-section{
            margin: 0.7rem;
        }
    }
</style>
