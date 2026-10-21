<template>
  <form @submit.prevent="submit" :aria-busy="busy">
    <fieldset :disabled="busy">
      <div class="form-group"><label for="student-name">Full name <span class="required">*</span></label><input id="student-name" class="form-control" type="text" v-model="form.name" minlength="2" maxlength="100" placeholder="e.g. Juan Dela Cruz" autocomplete="name" required /></div>
      <div class="form-group"><label for="student-email">Email address <span class="required">*</span></label><input id="student-email" class="form-control" type="email" v-model="form.email" maxlength="254" placeholder="e.g. juan@example.com" autocomplete="email" required /></div>
      <div class="form-group"><label for="student-phone">Phone number <span class="required">*</span></label><input id="student-phone" class="form-control" type="tel" inputmode="numeric" v-model="form.phone" pattern="[0-9]{7,15}" minlength="7" maxlength="15" placeholder="e.g. 639171234567" autocomplete="tel" aria-describedby="phone-help" required /><small id="phone-help" class="form-text text-muted">7–15 digits. Use your country code without + (e.g. 63917…).</small></div>
      <div class="form-actions"><button class="btn btn-primary" type="submit"><span v-if="busy" class="spinner-border spinner-border-sm mr-2" aria-hidden="true"></span>{{ busy ? 'Saving…' : submitLabel }}</button><router-link class="btn btn-light" to="/view" v-if="!busy">Cancel</router-link></div>
    </fieldset>
  </form>
</template>
<script setup>
import { reactive } from 'vue';
const props = defineProps({ initial: { type: Object, default: () => ({ name: '', email: '', phone: '' }) }, busy: Boolean, submitLabel: { type: String, default: 'Create Student' } });
const emit = defineEmits(['save']);
const form = reactive({ name: props.initial.name, email: props.initial.email, phone: String(props.initial.phone ?? '') });
function submit() { if (!props.busy) emit('save', { name: form.name.trim(), email: form.email.trim(), phone: form.phone }); }
</script>
