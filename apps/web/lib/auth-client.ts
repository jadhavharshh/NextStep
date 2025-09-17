import { createAuthClient } from "better-auth/client"

export const client = createAuthClient({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
})

export const signUp = client.signUp
export const signIn = client.signIn
export const signOut = client.signOut