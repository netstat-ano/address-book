<template>
  <v-dialog
    :modelValue="isVisible"
    @update:modelValue="emit('onClose')"
    width="auto"
  >
    <v-card max-width="400" v-bind="$attrs">
      <slot></slot>
      <template v-slot:actions>
        <slot name="actions"> </slot>
      </template>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
defineProps<{ isVisible: boolean }>();
const emit = defineEmits<{ (e: "onClose"): void }>();
</script>
