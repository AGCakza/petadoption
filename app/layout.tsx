'use client'

import './globals.sass'
import styles from './Layout.module.sass'
import { AppBar } from '@/components'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { useMemo, useState } from 'react'

export default function RootLayout({
  children,
  session
}: {
  children: React.ReactNode,
  session: Session
}) {

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body>
          <div className={styles.root}>
            {children}
          </div>
          <AppBar />
        </body>
      </html>
    </SessionProvider>
  )
}
