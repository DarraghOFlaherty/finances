import type { SupabaseClient, User } from '@supabase/supabase-js'
import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

let client: SupabaseClient
let user: User | null

declare module 'h3' {
  interface H3EventContext {
    client: SupabaseClient
    user: User | null
  }
}

export default eventHandler(async (event) => {
  if (!client)
    client = await serverSupabaseClient(event)

  event.context.client = client

  if (!user) {
    try {
      user = await serverSupabaseUser(event)
    }
    catch {
      console.warn('Failed to get server supabase user.')
    }
  }

  event.context.user = user
})
