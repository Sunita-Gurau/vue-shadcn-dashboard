import { createRouter, createWebHistory } from 'vue-router'

import DashboardPage from '@/pages/DashboardPage.vue'
import PlaceholderPage from '@/pages/PlaceholderPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardPage,
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: PlaceholderPage,
      props: {
        title: 'Transactions coming soon',
        description: 'We are polishing the transaction view. Stay tuned!',
      },
    },
    {
      path: '/wallet',
      name: 'wallet',
      component: PlaceholderPage,
      props: {
        title: 'Wallet coming soon',
        description: 'Your wallet insights dashboard is on its way.',
      },
    },
    {
      path: '/goals',
      name: 'goals',
      component: PlaceholderPage,
      props: {
        title: 'Goals coming soon',
        description: 'Track and celebrate your savings goals here soon.',
      },
    },
    {
      path: '/budgets',
      name: 'budgets',
      component: PlaceholderPage,
      props: {
        title: 'Budgets coming soon',
        description: 'Budget planning tools will appear here shortly.',
      },
    },
    {
      path: '/analytics',
      name: 'analytics',
      component: PlaceholderPage,
      props: {
        title: 'Analytics coming soon',
        description: 'Advanced analytics are currently under construction.',
      },
    },
    {
      path: '/settings',
      name: 'settings',
      component: PlaceholderPage,
      props: {
        title: 'Settings coming soon',
        description: 'Personalize your experience once this page launches.',
      },
    },
  ],
})

export default router
