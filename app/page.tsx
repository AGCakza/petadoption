'use client'

import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.sass'
import { signOut, useSession, signIn } from 'next-auth/react'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data: session } = useSession()

  return (
    <div>
      {session?.user ? <button onClick={() => signOut()}>Log Out</button> : <button onClick={() => signIn()}>Sign In</button>}
    </div>
  )
}
