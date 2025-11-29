<script setup lang="ts">
import { computed, ref, watch, defineExpose } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

import { Button } from '@/components/ui/button'

import {
  LayoutGrid,
  ChartColumnBig,
  Wallet,
  Target,
  PiggyBank,
  LineChart,
  Settings,
  LifeBuoy,
  LogOut,
  Sparkles,
  MoonStar,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-vue-next'

interface NavItem {
  label: string
  to: string
  icon: any
}

const navItems: NavItem[] = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutGrid },
  { label: 'Transactions', to: '/transactions', icon: ChartColumnBig },
  { label: 'Wallet', to: '/wallet', icon: Wallet },
  { label: 'Goals', to: '/goals', icon: Target },
  { label: 'Budget', to: '/budgets', icon: PiggyBank },
  { label: 'Analytics', to: '/analytics', icon: LineChart },
  { label: 'Settings', to: '/settings', icon: Settings },
]

const tertiaryItems: NavItem[] = [
  { label: 'Help', to: '#', icon: LifeBuoy },
  { label: 'Log out', to: '#', icon: LogOut },
]

const route = useRoute()
const currentPath = computed(() => route.path)
const isCollapsed = ref<boolean>(false)
const isMobileOpen = ref<boolean>(false)

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}
const openMobile = () => {
  isMobileOpen.value = true
}
const closeMobile = () => {
  isMobileOpen.value = false
}

watch(
  () => route.path,
  () => {
    isMobileOpen.value = false
  },
)

defineExpose({ openMobile })
</script>

<template>
  <aside
    class="hidden border-r bg-primary/10 p-4 text-sm transition-[width] duration-300 ease-in-out md:flex md:flex-col"
    :style="{ width: isCollapsed ? '96px' : '288px' }"
  >
    <div class="flex items-center justify-between gap-2 px-2 text-xl font-semibold text-foreground">
      <div class="flex items-center gap-2" :class="isCollapsed ? 'justify-center w-full' : ''">
        <span class="grid h-10 w-10 place-content-center rounded-full bg-primary text-primary-foreground">
          <span class="text-lg">FS</span>
        </span>
        <span v-if="!isCollapsed">FinSet</span>
      </div>
      <Button
        size="icon"
        variant="ghost"
        class="size-9 rounded-full border border-slate-200 bg-white/80 text-slate-500 shadow-sm transition-colors hover:bg-white hover:text-primary"
        aria-label="Toggle sidebar width"
        @click="toggleCollapse"
      >
        <component :is="isCollapsed ? ChevronRight : ChevronLeft" class="h-4 w-4" />
      </Button>
    </div>
    <nav class="mt-8 flex flex-1 flex-col gap-2">
      <RouterLink
        v-for="item in navItems"
        :key="item.label"
        :to="item.to"
        class="group relative flex items-center gap-3 rounded-full px-3 py-2 font-medium transition"
        :class="currentPath === item.to
          ? 'bg-primary text-primary-foreground shadow-sm'
          : 'text-foreground/70 hover:bg-primary/20 hover:text-foreground'"
      >
        <div
          class="flex size-9 items-center justify-center rounded-full"
          :class="currentPath === item.to
            ? 'bg-primary/20 text-primary-foreground'
            : 'bg-background/60 text-foreground/60 group-hover:text-foreground'"
        >
          <component :is="item.icon" class="h-4 w-4" />
        </div>
        <span v-if="!isCollapsed">{{ item.label }}</span>
        <span
          v-else
          class="absolute left-full ml-3 hidden rounded-full bg-background px-3 py-1 text-xs font-medium text-foreground shadow group-hover:flex group-hover:items-center"
        >
          {{ item.label }}
        </span>
      </RouterLink>
    </nav>
    <div class="mt-auto space-y-2 px-1">
      <Button
        v-for="item in tertiaryItems"
        :key="item.label"
        variant="ghost"
        class="flex w-full items-center justify-start gap-3 rounded-full px-3 py-2 text-foreground/70 hover:text-foreground"
      >
        <component :is="item.icon" class="h-4 w-4" />
        <span v-if="!isCollapsed">{{ item.label }}</span>
      </Button>
      <div class="mt-4 flex items-center gap-3 rounded-full border bg-background px-3 py-3 text-xs text-foreground/70">
        <Sparkles class="h-4 w-4 text-primary" />
        <div v-if="!isCollapsed" class="flex-1 font-medium">Upgrade plan</div>
        <Button size="icon" variant="ghost" class="size-8 rounded-full text-foreground/70" aria-label="Toggle theme">
          <MoonStar class="h-4 w-4" />
        </Button>
      </div>
    </div>
  </aside>

  <aside
    class="fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r bg-background p-4 text-sm shadow-lg transition-transform duration-300 md:hidden"
    :class="isMobileOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <div class="flex items-center justify-between text-xl font-semibold text-foreground">
      <div class="flex items-center gap-2">
        <span class="grid h-10 w-10 place-content-center rounded-full bg-primary text-primary-foreground">
          <span class="text-lg">F</span>
        </span>
        <span>FinSet</span>
      </div>
      <Button size="icon" variant="ghost" class="rounded-full" aria-label="Close menu" @click="closeMobile">
        <X class="h-5 w-5" />
      </Button>
    </div>
    <nav class="mt-8 flex flex-1 flex-col gap-2">
      <RouterLink
        v-for="item in navItems"
        :key="item.label"
        :to="item.to"
        class="flex items-center gap-3 rounded-full px-3 py-2 font-medium transition"
        :class="currentPath === item.to
          ? 'bg-primary text-primary-foreground shadow-sm'
          : 'text-foreground/70 hover:bg-primary/20 hover:text-foreground'"
      >
        <div class="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
          <component :is="item.icon" class="h-4 w-4" />
        </div>
        <span>{{ item.label }}</span>
      </RouterLink>
    </nav>
    <div class="mt-auto space-y-2">
      <Button
        v-for="item in tertiaryItems"
        :key="item.label"
        variant="ghost"
        class="flex w-full items-center justify-start gap-3 rounded-full px-3 py-2 text-foreground/70 hover:text-foreground"
      >
        <component :is="item.icon" class="h-4 w-4" />
        <span>{{ item.label }}</span>
      </Button>
    </div>
  </aside>

  <div
    class="fixed inset-0 z-30 bg-background/60 backdrop-blur-sm transition-opacity duration-300 md:hidden"
    :class="isMobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0'"
    @click="closeMobile"
  ></div>
</template>
