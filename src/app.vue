<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink, RouterView } from 'vue-router'

import { Button } from '@/components/ui/button'

const navItems = [
  { label: 'Dashboard', to: '/' },
  { label: 'Transactions', to: '/transactions' },
  { label: 'Wallet', to: '/wallet' },
  { label: 'Budget', to: '/budgets' },
  { label: 'Analytics', to: '/analytics' },
  { label: 'Settings', to: '/settings' },
]

const route = useRoute()
const currentPath = computed(() => route.path)
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-muted/40">
    <aside class="hidden w-72 border-r bg-background p-6 md:flex md:flex-col">
      <div class="flex items-center gap-2 text-xl font-semibold">
        <span class="grid h-10 w-10 place-content-center rounded-full bg-primary text-primary-foreground">FS</span>
        <span>FinSet</span>
      </div>
      <nav class="mt-8 flex flex-1 flex-col gap-1 text-sm font-medium">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          :class="[
            'flex items-center gap-3 rounded-lg px-3 py-2 transition',
            currentPath === item.to
              ? 'bg-primary text-primary-foreground shadow'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground',
          ]"
        >
          <span>{{ item.label }}</span>
        </RouterLink>
      </nav>
      <div class="mt-auto space-y-2 text-sm">
        <Button variant="ghost" class="w-full justify-start text-muted-foreground hover:text-foreground">
          Help
        </Button>
        <Button variant="ghost" class="w-full justify-start text-muted-foreground hover:text-foreground">
          Log out
        </Button>
      </div>
    </aside>
    <div class="flex flex-1 flex-col overflow-hidden">
      <header class="flex flex-wrap items-center justify-between gap-4 border-b bg-background px-6 py-4">
        <div>
          <h1 class="text-2xl font-semibold tracking-tight">Welcome back, Adaline!</h1>
          <p class="text-sm text-muted-foreground">It’s the best time to manage your finances.</p>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <Button variant="outline" size="sm">This month</Button>
          <Button variant="outline" size="sm">Manage widgets</Button>
          <Button size="sm">Add new widget</Button>
          <div class="flex items-center gap-3 rounded-full border px-3 py-2">
            <div class="text-right text-sm">
              <p class="font-medium">Adaline Lively</p>
              <p class="text-muted-foreground">adina@example.com</p>
            </div>
            <div class="size-10 overflow-hidden rounded-full">
              <img alt="Avatar" class="h-full w-full object-cover" src="https://i.pravatar.cc/100?img=12" />
            </div>
          </div>
        </div>
      </header>
      <main class="flex-1 overflow-y-auto bg-muted/40 p-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>
