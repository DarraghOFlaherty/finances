<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next'
import { Primitive, type PrimitiveProps } from 'radix-vue'
import { buttonVariants } from '.'

interface Props extends PrimitiveProps {
  variant?: NonNullable<Parameters<typeof buttonVariants>[0]>['variant']
  size?: NonNullable<Parameters<typeof buttonVariants>[0]>['size']
  loading?: boolean
  as?: string
}

withDefaults(defineProps<Props>(), {
  as: 'button',
})
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), $attrs.class ?? '')"
  >
    <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
    <slot />
  </Primitive>
</template>
