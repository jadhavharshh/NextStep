import { createAuthClient } from "better-auth/react"

const baseURL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export const client = createAuthClient({
  baseURL,
})

// Log the configuration for debugging
console.log('Better Auth Client Configuration:', {
  baseURL,
  signUpEndpoint: `${baseURL}/api/auth/sign-up/email`,
  signInEndpoint: `${baseURL}/api/auth/sign-in/email`
});

export const signUp = client.signUp
export const signIn = client.signIn
export const signOut = client.signOut
export const useSession = client.useSession