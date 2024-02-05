import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { signIn } from 'next-auth/react'
import {connectToMongo} from './api/mongodb/mongodb'
import styles from "./page.module.scss"

export const metadata: Metadata = {
    title: 'To do or not to do',
    description: 'Todo',
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    //let session = await getUserSession()
    //console.log("layout session:",session)
    await connectToMongo()
    return (
        <html lang="en">
            <body className={styles.body}>{children}</body>
        </html>
    )
}
