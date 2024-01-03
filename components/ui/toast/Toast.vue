<script lang="ts">
import type { ToastRootEmits } from 'radix-vue'
</script>

<script setup lang="ts">
import { ToastRoot, useEmitAsProps } from 'radix-vue'
import type { ToastProps } from './use-toast'
import { toastVariants } from '.'

const props = defineProps<ToastProps>()
const emits = defineEmits<ToastRootEmits>()
</script>

<template>
  <ToastRoot
    v-bind="{ ...props, ...useEmitAsProps(emits) }"
    :class="cn(toastVariants({ variant: props.variant }), props.class)"
    @update:open="onOpenChange"
  >
    <slot />
  </ToastRoot>
</template>
