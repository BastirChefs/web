import { createRouter, createWebHistory } from 'vue-router'
import { getAuth } from 'firebase/auth'
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
      component: () => import('../views/IngredientsView.vue')
    },
    {
      path: '/ingredients/edit/:id',
      name: 'ingredients/edit',
      component: () => import('../views/IngredientsEditView.vue'),
      props: route => ({ id: route.params.id })
    },
    {
      path: '/ingredients/delete/:id',
      name: 'ingredients/delete',
      component: () => import('../views/IngredientsDeleteView.vue'),
      props: route => ({ id: route.params.id })
    },
    {
      path: '/suggestedIngredients',
      name: 'suggestedIngredients',
      component: () => import('../views/SuggestedIngredientsView.vue')
    },
    {
      path: '/suggestedIngredients/add/:id',
      name: 'suggestedIngredients/add',
      component: () => import('../views/SuggestedIngredientsAddView.vue'),
      props: route => ({ id: route.params.id })
    },
    {
      path: '/suggestedIngredients/remove/:id',
      name: 'suggestedIngredients/remove',
      component: () => import('../views/SuggestedIngredientsRemoveView.vue'),
      props: route => ({ id: route.params.id })
    },
  ]
})

router.beforeEach(async (to) => {
  // routes with `meta: { requiresAuth: true }` will check for
  // the users, others won't
  if (to.meta.requiresAuth) {
    const currentUser = getAuth().currentUser
    console.log(getAuth().currentUser)
    // if the user is not logged in, redirect to the login page
    if (!currentUser) {
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
