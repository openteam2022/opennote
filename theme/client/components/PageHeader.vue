<template>
    <div class="page-header">
        <ul class="page-header-list" >
            <li class="page-header-list-home">
                <a href="/">
                    <svg t="1666320332778" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3390" width="16" height="16"><path d="M-3.414016 852.912128" p-id="3391" fill="#1890ff"></path><path d="M156.437504 550.562816 156.437504 960.229376 402.612224 960.229376 402.612224 683.4688 618.62912 683.4688 618.62912 960.229376 865.261568 960.229376 865.261568 550.562816 1002.271744 550.562816 510.849024 66.444288 18.970624 550.562816Z" p-id="3392" fill="#1890ff"></path><path d="M1024.651264 852.912128" p-id="3393" fill="#1890ff"></path></svg>
                    <span>
                       主页 
                    </span>
                </a>
            </li>
            <li class="page-header-list-icon" v-if="title">/</li>
            <li class="page-header-list-title" v-if="title">
                <svg t="1666320823502" id="text-icon" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9670" width="16" height="16"><path d="M767.87712 95.01184 240.75776 95.01184c-72.67328 0-131.77856 58.10176-131.77856 129.49504l0 597.6064c0 71.38816 59.10016 129.49504 131.77856 129.49504l527.11424 0c72.64768 0 131.77856-58.10688 131.77856-129.49504L899.65056 224.50688C899.65568 153.1136 840.5248 95.01184 767.87712 95.01184zM294.46144 301.88544l227.23584 0c16.7936 0 30.40256 13.35296 30.40256 29.88544 0 16.47104-13.60896 29.85984-30.40256 29.85984L294.46144 361.63072c-16.78848 0-30.40256-13.38368-30.40256-29.85984C264.05888 315.2384 277.66784 301.88544 294.46144 301.88544zM724.41344 755.00544 294.46144 755.00544c-16.78848 0-30.40256-13.38368-30.40256-29.89056 0-16.50176 13.60896-29.89056 30.40256-29.89056l429.95712 0c16.7936 0 30.4384 13.3888 30.4384 29.89056C754.85696 741.62176 741.21216 755.00544 724.41344 755.00544zM724.41344 558.33088 294.46144 558.33088c-16.78848 0-30.40256-13.37856-30.40256-29.88544s13.60896-29.89056 30.40256-29.89056l429.95712 0c16.7936 0 30.4384 13.38368 30.4384 29.89056S741.21216 558.33088 724.41344 558.33088z" p-id="9671" fill="#999999"></path></svg>
                <span>
                    {{title}}
                </span>
            </li>

        </ul>
    </div>
</template>

<script setup lang="ts">
    import {
      ClientOnly,
      usePageFrontmatter,
      useSiteLocaleData,
      withBase,
    } from '@vuepress/client'

    import {computed} from 'vue'

    import {useStore} from 'vuex'
    const store = useStore();
    const fromPage = computed(()=>{
        return store.state.pageHeader;
    })

    const frontmatter = usePageFrontmatter()
    const title = computed(()=>{
        return frontmatter.value.title
    })
</script>

<style>
    .page-header{
        line-height: 1rem;
        margin-top: 0.5rem;
    }
    .page-header-list{
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
    }
    .page-header-list li{
        margin-right: 8px;
    }
    .page-header-list li a{
        cursor: pointer;
        font-size: 15px;
        text-decoration: none;
    }
    .page-header-list li a:hover{
        text-decoration: none;
    }
    .page-header-list-icon,.page-header-list-title{
        color: var(--c-text-quote);
    }
    .page-header-list li a .icon{
        position: relative;
        top: 1px;
    }
    #category-icon,#tags-icon{
        top: 3px;
        margin-right: 3px;
    }
    #text-icon{
        position: relative;
        top: 3px;
        margin-right: 3px;
    }
    @media (max-width: 419px){
        .page-header-list-home{
            width: 66px;
            margin-right: 0px!important;
        }
    }
</style>