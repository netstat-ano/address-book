<template>
  <div class="tw-flex tw-flex-col tw-gap-2">
    <div
      class="tw-bg-error_85 tw-rounded tw-px-1 tw-text-error"
      v-for="error in errors"
    >
      {{ formatSentence(error) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatSentence } from "@/helpers/formatSentence";
defineProps<{ errors: string[] }>();
</script>
