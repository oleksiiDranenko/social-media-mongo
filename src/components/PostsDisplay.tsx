'use client'

// react hooks
import { useEffect, useState } from "react"

// redux state
import { useDispatch } from "react-redux"
import { updateList } from "@/redux/slices/posts-slice"
import { useAppSelector } from "@/redux/store"

// react icons
import { BiError } from "react-icons/bi";

// components
import Post from "./Post/Post"

// axios
import axios from "axios"

// api
import { api } from "@/api"

// next
import Image from "next/image"

export default function PostsDisplay() {

    const postsList = useAppSelector((state) => state.listReducer.postsList)
    const dispatch = useDispatch()

    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)

    useEffect(() => {

        (async () => {
            try {
                const res = await axios.get(`${api}/posts/get-all`)
                dispatch(updateList(res.data.reverse()))
                setLoading(false)
            } catch (err) {
                console.log(err)
                setLoading(false)
                setError(true)
            }
        })()
        
    }, [])

    return (
        <div>
            {
                loading ? 
                <Image alt='loading' src={'/gif/loading.gif'} width={50} height={50} priority/> 
                : 
                error ? 
                <div className="flex flex-col items-center">
                    <BiError className="w-24 h-24 text-red-500"/>
                    <p className="font-bold text-2xl text-red-600 pb-5">
                        Error!
                    </p>
                    <div className="text-neutral-500">
                        <p>
                            1. Check your internet connection.
                        </p>
                        <p>
                            2. There may be a problem with my server
                        </p>
                    </div>
                </div> 
                :
                postsList?.map((post) => {
                    return (
                        <Post 
                            _id={post._id}
                            value={post.value} 
                            username={post.username} 
                            userId={post.userId}
                            userAvatar={post.userAvatar}
                            date={post.date}
                            edited={post.edited}
                            img={post.img}
                            key={post._id}
                        />
                    )
                })
            }
        </div>
    )
}
