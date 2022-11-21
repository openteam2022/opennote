<script setup lang="ts">

import { computed } from 'vue'

import { useThemeLocaleData } from '../composables/index.js'

const themeData = useThemeLocaleData();

const footer = computed(()=>{
    return themeData._value.footer;
})
const endDate = new Date().getFullYear()
</script>

<template>
    <div class="footer">
        <ul class="footer-box">
            <li>
                <span>Copyright</span>
                <svg t="1666244320380" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2522" width="18" height="18"><path d="M512 96C282.624 96 96 282.624 96 512s186.624 416 416 416 416-186.624 416-416S741.376 96 512 96z m0 64c194.784 0 352 157.216 352 352s-157.216 352-352 352S160 706.784 160 512 317.216 160 512 160z m-3.008 160c-106.368 0-192 85.632-192 192s85.632 192 192 192c76.8 0 142.432-46.048 172.992-111.008l-57.984-26.976C603.36 609.856 560.192 640 508.992 640c-72.832 0-128-55.168-128-128s55.168-128 128-128c51.2 0 94.4 30.144 115.008 74.016l58.016-27.008C651.424 366.048 585.76 320 508.96 320z" p-id="2523" fill="#515151"></path></svg>
                <span>{{footer.name}}</span>
                <span> Blog All Rights Reserved.</span>
                <span class="footer-box-date">
                    {{footer.startDate}}-{{endDate}}
                </span>
            </li>
            <li><a :href="footer.icpLink" target="_blank">{{footer.icpText}}</a></li>
            <li><a :href="footer.beianLink" target="_blank">{{footer.beianText}}</a></li>
        </ul>
     
    </div>
</template>

<style>
    .footer{
        padding: 1.5rem;
        text-align: center;
        border-top: 1px var(--c-border) solid;
    }
    .footer-box{
        list-style: none;
        margin: 0;
        padding: 0;
        font-size: 14px;
    }
    .footer-box li{
        display: inline-block;
        padding: 0 0.5rem;
        line-height: 30px;
    }
    .footer-box li a{
        font-size: 14px;
        color: var(--c-text);
        font-weight: 400;
    }
    .footer-box li a:hover{
        color: var(--c-brand);
    }
    .footer-box li .icon{
        position: relative;
        top: 4px;
        margin-right: 3px;
    }
    .footer-box-date{
        margin-left: 5px;
    }
    @media (max-width: 768px ) {
       .footer-box li{
            display: block;
        }
    }
</style>
