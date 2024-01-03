import { type Transaction, TransactionType } from '@prisma/client'
import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import { format } from 'date-fns'

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'transactionAt',
    header: 'Date',
    cell: ({ row }) => {
      const transactionAt = row.getValue<Date>('transactionAt')
      return h('div', { }, format(transactionAt, 'PPP'))
    },
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'amount',
    header: () => h('div', { class: 'text-right' }, 'Income'),
    cell: ({ row }) => {
      if (row.original.type === TransactionType.EXPENDITURE)
        return h('div', { class: 'text-right font-medium' }, '')

      const amount = Number.parseFloat(row.getValue('amount'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)

      return h('div', { class: 'text-right font-medium' }, formatted)
    },
  },
  {
    accessorKey: 'amount',
    header: () => h('div', { class: 'text-right' }, 'Expenditure'),
    cell: ({ row }) => {
      if (row.original.type === TransactionType.INCOME)
        return h('div', { class: 'text-right font-medium' }, '')

      const amount = Number.parseFloat(row.getValue('amount'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)

      return h('div', { class: 'text-right font-medium' }, formatted)
    },
  },
]
