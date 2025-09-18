import { createAuthClient } from "better-auth/react"

export const client = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
})

export const signUp = client.signUp
export const signIn = client.signIn
export const signOut = client.signOut
export const useSession = client.useSession