<template>
    <div class="blog-list">
        <ul style="list-style:none;margin:0;padding: 0;">
            <li class="blog-list-item" v-for="item in blogData">
                <div class="blog-list-item-text">
                    <p class="blog-list-item-title">
                        <a :href="item.path">{{item.title}}</a>
                    </p>
                    <PageInfo :data="item" />
                </div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
    import type { FunctionalComponent } from 'vue'
    import PageInfo from './PageInfo.vue'
    import OpenPagation from './OpenPagation.vue'
    import { computed,h, nextTick, onBeforeUnmount, toRefs } from 'vue'
    import {
      ClientOnly,
      usePageFrontmatter,
      useSiteLocaleData,
      withBase,
    } from '@vuepress/client'
    import type { DefaultThemeHomePageFrontmatter } from '../../shared/index.js'
    import {
      useSidebarItems,
      useThemeLocaleData,
    } from '../composables/index.js'

    const props = defineProps({
      data: {
        type: Array,
        required: true,
      }
    })

    const { data } = toRefs(props)
    const blogData = computed(()=>{
        return data.value;
    })
    const frontmatter = usePageFrontmatter<DefaultThemeHomePageFrontmatter>()


    const blogImage = computed(() => {
        return frontmatter.value.blogImage || '/imgs/bg.jpg'
    })
    const BlogImage: FunctionalComponent = () => {
        if (!blogImage.value) return null
        const img = h('img', {
            src: withBase(blogImage.value),
            class: 'blog-image'
        })
        return h(ClientOnly, () => img)
    } 

</script>

<style>
    .blog-list{
        width: 100%;
    }
    .blog-list-item{
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: 1.2rem 1.2rem;
        margin-bottom: 1rem;
        background: var(--c-bg);
        border: 1px solid var(--c-border);
        box-shadow: 0px 2px 10px var(--c-bg-lighter);
    }
    
    .blog-list-item:hover{
        /*box-shadow: 0px 2px 10px var(--c-bg-lighter);*/
        /*border: 1px var(--c-brand) solid;*/
    }
    .blog-list-item-img{
        width: 100px;
        height: 70px;
        margin-right: 14px;
    }
    .blog-image{
        width: 100%;
        height: 100%;
        border-radius: 5px;
    }
    .blog-list-item-text{
        flex: 1;
    }
    .blog-list-item-title{
        margin: 0px;
    }
    .blog-list-item-title a{
        display: inline-block;
        font-size: 1.2rem;
        color: var(--c-text);
        cursor: pointer;
        line-height: 2rem;
        position: relative;
    }
    .blog-list-item-title a:hover{
        color: var(--c-brand);
    }
    .blog-list-item-title a::before{
        content: "";
        position: absolute;
        left: 0;
        bottom: -6px;
        height: 2px;
        width: 0%;
        background: var(--c-brand);
        /*transform: scale(0);*/
        transition: all 0.3s;
    }
    .blog-list-item-title a:hover::before{
         /*transform: scale(1);*/
         width: 100%;
    }
    @media (max-width: 419px ) {
        .blog-list-item-title a:hover::before{
             /*transform: scale(1);*/
             width: 0%;
        }
    }
</style>