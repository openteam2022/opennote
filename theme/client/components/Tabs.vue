<template>
    <ul class="tabs">
        <li :class="[choose == index ? 'active-tabs' : '']" v-for="(val,key,index) in data" @click="changeTabs(index,val)">{{val}}</li>
    </ul>
</template>

<script setup lang="ts">
    import {ref,computed,toRefs,watch} from 'vue'
    const props = defineProps({
      data:{
        type: Object,
        required: true
      },
      currentTabs: {
        required: true
      }
    })
    const { data,currentTabs } = toRefs(props)
    
    let choose = ref(0)
    choose.value = currentTabs.value

    const emit = defineEmits()
    const changeTabs = (index,key)=>{
        choose.value = index;
        emit('changeTabs',key)
    }

    watch(currentTabs,(n,o)=>{
        choose.value = n;
    })
</script>

<style>
    .tabs{
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        margin: 1rem 0;
    }
    .tabs li{
        margin-right: 12px;
        border: 2px var(--c-brand-light) solid;
        border-radius: 5px;
        padding: 0px 12px;
        cursor: pointer;
        margin-bottom: 10px;
        font-size: 16px;
        color: var(--c-text);
        padding-bottom: 2px;
    }
    .tabs li:hover{
       color: #fff;
       background: var(--c-brand);
    }
    .active-tabs{
        color: #fff!important;
        background: var(--c-brand);
    }

</style>