import { USER_ROLES } from "@/helpers/constants"
import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface User {
        /** The user's id */
        id: string,
        /** The user's role */
        role: USER_ROLES
    }

    interface Session {
        user: User
    }
}