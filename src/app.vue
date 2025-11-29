<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'

import { Button } from '@/components/ui/button'
import AppSidebar from '@/components/layout/AppSidebar.vue'

import { Menu } from 'lucide-vue-next'

const sidebarRef = ref<{ openMobile: () => void } | null>(null)

const openMobile = () => {
  sidebarRef.value?.openMobile()
}

</script>

<template>
  <div class="flex h-screen overflow-hidden bg-muted/40">
    <AppSidebar ref="sidebarRef" />
    <div class="flex flex-1 flex-col overflow-hidden">
      <header class="flex flex-wrap items-center justify-between gap-4 border-b bg-background px-6 py-4">
        <div>
          <div class="flex items-center gap-3">
            <Button size="icon" variant="ghost" class="md:hidden" aria-label="Open menu" @click="openMobile">
              <Menu class="h-5 w-5" />
            </Button>
            <div>
              <h1 class="text-2xl font-semibold tracking-tight">Welcome back, Adaline!</h1>
              <p class="text-sm text-muted-foreground">It’s the best time to manage your finances.</p>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap items-center gap-3">
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
