import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Navbar from '@/components/Navbar'

import ReduxProvider from '@/redux/Provider'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  	title: 'Social Media',
  	description: 'Created with Next.js',
}


export default function RootLayout({
  	children,
}: {
  	children: React.ReactNode
}) {

  	return (
   		<html lang="en">
      		<body className={inter.className}>
			  	<ReduxProvider>
				  	<Navbar/>
					{children}
				</ReduxProvider>
			</body>
    	</html>
  )

}