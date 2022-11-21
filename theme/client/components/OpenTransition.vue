<template>
    <Transition name="open">
        <slot></slot>
    </Transition>
</template>
<style>
    .open-enter-active,
    .open-leave-active {
      transition: opacity 0.8s ease;
    }

    .open-enter-from,
    .open-leave-to {
      opacity: 0;
    }
</style>