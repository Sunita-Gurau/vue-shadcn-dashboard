<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  ArrowDownRight,
  ArrowUp,
  ArrowUpRight,
  CircleDollarSign,
  CreditCard,
  ShoppingCart,
} from 'lucide-vue-next'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import DateFilter from '@/components/ui/DateFilter.vue'

const metrics = computed(() => [
  {
    title: 'Total balance',
    value: '$15,700.00',
    change: '+12.1%',
    positive: true,
    icon: CircleDollarSign,
  },
  {
    title: 'Income',
    value: '$8,500.00',
    change: '+8.1%',
    positive: true,
    icon: ArrowUp,
  },
  {
    title: 'Expense',
    value: '$6,222.00',
    change: '-2.4%',
    positive: false,
    icon: ShoppingCart,
  },
  {
    title: 'Total savings',
    value: '$32,913.00',
    change: '+4.2%',
    positive: true,
    icon: CreditCard,
  },
])

const budgets = [
  { label: 'Cafe & Restaurants', amount: 1250, percentage: 68 },
  { label: 'Investments', amount: 2150, percentage: 42 },
  { label: 'Health & Groceries', amount: 980, percentage: 35 },
  { label: 'Shopping', amount: 1950, percentage: 78 },
  { label: 'Travelling', amount: 860, percentage: 54 },
]

const savingsGoals = [
  { label: 'MacBook Pro', value: '$1,650', progress: 60 },
  { label: 'New car', value: '$6,400', progress: 28 },
  { label: 'New house', value: '$18,950', progress: 45 },
]

const transactions = [
  {
    date: '25 Jul 12:20 PM',
    amount: '-$80',
    name: 'YouTube',
    method: 'VISA *1254',
    category: 'Subscription',
    status: 'Active',
  },
  {
    date: '26 Jul 5:10 PM',
    amount: '-$150',
    name: 'Reserved',
    method: 'Mastercard *7854',
    category: 'Shopping',
    status: 'Pending',
  },
  {
    date: '28 Jul 9:00 AM',
    amount: '+$900',
    name: 'YopasNow',
    method: 'Mastercard *6543',
    category: 'Cafe & Restaurants',
    status: 'Completed',
  },
  {
    date: '30 Jul 8:40 PM',
    amount: '-$60',
    name: 'Spotify',
    method: 'VISA *1254',
    category: 'Subscription',
    status: 'Active',
  },
]
const selectedPreset = ref('this_month')
const selectedRange = ref<{ preset: string; from?: string; to?: string } | null>(null)

const handleDateChange = (payload: { preset: string; from?: string; to?: string }) => {
  selectedRange.value = payload
}

const moneyFlow = [
  { month: 'Jan', income: 9200, expense: 5400 },
  { month: 'Feb', income: 10400, expense: 6100 },
  { month: 'Mar', income: 11800, expense: 6800 },
  { month: 'Apr', income: 9800, expense: 5900 },
  { month: 'May', income: 12800, expense: 7200 },
  { month: 'Jun', income: 7600, expense: 4900 },
  { month: 'Jul', income: 8300, expense: 5100 },
]

const maxMoneyValue = computed(() =>
  moneyFlow.reduce((max, item) => Math.max(max, item.income, item.expense), 0),
)

const budgetCategories = [
  { label: 'Cafe & Restaurants', amount: 1250, color: 'bg-primary' },
  { label: 'Entertainment', amount: 820, color: 'bg-sky-400' },
  { label: 'Investments', amount: 1550, color: 'bg-violet-400' },
  { label: 'Food & Groceries', amount: 960, color: 'bg-rose-400' },
  { label: 'Health & Beauty', amount: 730, color: 'bg-emerald-400' },
  { label: 'Traveling', amount: 640, color: 'bg-amber-400' },
]

