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
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    name="text_to_summarize"
    placeholder="Paste in some text to summarize. (Min length is 200 chars. Max length is 100,000 chars.)"
    maxlength="5000"
  ></textarea>
</template>
