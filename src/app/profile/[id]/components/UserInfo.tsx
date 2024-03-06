'use client'

import { useEffect, useState } from "react"
import axios from "axios"
import { UserInterface } from "@/interfaces/User"
import { api } from "@/api"
import Image from "next/image"
import { avatars } from "@/avatars"

interface PropsInterface {
    id: string
}

export default function UserInfo(props: PropsInterface) {

    const [user, setUser] = useState<UserInterface>()
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        (async () =>{
            const res = await axios.get(`${api}/user/get/${props.id}`)
            setUser(res.data)
            setLoading(false)
        })()
    }, [])

    return (
        <div className='w-screen flex flex-col items-center'>
            {!loading ?
            <>
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
        
                {user?.about && user?.about.trim() !== '' && ( 
                    <p className='w-80 mb-5 p-3 text-slate-400 bg-slate-50 rounded-lg'>
                        {user.about}
                    </p>
                )}
            </>
            : null}
        </div>
    )
}
