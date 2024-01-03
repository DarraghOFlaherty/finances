<script setup lang="ts">
import { TransactionType } from '@prisma/client'
import { toTypedSchema } from '@vee-validate/zod'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { z } from 'zod'

const formSchema = toTypedSchema(z.object({
  type: z
    .enum([TransactionType.INCOME, TransactionType.EXPENDITURE])
    .default(TransactionType.EXPENDITURE),
  category: z.string(),
  transactionAt: z.date().default(new Date()),
  amount: z.number().default(0),
}))

const { handleSubmit, values } = useForm({
  validationSchema: formSchema,
})

const expenditureCategories = [
  'Housing',
  'Transportation',
  'Food',
  'Utilities',
  'Insurance',
  'Medical & Healthcare',
  'Saving, Investing, & Debt Payments',
  'Personal Spending',
  'Recreation & Entertainment',
  'Miscellaneous',
]

const incomeCategories = [
  'Salary & Wages',
  'Self-employed income',
  'Bonus',
  'Tips',
  'Tax refund',
  'Gifts received',
  'Alimony received',
  'Child support received',
  'Rental income',
  'Dividend income',
  'Interest earned',
]
const { $client } = useNuxtApp()

const { mutate } = $client.transactions.createOne.useMutation()

const onSubmit = handleSubmit(async (values) => {
  const payload = {
    ...values,
    accountId: '7818736b-a6ed-48ed-a78d-76fed93238ca',
    categoryId: '7818736b-a6ed-48ed-a78d-76fed93238ca',
  }
  mutate(payload)
})
</script>

<template>
  <Dialog>
    <DialogTrigger>
      <slot />
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>New Transaction</DialogTitle>
      </DialogHeader>

      <form class="space-y-6 mt-6" @submit="onSubmit">
        <FormField v-slot="{ componentField }" type="radio" name="type">
          <FormItem class="space-y-3">
            <FormLabel>Type</FormLabel>

            <FormControl>
              <RadioGroup class="flex flex-col space-y-1" v-bind="componentField">
                <FormItem class="flex items-center space-y-0 gap-x-3">
                  <FormControl>
                    <RadioGroupItem value="EXPENDITURE" />
                  </FormControl>
                  <FormLabel class="font-normal">
                    Expenditure
                  </FormLabel>
                </FormItem>
                <FormItem class="flex items-center space-y-0 gap-x-3">
                  <FormControl>
                    <RadioGroupItem value="INCOME" />
                  </FormControl>
                  <FormLabel class="font-normal">
                    Income
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="category">
          <FormItem>
            <FormLabel>Category</FormLabel>
            <div class="flex w-full items-center gap-1.5">
              <Select v-bind="componentField">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup v-if="values.type === TransactionType.EXPENDITURE">
                    <SelectItem v-for="category in expenditureCategories" :key="category" :value="category">
                      {{ category }}
                    </SelectItem>
                  </SelectGroup>
                  <SelectGroup v-else>
                    <SelectItem v-for="category in incomeCategories" :key="category" :value="category">
                      {{ category }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <DialogNewCategory>
                <Button>
                  Create
                </Button>
              </DialogNewCategory>
            </div>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField, value }" name="transactionAt">
          <FormItem class="flex flex-col">
            <FormLabel>Date</FormLabel>
            <Popover>
              <PopoverTrigger as-child>
                <FormControl>
                  <Button
                    variant="outline" :class="cn(
                      'w-[240px] ps-3 text-start font-normal',
                      !value && 'text-muted-foreground',
                    )"
                  >
                    <span>{{ value ? format(value, "PPP") : "Pick a date" }}</span>
                    <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent class="p-0">
                <Calendar v-bind="componentField" />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="amount">
          <FormItem>
            <FormLabel>Amount</FormLabel>
            <FormControl>
              <Input type="number" placeholder="shadcn" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <Button type="submit">
          Submit
        </Button>
      </form>
    </DialogContent>
  </Dialog>
</template>
