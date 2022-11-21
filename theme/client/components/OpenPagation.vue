<template>
    <div class="open-pagation">
        <ul class="open-pagation-list">
            <li class="open-pagation-list-icon">
                <svg t="1666492645072" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2538" width="16" height="16"><path d="M384 512L731.733333 202.666667c17.066667-14.933333 19.2-42.666667 4.266667-59.733334-14.933333-17.066667-42.666667-19.2-59.733333-4.266666l-384 341.333333c-10.666667 8.533333-14.933333 19.2-14.933334 32s4.266667 23.466667 14.933334 32l384 341.333333c8.533333 6.4 19.2 10.666667 27.733333 10.666667 12.8 0 23.466667-4.266667 32-14.933333 14.933333-17.066667 14.933333-44.8-4.266667-59.733334L384 512z" p-id="2539"></path></svg>
            </li>
            <li class="open-pagation-list-item" v-for="(item,index) in prev" @click="changeCurrent(index)">{{item}}</li>
            <li class="open-pagation-list-item active-pagation" >{{val}}</li>
            <li class="open-pagation-list-item" v-for="(item,index) in next" @click="changeCurrent(index)">{{item}}</li>
            <li class="open-pagation-list-icon">
                <svg t="1666492957415" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4414" width="15" height="15"><path d="M326.7079 958.51045l-63.278185-60.523445L651.328255 512.841158 257.924327 124.944664l66.024739-60.523445 445.672362 448.419939L326.7079 958.51045z" p-id="4415"></path></svg>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
    import {ref,computed} from 'vue'
    const link = [1,2,3,4,5,6,7,8,9,10];
    const pagationLength = ref(5);
    const prevLength = ref(2)
    const nextLength = ref(2)
    const current = ref(0)
    const prev = ref(null);
    const next = ref(null)
    const val = ref(null);
    val.value = link[current.value];
    const prevValue = computed(()=>{
        if(current.value < 2){
            prevLength.value = current.value
            return link.splice(0, current.value)
        }else{
            return link.splice(current.value - prevLength,current.value);
        }
    })

    const nextValue = computed(()=>{
        if(prevLength.value < 2 ){
            nextLength.value += 2 - prevLength.value;
            return link.splice(current.value + 1, nextLength.value)
        }else{
            return link.splice(current.value + 1, nextLength.value)
        }
    })
    prev.value = prevValue.value
    next.value = nextValue.value
    console.log(val.value)
    console.log(prev.value)
    console.log(next.value)


    const changeCurrent = (index) => {
        val.value = link[index]
        console.log(index)
    }
</script>

<style>
    .open-pagation{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 15px 0;
    }
    .open-pagation-list{
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
    }

    .open-pagation-list-icon{
        border-radius: 5px;
        box-shadow: 0px 1px 8px #ccc;
        cursor: pointer;
        background: #fff;
        display: flex;
        align-items: center;
        padding: 0px 7px;
        margin: 0 5px;
    }
    .open-pagation-list-item{
        padding: 1px 11px;
        padding-bottom: 1px;
        margin: 0 5px;
        border-radius: 5px;
        box-shadow: 0px 1px 8px #ccc;
        cursor: pointer;
        background: #fff;
    }
    .open-pagation-list-item:hover{
        background: var(--c-brand,#1890ff);
        color: #fff;
    }
    .active-pagation{
        background: var(--c-brand,#1890ff);
        color: #fff;
    }

</style>