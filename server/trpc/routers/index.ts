import { router } from '../trpc'
import { accountsRouter } from './accounts'
import { categoriesRouter } from './categories'
import { transactionsRouter } from './transactions'

export const appRouter = router({
  accounts: accountsRouter,
  categories: categoriesRouter,
  transactions: transactionsRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
