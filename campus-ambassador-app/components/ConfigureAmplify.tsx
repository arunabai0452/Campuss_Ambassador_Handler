"use client"

import { Amplify, ResourcesConfig } from "aws-amplify"
import { Hub } from "aws-amplify/utils"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { env } from "@/env/client"
import { useAuthStore } from "@/stores/useAuthStore"

export const authConfig: ResourcesConfig["Auth"] = {
  Cognito: {
    userPoolId: env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID,
    userPoolClientId: env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID,
    loginWith: {
      oauth: {
        domain: env.NEXT_PUBLIC_AWS_COGNITO_DOMAIN,
        responseType: "code",
        scopes: ["aws.cognito.signin.user.admin", "email", "openid", "phone", "profile"],
        providers: ["Google", "Apple"],
        redirectSignIn: [env.NEXT_PUBLIC_REDIRECT_SIGN_IN],
        redirectSignOut: [env.NEXT_PUBLIC_REDIRECT_SIGN_OUT],
      },
    },
  },
}

Amplify.configure(
  {
    Auth: authConfig,
  },
  { ssr: true }
)

export default function ConfigureAmplifyClientSide() {
  const router = useRouter()
  const { checkTokenExpiry } = useAuthStore()

  useEffect(() => {
    const stopCheckingToken = checkTokenExpiry()
    return () => stopCheckingToken()
  }, [checkTokenExpiry])

  useEffect(() => {
    const unsubscribe = Hub.listen("auth", async ({ payload }) => {
      switch (payload.event) {
        case "signedIn":
          console.log("user have been signedIn successfully.")
          break
        case "signedOut":
          console.log("user have been signedOut successfully.")
          router.push("/auth/login")
          break
        case "tokenRefresh":
          console.log("auth tokens have been refreshed.")
          break
        case "tokenRefresh_failure":
          console.log("failure while refreshing auth tokens.")
          break
        case "signInWithRedirect":
          console.log("signInWithRedirect API has successfully been resolved.")
          break
        case "signInWithRedirect_failure":
          console.log("failure while trying to resolve signInWithRedirect API.")
          break
        case "customOAuthState":
          console.log("customOAuthState has been called.")
          break
      }
    })

    return unsubscribe
  }, [router])

  return null
}
