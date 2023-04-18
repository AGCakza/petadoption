'use client'

import 'react-datepicker/dist/react-datepicker.css'
import './globals.sass'
import styles from './Layout.module.sass'
import { AppBar, FullPageLoader } from '@/components'
import { useAppData } from '@/hooks'
import { Session } from 'next-auth'
import { SessionProvider, useSession } from 'next-auth/react'
import { Dispatch, SetStateAction, createContext, useState } from 'react'
import { IAppData, IPetsData } from '@/helpers/types'

export const AppDataContext = createContext({appData: {}, setAppData: () => {}} as { appData: IAppData, setAppData: Dispatch<SetStateAction<IAppData>> })
export const PetsDataContext = createContext({petsData: {}, setPetsData: () => {}} as { petsData: IPetsData, setPetsData: Dispatch<SetStateAction<IPetsData>> })

export default function Root({
  children,
  session
}: {
  children: React.ReactNode,
  session: Session
}) {
  const [appData, setAppData] = useState({
    user: null
  } as IAppData)
  const [petsData, setPetsData] = useState({
    pets: [],
    pet: null
  } as IPetsData)

  return (
    <SessionProvider refetchOnWindowFocus session={session}>
      <AppDataContext.Provider value={{appData, setAppData}}>
        <PetsDataContext.Provider value={{petsData, setPetsData}}>
          <RootLayout>
            {children}
          </RootLayout>
        </PetsDataContext.Provider>
      </AppDataContext.Provider>
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
        <div className={styles.root}>
          {children}
        </div>
        {status === 'authenticated' && <AppBar />}
        <FullPageLoader active={status === 'loading'} />
      </body>
    </html>
  )
}