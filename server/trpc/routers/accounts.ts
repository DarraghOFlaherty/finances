import { baseProcedure, router } from '../trpc'

export const accountsRouter = router({
  create: baseProcedure
    .mutation(() => {
      return null
    }),
  find: baseProcedure
    .query(() => {
      return null
    }),
  update: baseProcedure
    .query(() => {
      return null
    }),
  delete: baseProcedure
    .query(() => {
      return null
    }),
})

// export type definition of API
export type AccountsRouter = typeof accountsRouter
