<template>
  <div class="relative z-10" ref="dateFilterRef">
    <div
      ref="buttonRef"
      class="flex h-9 cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-slate-300 focus:border-primary focus:outline-none"
      :class="className"
      tabindex="0"
      @click="toggleDropdown"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M12.6667 2.66667H3.33333C2.59695 2.66667 2 3.26362 2 4V13.3333C2 14.0697 2.59695 14.6667 3.33333 14.6667H12.6667C13.403 14.6667 14 14.0697 14 13.3333V4C14 3.26362 13.403 2.66667 12.6667 2.66667Z"
          stroke="currentColor"
          stroke-width="1.33333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path d="M10.6667 1.33334V4.00001" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M5.33333 1.33334V4.00001" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M2 6.66667H14" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <span class="text-sm font-medium">{{ displayText }}</span>
    </div>

    <div
      v-if="isOpen"
      class="absolute right-0 z-[99] mt-1 w-72 rounded border border-slate-100 bg-white shadow-lg"
      :style="dropdownStyle"
    >
      <div class="p-3">
        <div class="flex flex-col gap-1">
          <div
            v-for="preset in presets"
            :key="preset.value"
            class="w-full cursor-pointer rounded px-3 py-2 text-left text-sm font-semibold text-slate-500 transition-colors hover:bg-slate-100"
            :class="{ 'bg-slate-100 text-slate-700': selectedPreset === preset.value }"
            tabindex="0"
            @click="selectPreset(preset.value)"
          >
            {{ preset.label }}
          </div>
        </div>

        <div v-if="selectedPreset === 'custom'" class="mt-3">
          <div class="flex items-end gap-2">
            <div class="flex-1">
              <label for="date-from" class="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">From</label>
              <div class="relative cursor-pointer" @click="dateFromInput?.showPicker()">
                <input
                  id="date-from"
                  ref="dateFromInput"
                  v-model="customFromDate"
                  type="date"
                  :max="customToDate"
                  class="h-9 w-full cursor-pointer rounded border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-sky-500 focus:outline-none"
                />
              </div>
            </div>
            <span class="pb-2 text-sm font-semibold text-slate-500">-</span>
            <div class="flex-1">
              <label for="date-to" class="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">To</label>
              <div class="relative cursor-pointer" @click="dateToInput?.showPicker()">
                <input
                  id="date-to"
                  ref="dateToInput"
                  v-model="customToDate"
                  type="date"
                  :min="customFromDate"
                  class="h-9 w-full cursor-pointer rounded border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-sky-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div class="mt-3 flex justify-end">
            <button
              class="rounded bg-sky-500 px-4 py-1 text-xs font-semibold text-white transition-colors hover:bg-sky-600"
              type="button"
              @click="applyCustomRange"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

interface DateFilterProps {
  modelValue?: string
  className?: string
}

interface DateFilterEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: { preset: string; from?: string; to?: string }): void
}

const props = withDefaults(defineProps<DateFilterProps>(), {
  modelValue: 'this_month',
  className: '',
})

const emit = defineEmits<DateFilterEmits>()

const dateFilterRef = ref<HTMLElement | null>(null)
const buttonRef = ref<HTMLElement | null>(null)
const dateFromInput = ref<HTMLInputElement | null>(null)
const dateToInput = ref<HTMLInputElement | null>(null)
const isOpen = ref(false)
const selectedPreset = ref(props.modelValue)
const customFromDate = ref('')
const customToDate = ref('')

const dropdownStyle = computed(() => {
  return {}
})

const presets = [
  { label: 'Today', value: 'today' },
  { label: 'Yesterday', value: 'yesterday' },
  { label: 'This Week', value: 'this_week' },
  { label: 'This Month', value: 'this_month' },
  { label: 'Custom', value: 'custom' },
]

const displayText = computed(() => {
  if (selectedPreset.value === 'custom' && customFromDate.value && customToDate.value) {
    return `${formatDate(customFromDate.value)} - ${formatDate(customToDate.value)}`
  }
  const preset = presets.find((p) => p.value === selectedPreset.value)
  return preset?.label || 'This Month'
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const getPresetDates = (preset: string): { from: string; to: string } => {
  const today = new Date()
  const formatDateISO = (date: Date) => date.toISOString().split('T')[0]

  switch (preset) {
    case 'today':
      return { from: formatDateISO(today), to: formatDateISO(today) }
    case 'yesterday': {
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)
      return { from: formatDateISO(yesterday), to: formatDateISO(yesterday) }
    }
    case 'this_week': {
      const firstDay = new Date(today)
      const day = firstDay.getDay()
      const diff = firstDay.getDate() - day + (day === 0 ? -6 : 1)
      firstDay.setDate(diff)
      return { from: formatDateISO(firstDay), to: formatDateISO(today) }
    }
    case 'this_month': {
      const firstDay = new Date(today.getFullYear(), today.getMonth(), 1)
      return { from: formatDateISO(firstDay), to: formatDateISO(today) }
    }
    default:
      return { from: '', to: '' }
  }
}

const selectPreset = (value: string) => {
  selectedPreset.value = value

  if (value !== 'custom') {
    isOpen.value = false
    emit('update:modelValue', value)
    const dates = getPresetDates(value)
    emit('change', { preset: value, from: dates.from, to: dates.to })
  }
}

const applyCustomRange = () => {
  if (customFromDate.value && customToDate.value) {
    isOpen.value = false
    emit('update:modelValue', 'custom')
    emit('change', {
      preset: 'custom',
      from: customFromDate.value,
      to: customToDate.value,
    })
  }
}

watch(
  () => props.modelValue,
  (newValue) => {
    if (!newValue) return
    selectedPreset.value = newValue
    if (newValue !== 'custom') {
      const dates = getPresetDates(newValue)
      customFromDate.value = dates.from
      customToDate.value = dates.to
    }
  },
  { immediate: true },
)

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const handleClickOutside = (event: MouseEvent) => {
  if (dateFilterRef.value && !dateFilterRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
