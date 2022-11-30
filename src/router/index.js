import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: { name: 'activity' },
    },
    {
      path: '/actividades',
      name: 'activity',
      component: () => import('../views/ActivityView.vue')
    },
    {
      path: '/actividad/:id',
      name: 'activity.details',
      sensitive: true ,
      component: () => import('../views/ActivityDetailView.vue')
    },
 
  ],
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
})

export default router
