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
      <body>
        <div style={{
          position: 'absolute',
          top: -100,
          width: '100%',
          textAlign: 'center',
          zIndex: 100
        }}>Loading...</div>
        <div className={styles.root}>
          {children}
        </div>
        {status === 'authenticated' && <AppBar />}
        <FullPageLoader active={status === 'loading'} />
      </body>
    </html>
  )
}