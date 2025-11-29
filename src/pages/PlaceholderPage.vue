<script setup lang="ts">
const props = defineProps<{
  title: string
  description?: string
}>()
</script>

<template>
  <section class="flex h-full flex-col items-center justify-center gap-4 rounded-2xl border bg-card p-12 text-center shadow-sm">
    <div class="space-y-1">
      <h2 class="text-2xl font-semibold">{{ props.title }}</h2>
      <p class="max-w-md text-sm text-muted-foreground">
        {{ props.description ?? 'We are still crafting this experience. Check back soon!' }}
      </p>
    </div>
  </section>
</template>
