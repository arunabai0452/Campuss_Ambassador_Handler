import {
  createServerRunner,
  type NextServer,
} from "@aws-amplify/adapter-nextjs";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth/server"
import { authConfig } from "@/components/ConfigureAmplify"
import { fetchMyOrg } from "@/services/api/apiService"

export const { runWithAmplifyServerContext } = createServerRunner({
  config: {
    Auth: authConfig,
  },
})

export async function authenticatedUser(context: NextServer.Context) {
  return await runWithAmplifyServerContext({
    nextServerContext: context,
    operation: async (contextSpec) => {
      try {
        const session = await fetchAuthSession(contextSpec)
        if (!session.tokens) return

        const user = await getCurrentUser(contextSpec)
        const orgData = await fetchMyOrg(session.tokens.accessToken.toString())

        if (orgData?.data?.content?.length > 0) {
          const teamId = orgData.data.content[0].teamId

          if (teamId) {
            const updatedUser = { teamId, ...user }
            return updatedUser
          }
        }
      } catch (error) {
        console.error("Error in authenticatedUser:", error)
        throw new Error("Authentication failed")
      }
    },
  })
}
