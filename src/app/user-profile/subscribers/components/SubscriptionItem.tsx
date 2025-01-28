'use client'

// components
import Button from "@/components/Button"

// next js
import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/navigation';

// hooks
import { useState, useEffect } from "react"

// api
import axios from "axios"
import { api } from "@/api"

// redux
import { useAppSelector } from "@/redux/store"


interface SubscriptionInterface {
    mainUserId: string | undefined,
    itemUserId: string,
    itemAvatar: number,
    itemUsername: string,
    defaultSubscribed: boolean
}


export default function SubscriptionItem(props: SubscriptionInterface) {

    const router = useRouter();
    
    const isLogged = useAppSelector((state) => state.authReducer.value.auth)

    const [subscriptionId, setSubscriptionId] = useState<string>('')
    const [subscriptionLoading, setSubscriptionLoading] = useState<boolean>(false)

    if (!props.defaultSubscribed) {
        
        useEffect(() => {
            (async () => {

                const requestBody = {
                    subscriberId: props.mainUserId,
                    subscribedToId: props.itemUserId
                }
                
                try {
                    const res = await axios.get(`${api}/subscriptions/is-subscribed`, {
                        params: requestBody,
                        validateStatus: function (status) {
                            return status === 200 || status === 404;
                        }
                    }) 
                    
                    if(res.status === 200) {
                        setSubscriptionId(res.data._id)
                    } 
                    else if(res.status === 404) {
                        setSubscriptionId('')
                    }

                } catch (error) {
                    console.log(error)
                }

            })()
        })

    } 


    const handleSubscription = async () => {
        if(isLogged) {
            try {

                setSubscriptionLoading(true)
                if(subscriptionId !== '') {
                    await axios.delete(`${api}/subscriptions/unsubscribe/${subscriptionId}`)
                    setSubscriptionId('')
                } else {
                    const subscriberId = localStorage.getItem('userId') || '';
                    const res = await axios.post(`${api}/subscriptions/subscribe?subscriberId=${subscriberId}&subscribedToId=${props.itemUserId}`)
                    setSubscriptionId(res.data._id)
                }

                setSubscriptionLoading(false)

            } catch (error) {
                console.log(error)
            }

        } else {
            router.push('/login')
        }
    }

    

    return (
        <div className="w-[36rem] p-5 border rounded-xl mb-10 flex flex-row items-center justify-between">
            <Link 
                href={'/'}
                className="flex flex-row items-center"
            >
                <Image 
                    alt="profile-picture" 
                    src={`/avatars/avatar-${props.itemAvatar}.png`} 
                    width={35}
                    height={35}
                    className="mr-3"
                />
                <span className="font-semibold text-slate-700 text-lg">
                    {props.itemUsername}
                </span>
            </Link>
            
            { subscriptionLoading ? 
                <Image alt='loading' src={'/gif/loading.gif'} width={50} height={50} priority/> 
                :
                subscriptionId !== "" 
                ? 
                <Button onClick={handleSubscription} width='auto' color="default" content="Unubscribe"/>
                :
                <Button onClick={handleSubscription} width='auto' color="green" content="Subscribe"/>
            }

        </div>
    )
}
