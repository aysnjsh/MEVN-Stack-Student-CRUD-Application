<template>
  <section class="edit-page"><router-link to="/view" class="back-link">← Back to students</router-link><div class="page-heading"><p class="eyebrow">STUDENT RECORDS</p><h1>Keep the details current.</h1><p>Update the student's information below.</p></div><div class="surface form-card"><div class="card-heading"><span class="step-icon">↗</span><div><h2>Edit Student</h2><p>Your changes will update the saved record.</p></div></div><AlertMessage :message="error" @dismiss="error = ''" /><p v-if="loading" role="status">Loading student details…</p><StudentForm v-else-if="student" :initial="student" :busy="saving" submit-label="Save Changes" @save="updateStudent" /><div v-else><p>The student record could not be loaded.</p><button class="btn btn-light" @click="loadStudent">Try again</button></div></div></section>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api, { errorMessage } from '../services/api';
import { notice } from '../services/notice';
import AlertMessage from './AlertMessage.vue';
import StudentForm from './StudentForm.vue';
const route = useRoute(), router = useRouter();
const student = ref(null), loading = ref(true), saving = ref(false), error = ref('');
async function loadStudent() {
  loading.value = true; error.value = '';
  try { student.value = (await api.get(`/edit-student/${route.params.id}`)).data; }
  catch (err) { error.value = errorMessage(err); }
  finally { loading.value = false; }
}
async function updateStudent(values) {
  if (saving.value) return;
  saving.value = true; error.value = '';
  try { await api.put(`/update-student/${route.params.id}`, values); notice.value = 'Student updated successfully.'; await router.push('/view'); }
  catch (err) { error.value = errorMessage(err); }
  finally { saving.value = false; }
}
onMounted(loadStudent);
</script>
