'use client'

// hooks
import { useState } from "react"

// avatars
import { avatars } from "@/avatars"

// next components
import Image from "next/image"
import Button from "@/components/Button"


export default function Form() {

    const [avatarId, setAvatarId] = useState<number>(0)

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
                            className={avatars.indexOf(avatar) === avatarId ? 'border-b-8  p-1 border-y-slate-400 rounded-full' : ''}
                            onClick={() => setAvatarId(avatars.indexOf(avatar))}
                        >
                            <Image
                                alt="avatar" 
                                src={`/avatars/${avatar}`} 
                                width={50} 
                                height={50}
                                className='hover:opacity-80 transition-opacity duration-100 ease-in-out'
                                draggable={false}
                            />
                        </button>
                    </div>
                )
            })}
        </div>
        <Button content="Save Avatar" width='auto'/>
       </>
    )
}
