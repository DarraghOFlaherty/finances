<script setup lang="ts">
const props = defineProps({
  class: String,
})
</script>

<template>
  <div :class="cn('text-sm [&_p]:leading-relaxed', props.class)">
    <slot />
  </div>
</template>
