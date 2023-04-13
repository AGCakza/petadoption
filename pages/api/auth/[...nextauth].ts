import NextAuth, { NextAuthOptions, User } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { userServices } from "@/db/services"
import { IUser, UserDocument } from "@/db/models/user.model"
import dbConnect from "@/db/dbConnect"
import bcrypt from 'bcrypt'
import clientPromise from "@/db/clientPromise"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import { USER_ROLES } from "@/helpers/constants"

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || ''
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || ''
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || ''
if(!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !NEXTAUTH_SECRET) throw new Error('FILL ENV')

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username / E-mail", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials, req) => {
        try {
          if(credentials?.username && credentials.password) {
            const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(credentials?.username)
            const payload = isEmail ? { email: credentials?.username } : { username: credentials?.username }
            await dbConnect()
            const user = await userServices.getUser(payload)

            const isPasswordMatched = await bcrypt.compare(credentials?.password, user.password)
      
            if(isPasswordMatched) {
              return user as unknown as User
            }
          }
          return null
        } catch(err) {
          return null
        }
      }
    }),
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      profile(profile, tokens) {
        return {
          id: profile.sub,
          firstName: profile.given_name,
          lastName: profile.family_name,
          name: profile.name,
          email: profile.email,
          role: 'user',
          avatar: profile.picture,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        } as User
      }
    })
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt'
  },
  pages: {
    // signIn: '/auth'
    // newUser: '/welcome'
  },
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, account, profile }) {
      if(token.email) {
        await dbConnect()
        const user = await userServices.getUser({ email: token.email })
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      if(session && session.user) {
        (session.user as User).id = token.id as string
        (session.user as User).role = token.role as USER_ROLES
      }
      
      return session
    }
  },
  debug: process.env.NODE_ENV === 'development'
}

export default NextAuth(authOptions)