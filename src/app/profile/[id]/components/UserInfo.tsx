'use client'

// react hooks
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation';

// axios
import axios from "axios"
import { api } from "@/api"

// interface
import { UserInterface } from "@/interfaces/User"

// next
import Image from "next/image"

// avatars
import { avatars } from "@/avatars"

// components
import Button from "@/components/Button"
import UserPostsDisplay from "@/components/UserPostsDisplay";

// redux
import { useAppSelector } from "@/redux/store"


interface PropsInterface {
    id: string
}

export default function UserInfo(props: PropsInterface) {
    const router = useRouter();

    const isLogged = useAppSelector((state) => state.authReducer.value.auth)

    const [user, setUser] = useState<UserInterface>()
    const [loading, setLoading] = useState<boolean>(true)

    const [followers, setFollowers] = useState<number>(0)
    const [following, setFollowing] = useState<number>(0)
    const [posts, setPosts] = useState<number>(0)

    const [subscriptionId, setSubscriptionId] = useState<string>("")
    const [subscriptionLoading, setSubscriptionLoading] = useState<boolean>(false)

    useEffect(() => {
        (async () =>{
            try {
                const res = await axios.get(`${api}/user/get/${props.id}`)
                setUser(res.data)

                const res1 = await axios.get(`${api}/subscriptions/get-subscribers-num/${props.id}`)
                const res2 = await axios.get(`${api}/subscriptions/get-subscriptions-to-num/${props.id}`)
                setFollowers(res1.data.subNum)
                setFollowing(res2.data.subNum)

                const requestBody = {
                    subscriberId: localStorage.getItem('userId') || "", 
                    subscribedToId: props.id
                };

                const res3 = await axios.get(`${api}/subscriptions/is-subscribed`, {
                    params: requestBody,
                    validateStatus: function (status) {
                        return status === 200 || status === 404;
                    }
                });

                const res4 = await axios.get(`${api}/posts/get-user-posts-num/${props.id}`)
                setPosts(res4.data.postsNum)

                if(res3.data._id){
                    setSubscriptionId(res3.data._id)
                } else {
                    setSubscriptionId("")
                }
                

            } catch (error) {
                console.log(error)
            }
            setLoading(false)
        })()
    }, [])



    const handleSubscription = async () => {
        if(isLogged) {
            try {

                setSubscriptionLoading(true)
                if(subscriptionId !== "") {
                    await axios.delete(`${api}/subscriptions/unsubscribe/${subscriptionId}`)
                    setSubscriptionId("")
                    setFollowers(followers - 1)
                } else {
                    const subscriberId = localStorage.getItem('userId') || "";
                    const res = await axios.post(`${api}/subscriptions/subscribe?subscriberId=${subscriberId}&subscribedToId=${props.id}`)
                    setSubscriptionId(res.data._id)
                    setFollowers(followers + 1)
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
        <>
        <div className='w-screen flex flex-col items-center pb-3'>
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
                    @{user?.username}
                </h1>

                <div className='w-80 mb-5 p-3 flex flex-row'>
                    <div className="w-1/3 flex flex-col items-center">
                        <p>{posts}</p>
                        <p>posts</p>
                    </div>
                    <div className="w-1/3 flex flex-col items-center">
                        <p>{followers}</p>
                        <p>followers</p>
                    </div>
                    <div className="w-1/3 flex flex-col items-center">
                        <p>{following}</p>
                        <p>following</p>
                    </div>
                </div>
        
                {user?.about && user?.about.trim() !== '' && ( 
                    <p className='w-80 mb-5 p-3  bg-slate-50 rounded-lg'>
                        {user.about}
                    </p>
                )}

                { subscriptionLoading ? 
                    <Image alt='loading' src={'/gif/loading.gif'} width={50} height={50} priority/> 
                    :
                    subscriptionId !== "" 
                    ? 
                    <Button onClick={handleSubscription} width={80} color="default" content="Unubscribe" disabled={false}/>
                    :
                    <Button onClick={handleSubscription} width={80} color="green" content="Subscribe" disabled={false}/>
                }
                
            </>
            : 
            <Image alt='loading' src={'/gif/loading.gif'} width={50} height={50} priority/> 
            }
        </div>

        {!loading ? 
            <UserPostsDisplay id={props.id}/>
            : null
        }

        </>
    )
}
