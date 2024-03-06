'use client'

import { useEffect, useState } from "react"
import { PostInterface } from "@/interfaces/Post"
import axios from "axios"
import { api } from "@/api"
import Post from "./Post/Post"
import { useAppSelector } from "@/redux/store"

interface PropsInterface {
    id?: string
}

export default function UserPostsDisplay(props: PropsInterface) {

    const [postsList, setPostsList] = useState<PostInterface[]>([])
    const user = useAppSelector((state) => state.authReducer.value.user)

    useEffect(() => {
        (async () => {
            const res = await axios.get(`${api}/posts/get-user-posts/${props.id ? props.id : user?._id}`)
            setPostsList(res.data)
        })()
    }, [])

    return (
        <div className="mt-7">
            {
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
