import { baseProcedure, router } from '../trpc'

export const accountsRouter = router({
  signUp: baseProcedure
    .query(() => {
      return null
    }),
  signIn: baseProcedure
    .mutation(() => {
      return null
    }),
  signOut: baseProcedure
    .query(() => {
      return null
    }),
})

// export type definition of API
export type AccountsRouter = typeof accountsRouter
