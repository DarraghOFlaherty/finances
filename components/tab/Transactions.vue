<script setup lang="ts">
import { type Transaction, TransactionType } from '@prisma/client'
import { columns } from '@/components/transactions/columns'

const data = ref<Transaction[]>([])

async function getData(): Promise<Transaction[]> {
  return [
    {
      transactionAt: new Date(),
      type: TransactionType.EXPENDITURE,
      category: 'SOMETHING',
      amount: 100,
    },
  ]
}

onMounted(async () => {
  data.value = await getData()
})
</script>

<template>
  <div class="mx-auto">
    <TransactionsDataTable v-if="data.length > 0" :columns="columns" :data="data" />
  </div>
</template>
