<template>
  <section>
    <div class="page-heading heading-with-action"><div><p class="eyebrow">STUDENT RECORDS</p><h1>Your student directory.</h1><p>View, update, and manage student information.</p></div><router-link class="btn btn-primary" to="/">+ Add Student</router-link></div>
    <AlertMessage :message="error" @dismiss="error = ''" /><AlertMessage :message="notice" type="success" @dismiss="notice = ''" />
    <div class="surface list-card">
      <div class="list-toolbar"><div><h2>All students <span class="count">{{ students.length }}</span></h2><p>Most recently added first</p></div><div class="list-controls"><label class="sr-only" for="search">Search students</label><input id="search" v-model="search" type="search" class="form-control search-input" placeholder="Search name, email, or phone" /><button class="btn btn-light" :disabled="loading || !!deleting" @click="loadStudents">{{ loading ? 'Loading…' : 'Refresh' }}</button></div></div>
      <div v-if="loading" class="empty-state" role="status"><span class="spinner-border text-primary" aria-hidden="true"></span><p>Loading students…</p></div>
      <div v-else-if="error && !students.length" class="empty-state"><h3>Couldn’t load students</h3><p>Check your connection and try again.</p><button class="btn btn-primary" @click="loadStudents">Try again</button></div>
      <div v-else-if="!students.length" class="empty-state"><span class="empty-symbol" aria-hidden="true">+</span><h3>Your directory is ready.</h3><p>Create your first student record to get started.</p><router-link class="btn btn-primary" to="/">Create Student</router-link></div>
      <div v-else-if="!filteredStudents.length" class="empty-state"><h3>No matching students</h3><p>Try a different name, email, or phone number.</p><button class="btn btn-light" @click="search = ''">Clear search</button></div>
      <div v-else class="table-responsive"><table class="table student-table"><caption class="sr-only">Student records with edit and delete actions</caption><thead><tr><th scope="col">Student name</th><th scope="col">Email address</th><th scope="col">Phone number</th><th scope="col">Actions</th></tr></thead><tbody><tr v-for="student in filteredStudents" :key="student._id"><td><div class="student-name"><span class="avatar" aria-hidden="true">{{ initials(student.name) }}</span><strong>{{ student.name }}</strong></div></td><td>{{ student.email }}</td><td class="phone-cell">{{ student.phone }}</td><td><div class="row-actions"><router-link :to="{ name: 'edit', params: { id: student._id } }" class="btn btn-edit btn-sm" :aria-label="`Edit ${student.name}`">Edit</router-link><button class="btn btn-delete btn-sm" :disabled="!!deleting" @click="deleteStudent(student)" :aria-label="`Delete ${student.name}`">{{ deleting === student._id ? 'Deleting…' : 'Delete' }}</button></div></td></tr></tbody></table></div>
      <div v-if="students.length && !loading" class="table-bottom">Showing {{ filteredStudents.length }} of {{ students.length }} {{ students.length === 1 ? 'student' : 'students' }}</div>
    </div>
  </section>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue';
import api, { errorMessage } from '../services/api';
import { notice } from '../services/notice';
import AlertMessage from './AlertMessage.vue';
const students = ref([]), search = ref(''), loading = ref(true), deleting = ref(''), error = ref('');
const filteredStudents = computed(() => students.value.filter(student => `${student.name} ${student.email} ${student.phone}`.toLowerCase().includes(search.value.trim().toLowerCase())));
const initials = name => name.trim().split(/\s+/).map(word => word[0]).slice(0, 2).join('').toUpperCase();
async function loadStudents() {
  loading.value = true; error.value = '';
  try { students.value = (await api.get('/')).data; }
  catch (err) { error.value = errorMessage(err); }
  finally { loading.value = false; }
}
async function deleteStudent(student) {
  if (deleting.value || !window.confirm(`Delete ${student.name}? This cannot be undone.`)) return;
  deleting.value = student._id; error.value = ''; notice.value = '';
  try { await api.delete(`/delete-student/${student._id}`); students.value = students.value.filter(item => item._id !== student._id); notice.value = 'Student deleted successfully.'; }
  catch (err) { error.value = errorMessage(err); }
  finally { deleting.value = ''; }
}
onMounted(loadStudents);
</script>
