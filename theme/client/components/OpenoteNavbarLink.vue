<script setup lang="ts">
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
const props = defineProps({
  item: {
    type: Object as PropType<NavLink>,
    required: true,
  },
})
const router = useRouter();
const store = useStore()
const openLink = (text,type) => {
    if(type == 'category'){
        store.commit('updateCategory',text)
        router.push({path:'/category.html'})
    }
    if(type == 'tags'){
        store.commit('updateTags',text)
        router.push({path:'/tags.html'})
    }
}
</script>

<template>
    <a
    class="external-link"
    @click="openLink(item.text,item.type)"
    >
    <slot name="before" />
    {{ item.text }}
    <slot name="after" />
  </a>
</template>
