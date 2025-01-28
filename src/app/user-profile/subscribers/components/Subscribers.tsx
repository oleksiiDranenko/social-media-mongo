'use client'


// api
import axios from "axios"
import { api } from "@/api"


// hooks
import { useState, useEffect } from "react"

// interface
import { UserInterface } from "@/interfaces/User"

// components
import SubscriptionItem from "./SubscriptionItem"

export default function Subscribers() {

    const [subList, setSubLIst] = useState<UserInterface[]>([])

    const userId = localStorage.getItem('userId')?.toString()

    useEffect(() => {
        (async () => {

            try {
                const res = await axios.get(`${api}/subscriptions/get-subscribers/${userId}`)
                setSubLIst(res.data)
            } catch (error) {
                console.log(error)
            }

        })()
    },[])

    return (
        <div className='w-screen flex flex-col items-center'>
            
            <h1 className="text-3xl text-slate-800 mb-10">
                Followers
            </h1>

            <div className='w-screen flex flex-col items-center'>

                {subList.length > 0 
                ? 
                subList.map((el) => {
                    return (
                        <SubscriptionItem 
                            mainUserId={userId} 
                            itemUserId={el._id}
                            itemUsername={el.username}
                            itemAvatar={el.avatar}
                            defaultSubscribed={false}
                            key={el._id}
                        />
                    )
                })
                : 
                <p className="text-slate-500">
                    You dont have any followers yet!
                </p>
                }

            </div>
        </div>
    )
}
