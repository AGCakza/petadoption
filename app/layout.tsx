'use client'

import 'react-datepicker/dist/react-datepicker.css'
import './globals.sass'
import styles from './Layout.module.sass'
import { AppBar, FullPageLoader } from '@/components'
import { useAppData } from '@/hooks'
import { Session } from 'next-auth'
import { SessionProvider, useSession } from 'next-auth/react'
import { AppDataContextProvider } from '@/context/AppDataContext'
import { PetsDataContextProvider } from '@/context/PetsDataContext'
import Head from 'next/head'

export default function Root({
  children,
  session
}: {
  children: React.ReactNode,
  session: Session
}) {

  return (
    <SessionProvider refetchOnWindowFocus session={session}>
      <AppDataContextProvider>
        <PetsDataContextProvider>
          <RootLayout>
            {children}
          </RootLayout>
        </PetsDataContextProvider>
      </AppDataContextProvider>
    </SessionProvider>
  )
}

const RootLayout = ({
  children
}: {
  children: React.ReactNode
}) => {

  const { status } = useAppData()

  return (
    <html lang="en">
      <Head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#FFE5CA" />
        <meta name="apple-mobile-web-app-title" content="Petty" />
      </Head>
      <body>
        <div className={styles.root}>
          {children}
        </div>
        {status === 'authenticated' && <AppBar />}
        <FullPageLoader active={status === 'loading'} />
      </body>
    </html>
  )
}