'use client'

// library
import axios from "axios"

// api
import { api } from "@/api"

// hooks
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

// avatars
import { avatars } from "@/avatars"

// components
import Image from "next/image"
import Button from "@/components/Button"


export default function Form() {

    const router = useRouter()

    const [avatarId, setAvatarId] = useState<number | null>(null)


    const updateAvatarId = async () => {
        const userId = localStorage.getItem('userId')

        const res = await axios.get(`${api}/user/get/${userId}`)

        setAvatarId(res.data.avatar)
    }

    useEffect(() => {
        updateAvatarId()
    }, [])

    
    const handleAvatar = async () => {
        try {
            const userId = localStorage.getItem('userId')

            await axios.patch(`${api}/user/change-avatar/${userId}`, {avatar: avatarId})

            router.push('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
       <>
        <div className='w-96 mt-10 mb-8 flex flex-row flex-wrap justify-center'>
            {avatars.map((avatar: string) => {
                return (
                    <div
                        className='w-28 h-24 flex items-center justify-center'
                        key={avatar}
                    >
                        <button
                            className={avatars.indexOf(avatar) === avatarId ? 'border-b-8  p-2 bg-slate-300 border-y-slate-600 rounded-full' : 'bg-slate-200 rounded-full p-2'}
                            onClick={() => setAvatarId(avatars.indexOf(avatar))}
                        >
                            <Image
                                alt="avatar" 
                                src={`/avatars/${avatar}`} 
                                width={55} 
                                height={55}
                                className='hover:opacity-80 transition-opacity duration-100 ease-in-out'
                                draggable={false}
                            />
                        </button>
                    </div>
                )
            })}
        </div>
        <Button content="Save Avatar" width='auto' onClick={handleAvatar} disabled={avatarId === null ? true : false}/>
       </>
    )
}