const budgetTotal = 5950
const budgetUsed = computed(() => budgetCategories.reduce((sum, item) => sum + item.amount, 0))
const budgetProgress = computed(() => Math.min(100, Math.round((budgetUsed.value / budgetTotal) * 100)))
const budgetRingStyle = computed(() => ({
  background: `conic-gradient(hsl(var(--primary)) ${budgetProgress.value}%, #ede9fe ${budgetProgress.value}% 100%)`,
}))
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-wrap items-center justify-end gap-3">
      <DateFilter v-model="selectedPreset" class-name="h-10" @change="handleDateChange" />
      <Button
        variant="outline"
        size="sm"
        class="flex items-center gap-2 rounded-full border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        Manage widgets
      </Button>
      <Button
        size="sm"
        class="flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold shadow-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4v16m8-8H4" />
        </svg>
        Add new widget
      </Button>
    </div>
    <section class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card
        v-for="metric in metrics"
        :key="metric.title"
        class="rounded-3xl border border-slate-200 bg-white/90 shadow-sm"
      >
        <div class="flex flex-col gap-6 p-6">
          <div class="flex items-start justify-between">
            <div>
              <CardDescription class="text-sm font-medium text-muted-foreground">
                {{ metric.title }}
              </CardDescription>
              <CardTitle class="mt-2 text-3xl font-semibold text-foreground">
                {{ metric.value }}
              </CardTitle>
            </div>
            <span class="grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-slate-400">
              <ArrowUpRight class="h-4 w-4" />
            </span>
          </div>
          <div class="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <span
              :class="[
                'flex items-center gap-1 rounded-full px-2.5 py-1',
                metric.positive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-500',
              ]"
            >
              <component :is="metric.positive ? ArrowUpRight : ArrowDownRight" class="h-3.5 w-3.5" />
              {{ metric.change }}
            </span>
            <span>vs last month</span>
          </div>
        </div>
      </Card>
    </section>

    <section class="grid gap-6 lg:grid-cols-[2fr,1fr]">
      <Card class="rounded-3xl border border-slate-200 bg-white/90 shadow-sm">
        <div class="flex flex-col gap-6 p-6">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div>
              <CardTitle class="text-xl font-semibold">Money flow</CardTitle>
              <p class="text-sm text-muted-foreground">Track income and expenses across months</p>
            </div>
            <div class="flex flex-wrap items-center gap-2 text-xs font-medium text-muted-foreground">
              <span class="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1">
                <span class="h-2 w-2 rounded-full bg-primary"></span> Income
              </span>
              <span class="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1">
                <span class="h-2 w-2 rounded-full bg-slate-300"></span> Expense
              </span>
              <Button variant="ghost" size="sm" class="h-8 rounded-full border border-slate-200 px-3">
                All accounts
              </Button>
              <Button variant="ghost" size="sm" class="h-8 rounded-full border border-slate-200 px-3">
                This year
              </Button>
            </div>
          </div>

          <div class="grid gap-4">
            <div class="flex justify-between text-xs text-muted-foreground">
              <span>$0</span>
              <span>{{ `$${maxMoneyValue.toLocaleString()}` }}</span>
            </div>
            <div class="grid grid-cols-7 items-end gap-4">
              <div
                v-for="item in moneyFlow"
                :key="item.month"
                class="flex flex-col items-center gap-2"
              >
                <div class="flex h-40 w-full items-end justify-center gap-1 rounded-2xl bg-slate-100 p-2">
                  <div
                    class="w-4 rounded-t-full bg-slate-300"
                    :style="{ height: `${Math.max(12, (item.expense / maxMoneyValue) * 100)}%` }"
                  ></div>
                  <div
                    class="w-4 rounded-t-full bg-primary"
                    :style="{ height: `${Math.max(16, (item.income / maxMoneyValue) * 100)}%` }"
                  ></div>
                </div>
                <span class="text-xs font-medium text-muted-foreground">{{ item.month }}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card class="rounded-3xl border border-slate-200 bg-white/90 shadow-sm">
        <div class="flex flex-col gap-6 p-6">
          <div class="flex items-start justify-between">
            <div>
              <CardTitle class="text-xl font-semibold">Budget</CardTitle>
              <p class="text-sm text-muted-foreground">Spending distribution this month</p>
            </div>
            <span class="grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-slate-400">
              <ArrowUpRight class="h-4 w-4" />
            </span>
          </div>
          <div class="flex items-center gap-6">
            <div class="relative">
              <div class="grid h-36 w-36 place-items-center rounded-full bg-slate-100" :style="budgetRingStyle">
                <div class="grid h-24 w-24 place-items-center rounded-full bg-white text-center">
                  <div class="text-xs text-muted-foreground">Total for month</div>
                  <div class="text-lg font-semibold text-foreground">${{ budgetTotal.toLocaleString() }}</div>
                </div>
              </div>
              <span class="absolute inset-x-0 -bottom-6 text-center text-xs text-muted-foreground">
                {{ budgetProgress }}% used
              </span>
            </div>
            <div class="flex-1 space-y-2 text-sm">
              <div
                v-for="category in budgetCategories"
                :key="category.label"
                class="flex items-center justify-between gap-3"
              >
                <div class="flex items-center gap-2">
                  <span :class="['h-2.5 w-2.5 rounded-full', category.color]"></span>
                  <span class="text-muted-foreground">{{ category.label }}</span>
                </div>
                <span class="font-medium text-foreground">${{ category.amount.toLocaleString() }}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>


    <section class="grid gap-6 lg:grid-cols-[2fr,1fr]">
      <Card>
        <CardHeader>
          <CardTitle>Recent transactions</CardTitle>
        </CardHeader>
        <CardContent class="p-0">
          <ScrollArea class="h-80">
            <table class="w-full min-w-[600px] text-sm">
              <thead class="sticky top-0 bg-muted/60 backdrop-blur">
                <tr class="grid grid-cols-6 border-b px-4 py-2 text-left text-muted-foreground">
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Payment name</th>
                  <th>Method</th>
                  <th>Category</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="transaction in transactions"
                  :key="transaction.date + transaction.name"
                  class="grid grid-cols-6 items-center border-b px-4 py-3"
                >
                  <td class="font-medium">{{ transaction.date }}</td>
                  <td :class="transaction.amount.startsWith('-') ? 'text-destructive' : 'text-emerald-500'">
                    {{ transaction.amount }}
                  </td>
                  <td>{{ transaction.name }}</td>
                  <td>{{ transaction.method }}</td>
                  <td>{{ transaction.category }}</td>
                  <td>
                    <Badge variant="secondary">{{ transaction.status }}</Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </ScrollArea>
        </CardContent>
      </Card>

      <div class="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Saving goals</CardTitle>
            <CardDescription>Keep track of your progress</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div v-for="goal in savingsGoals" :key="goal.label" class="space-y-2">
              <div class="flex items-center justify-between text-sm">
                <span>{{ goal.label }}</span>
                <span class="font-medium">{{ goal.value }}</span>
              </div>
              <Progress :model-value="goal.progress" class="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top customers</CardTitle>
            <CardDescription>This month</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="flex items-center gap-3" v-for="idx in 3" :key="idx">
              <Avatar>
                <AvatarImage :src="`https://i.pravatar.cc/100?img=${idx + 10}`" />
                <AvatarFallback>AL</AvatarFallback>
              </Avatar>
              <div class="flex-1">
                <p class="text-sm font-medium">Adaline Lively</p>
                <p class="text-xs text-muted-foreground">UI Designer</p>
              </div>
              <span class="text-sm font-semibold text-emerald-500">+15.2%</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  </div>
</template>
