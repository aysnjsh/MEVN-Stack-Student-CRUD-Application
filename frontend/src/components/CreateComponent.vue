<template>
  <section>
    <div class="page-heading"><p class="eyebrow">STUDENT RECORDS</p><h1>A new student starts here.</h1><p>Add their details and keep your student records in one place.</p></div>
    <div class="create-grid">
      <div class="surface form-card"><div class="card-heading"><span class="step-icon">01</span><div><h2>Create Student</h2><p>All fields are required.</p></div></div><AlertMessage :message="error" @dismiss="error = ''" /><StudentForm :busy="saving" @save="createStudent" /></div>
      <aside class="info-panel"><span class="pill">STUDENT MANAGEMENT</span><h2>Less paperwork.<br />More organized.</h2><p>Create a record, keep details up to date, and find your students in a single list.</p><div class="info-steps"><div><span>01</span><p><strong>Add a student</strong><small>Enter their name and contact details.</small></p></div><div><span>02</span><p><strong>Review your records</strong><small>Browse or search the student list.</small></p></div><div><span>03</span><p><strong>Keep it current</strong><small>Edit details or remove old records.</small></p></div></div><router-link class="panel-link" to="/view">Go to student list <span aria-hidden="true">→</span></router-link></aside>
    </div>
  </section>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api, { errorMessage } from '../services/api';
import { notice } from '../services/notice';
import AlertMessage from './AlertMessage.vue';
import StudentForm from './StudentForm.vue';
const router = useRouter();
const saving = ref(false);
const error = ref('');
async function createStudent(student) {
  if (saving.value) return;
  saving.value = true; error.value = '';
  try { await api.post('/create-student', student); notice.value = 'Student created successfully.'; await router.push('/view'); }
  catch (err) { error.value = errorMessage(err); }
  finally { saving.value = false; }
}
</script>
