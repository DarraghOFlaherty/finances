/**
 * This is your entry point to setup the root configuration for tRPC on the server.
 * - `initTRPC` should only be used once per app.
 * - We export only the functionality that we use so we can enforce which base procedures should be used
 *
 * Learn how to create protected base procedures and other things below:
 * @see https://trpc.io/docs/v10/router
 * @see https://trpc.io/docs/v10/procedures
 */
import { initTRPC } from '@trpc/server'
import superjson from 'superjson'
import type { Context } from '~/server/trpc/context'

const t = initTRPC.context<Context>().create({
  transformer: superjson,
})

/**
 * Unprotected procedure
 */
export const middleware = t.middleware
export const baseProcedure = t.procedure
  .use(middleware(async ({ path, type, ctx, next }) => {
    const start = Date.now()
    const result = await next({ ctx })
    const timeTakenInMs = Date.now() - start
    console.info('Request: ', { path, type, success: result.ok, timeTakenInMs })
    return result
  }))
export const authorizedProcedure = baseProcedure
  .use(({ ctx, next }) => {
    // if (!ctx.user)
    //   throw new TRPCError({ code: 'UNAUTHORIZED' })

    return next({
      ctx: {
        ...ctx,
        user: ctx.user,
      },
    })
  })
export const router = t.router
