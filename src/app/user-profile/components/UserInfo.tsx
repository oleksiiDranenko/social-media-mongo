'use client'

// components
import Image from "next/image"
import Link from "next/link"
import Button from "@/components/Button"

// avatars
import { avatars } from "@/avatars"

export default function UserInfo() {

    

    return (
        <div className='w-screen flex flex-col items-center'>
            
            <Image 
                alt="user avatar" 
                src={`/avatars/${avatars[0]}`}
                width={120} 
                height={120} 
                className='border-8 border-slate-200 rounded-full'
            />

            <h1 className='mt-5 text-2xl font-bold text-slate-700'>
                oleksii
            </h1>

            <p className='w-80 p-3 mt-5 mb-5 text-slate-400 bg-slate-50 rounded-lg'>
                hello this is oleksii. it is 'about' section of my profile
            </p>

            <Link href={'/user-profile/settings'}>
                <Button width={80} content="Settings ->" disabled={false} />
            </Link>

        </div>
  )
}
