'use client'

// components
import Image from "next/image"
import Link from "next/link"
import Button from "@/components/Button"
import UserPostsDisplay from "@/components/UserPostsDisplay"

// avatars
import { avatars } from "@/avatars"

//redux
import { useAppSelector } from '@/redux/store'

//react
import { useEffect, useState } from "react"

// api
import axios from "axios"
import { api } from "@/api"


export default function UserInfo() {

    const user = useAppSelector((state) => state.authReducer.value.user)
    const isLogged = useAppSelector((state) => state.authReducer.value.auth)

    const [followers, setFollowers] = useState<number>(0)
    const [following, setFollowing] = useState<number>(0)
    const [posts, setPosts] = useState<number>(0)

    const userId = localStorage.getItem('userId')?.toString()

    useEffect(() => {
        (
            async () => {
                try {
                    const res1 = await axios.get(`${api}/subscriptions/get-subscribers-num/${userId}`)
                    const res2 = await axios.get(`${api}/subscriptions/get-subscriptions-to-num/${userId}`)
                    const res3 = await axios.get(`${api}/posts/get-user-posts-num/${userId}`)

                    setFollowers(res1.data.subNum)
                    setFollowing(res2.data.subNum)
                    setPosts(res3.data.postsNum)
                } catch (error) {
                    console.error(error)
            }
            }
        ) ()
    }, [])

    return (
        <>
        <div className='w-screen flex flex-col items-center'>
            
            {isLogged ? (
                <>
                <Image 
                    alt="user avatar" 
                    src={`/avatars/${avatars[user ? user?.avatar : 0]}`}
                    width={120} 
                    height={120} 
                    className='border-8 border-slate-200 rounded-full'
                />
    
                <h1 className='mt-5 mb-5 text-2xl font-bold text-slate-700'>
                    @{user?.username}
                </h1>

                <div className='w-80 mb-5 p-3 flex flex-row'>
                    <div className="w-1/3 flex flex-col items-center">
                        <p>{posts}</p>
                        <p>posts</p>
                    </div>
                    <Link 
                        className="w-1/3 flex flex-col items-center"
                        href={`${window.location.href}/subscribers`}
                    >
                        <p>{followers}</p>
                        <p>followers</p>
                    </Link>
                    <div className="w-1/3 flex flex-col items-center">
                        <p>{following}</p>
                        <p>following</p>
                    </div>
                </div>
        
                {user?.about && user?.about.trim() !== '' && ( 
                    <p className='w-80 mb-5 p-3 bg-slate-50 rounded-lg'>
                        {user.about}
                    </p>
                )}
    
                <Link href={'/user-profile/settings'}>
                    <Button width={80} content="Settings ->" disabled={false}/>
                </Link>
            </>
            ) : null}

        </div>

        <UserPostsDisplay id={userId}/>
        
        </>
  )
}
