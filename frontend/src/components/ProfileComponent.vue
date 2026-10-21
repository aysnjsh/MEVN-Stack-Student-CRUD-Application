<template>
  <section><div class="page-heading"><p class="eyebrow">ABOUT THE DEVELOPER</p><h1>A little about me.</h1><p>Student profile · Finals Lab Activity 4</p></div><div class="surface profile-card"><div class="profile-intro"><div class="portrait"><img v-if="profile.photo && !photoFailed" :src="profile.photo" :alt="profile.fullName" @error="photoFailed = true" /><div v-else class="photo-placeholder"><span>EJ</span><small>Profile photo to be added</small></div></div><span class="profile-badge">{{ profile.section }}</span><h2>{{ profile.fullName }}</h2><p>{{ profile.university }}<br />{{ profile.school }}</p></div><div class="profile-details"><p class="eyebrow">PERSONAL INFORMATION</p><dl><div><dt>Degree</dt><dd>{{ profile.degree }}</dd></div><div><dt>Specialization</dt><dd>{{ profile.specialization }}</dd></div><div><dt>Email address</dt><dd>{{ profile.email }}</dd></div><div><dt>Residence</dt><dd>{{ profile.barangay }}, {{ profile.city }}, {{ profile.province }}</dd></div></dl><div class="profile-note"><strong>Student Management CRUD Application</strong><p>A course project for creating, viewing, updating, and deleting student records using the MEVN stack.</p></div></div></div></section>
</template>
<script setup>
import { ref } from 'vue';
import profile from '../data/profile';
const photoFailed = ref(false);
</script>
