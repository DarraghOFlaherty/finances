import { TransactionType } from '@prisma/client'
import { z } from 'zod'
import { baseProcedure, router } from '../trpc'

const createTransaction = z.object({
  accountId: z.string().uuid(),
  type: z.enum([TransactionType.INCOME, TransactionType.EXPENDITURE]),
  amount: z.number().min(1),
  categoryId: z.string().uuid(),
  transactionAt: z.date(),
})

export const transactionsRouter = router({
  findAll: baseProcedure
    .query(({ ctx }) => {
      return ctx.prisma.transaction.findMany()
    }),
  createOne: baseProcedure
    .input(createTransaction)
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.$transaction(async (tx) => {
        const transaction = await tx.transaction.create({ data: { ...input, createdBy: '' } })

        await tx.account.update({
          where: {
            id: input.accountId,
          },
          data: {
            balance: { increment: input.amount * (input.type === TransactionType.INCOME ? 1 : -1) },
          },
        })

        return transaction
      })
    }),
  findOne: baseProcedure
    .query(() => {
      return null
    }),
  updateOne: baseProcedure
    .query(() => {
      return null
    }),
  deleteOne: baseProcedure
    .query(() => {
      return null
    }),
})

// export type definition of API
export type AccountsRouter = typeof transactionsRouter
