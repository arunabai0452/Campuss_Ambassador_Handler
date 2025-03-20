import { fetchAuthSession, signIn, signInWithRedirect, signOut } from "aws-amplify/auth"
import { returnErrorMessage } from "@/utils/returnErrorMessage"

export async function handleSignIn(formData: { email: string; password: string }) {
  try {
    await signIn({
      username: formData.email,
      password: formData.password,
    })
  } catch (error) {
    throw returnErrorMessage(error)
  }
}

export async function handleSignOut() {
  try {
    await signOut()
  } catch (error) {
    throw returnErrorMessage(error)
  }
}

export async function handleSocialLogin(provider: "Google" | "Apple") {
  try {
    await signInWithRedirect({ provider: provider })
  } catch (error) {
    throw returnErrorMessage(error)
  }
}

export async function getAccessToken() {
  const session = await fetchAuthSession()
  const accessToken = session.tokens?.accessToken

  if (!accessToken?.payload.exp) return

  const isExpired = Math.floor(Date.now() / 1000) > accessToken.payload.exp

  if (isExpired) {
    const newSession = await fetchAuthSession({ forceRefresh: true })
    return newSession.tokens?.accessToken?.toString()
  }

  return accessToken.toString()
}
