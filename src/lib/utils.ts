import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Ref } from 'vue'

type Updater<T> = ((current: T) => T) | T

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function valueUpdater<T>(updaterOrValue: Updater<T>, ref: Ref<T>) {
  ref.value =
    typeof updaterOrValue === 'function'
      ? (updaterOrValue as (current: T) => T)(ref.value)
      : (updaterOrValue as T)
}
