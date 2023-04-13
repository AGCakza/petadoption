import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { userServices } from "@/db/services"
import { IUser, UserDocument } from "@/db/models/user.model"
import dbConnect from "@/db/dbConnect"
import bcrypt from 'bcrypt'
import clientPromise from "@/db/clientPromise"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username / E-mail", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(credentials?.username)
        const payload: IUser = isEmail ? { email: credentials?.username } : { username: credentials?.username }
        await dbConnect()
        const user = await userServices.getUser(payload)

        const isPasswordMatched = await bcrypt.compare(credentials?.password, user.password)
  
        if(isPasswordMatched) {
          return user
        }
        return null
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile, tokens): UserDocument {
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
        }
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
      session.user.id = token.id
      session.user.role = token.role
      
      return session
    }
  },
  debug: process.env.NODE_ENV === 'development'
}

export default NextAuth(authOptions)