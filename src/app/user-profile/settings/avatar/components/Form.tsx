'use client'

// library
import axios from "axios"

// api
import { api } from "@/api"

// hooks
import { useState } from "react"
import { useRouter } from "next/navigation"

// avatars
import { avatars } from "@/avatars"

// components
import Image from "next/image"
import Button from "@/components/Button"

// redux
import { useAppSelector } from "@/redux/store"
import { useDispatch } from "react-redux"
import { updateAvatar } from "@/redux/slices/auth-slice"


export default function Form() {

    const user = useAppSelector((state) => state.authReducer.value.user)
    const dispatch = useDispatch()

    const router = useRouter()

    const [avatarId, setAvatarId] = useState<number | undefined>(user?.avatar)

    
    const handleAvatar = async () => {
        try {
            if(user && avatarId){
                await axios.patch(`${api}/user/change-avatar/${user?._id}`, {avatar: avatarId})

                dispatch(updateAvatar(avatarId))
                router.push('/user-profile/')
            }
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
