<template>
  <div class="app-shell">
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header">
      <nav class="container header-inner" aria-label="Main navigation">
        <router-link class="brand" to="/" aria-label="StudentDesk home"><span class="brand-mark">S<span>.</span></span><span>Student<span class="brand-light">Desk</span><small>MEVN STUDENT MANAGEMENT</small></span></router-link>
        <div class="nav-links">
          <router-link to="/" exact-active-class="active">Create Student</router-link>
          <router-link to="/view" active-class="active">View Students</router-link>
          <router-link to="/profile" active-class="active">My Profile</router-link>
        </div>
      </nav>
    </header>
    <main id="main" class="container main-content"><router-view :key="$route.fullPath" /></main>
    <footer class="site-footer"><div class="container footer-inner"><span>StudentDesk <span class="footer-dot">·</span> Finals Lab Activity 4</span><span>MongoDB / Express / Vue / Node.js</span></div></footer>
  </div>
</template>
