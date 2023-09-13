'use client'

// components
import Image from "next/image"
import Link from "next/link"
import Button from "@/components/Button"

// avatars
import { avatars } from "@/avatars"

//redux
import { useAppSelector } from '@/redux/store'

export default function UserInfo() {

    const user = useAppSelector((state) => state.authReducer.value.user)

    return (
        <div className='w-screen flex flex-col items-center'>
            
            <Image 
                alt="user avatar" 
                src={`/avatars/${avatars[user ? user?.avatar : 0]}`}
                width={120} 
                height={120} 
                className='border-8 border-slate-200 rounded-full'
            />

            <h1 className='mt-5 mb-5 text-2xl font-bold text-slate-700'>
                {user?.username}
            </h1>

            {user?.about && user?.about.trim() !== '' && ( // Check if user.about is not an empty string
                <p className='w-80 mb-5 p-3 text-slate-400 bg-slate-50 rounded-lg'>
                    {user.about}
                </p>
            )}

            <Link href={'/user-profile/settings'}>
                <Button width={80} content="Settings ->" disabled={false} />
            </Link>

        </div>
  )
}
