<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  modelValue: string;
}>()

// Emit the input event to sync with the parent component's model value
const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <textarea
    data-testid="text-area-summarize"
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    name="text_to_summarize"
    :placeholder="$t('home.textAreaSummarize')"
    maxlength="5000"
  ></textarea>
</template>
