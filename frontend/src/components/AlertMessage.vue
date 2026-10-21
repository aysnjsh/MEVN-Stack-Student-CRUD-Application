<template>
  <div v-if="message" :class="['alert', type === 'success' ? 'alert-success' : 'alert-danger', 'feedback']" :role="type === 'success' ? 'status' : 'alert'">
    <span>{{ message }}</span><button type="button" class="dismiss" aria-label="Dismiss message" @click="$emit('dismiss')">×</button>
  </div>
</template>
<script setup>
defineProps({ message: String, type: { type: String, default: 'error' } });
defineEmits(['dismiss']);
</script>
