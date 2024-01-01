import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('../views/LogoutView.vue')
    },
    {
      path: '/ingredients',
      name: 'ingredients',
      component: () => import('../views/IngredientsView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/suggestedIngredients',
      name: 'suggestedIngredients',
      component: () => import('../views/SuggestedIngredientsView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/recipes/:id?',
      name: 'recipes',
      component: () => import('../views/RecipesView.vue'),
      props: (route) => ({ id: route.params.id }),
      meta: { requiresAuth: true }
    },
    {
      path: '/reportedRecipes',
      name: 'reportedRecipes',
      component: () => import('../views/ReportedRecipesView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/reportedUsers',
      name: 'reportedUsers',
      component: () => import('../views/ReportedUsersView.vue'),
      meta: { requiresAuth: true }
    },
  ]
})

import { useUserStore } from '@/stores/user'

router.beforeEach(async (to) => {
  const userStore = useUserStore()

  // routes with `meta: { requiresAuth: true }` will check for
  // the users, others won't
  if (to.meta.requiresAuth) {
    // if the user is not logged in, redirect to the login page
    if (!userStore.isAuthenticated) {
      return {
        path: '/login',
        query: {
          // we keep the current path in the query so we can
          // redirect to it after login with
          // `router.push(route.query.redirect || '/')`
          redirect: to.fullPath
        }
      }
    }
  }
})

export default router
