import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import('../components/CreateComponent.vue'), meta: { title: 'Create Student' } },
    { path: '/view', name: 'view', component: () => import('../components/ListComponent.vue'), meta: { title: 'View Students' } },
    { path: '/edit/:id', name: 'edit', component: () => import('../components/EditComponent.vue'), meta: { title: 'Edit Student' } },
    { path: '/profile', name: 'profile', component: () => import('../components/ProfileComponent.vue'), meta: { title: 'My Profile' } },
    { path: '/:pathMatch(.*)*', component: () => import('../components/NotFound.vue'), meta: { title: 'Page Not Found' } },
  ],
  scrollBehavior: () => ({ top: 0 }),
});
router.afterEach(to => { document.title = `${to.meta.title || 'Student Management'} | StudentDesk`; });
export default router;
