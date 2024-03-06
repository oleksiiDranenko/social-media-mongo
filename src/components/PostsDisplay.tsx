'use client'

// react hooks
import { useEffect } from "react"

// redux state
import { useDispatch } from "react-redux"
import { updateList } from "@/redux/slices/posts-slice"
import { useAppSelector } from "@/redux/store"

// components
import Post from "./Post/Post"

// axios
import axios from "axios"

// api
import { api } from "@/api"

export default function PostsDisplay() {

    const postsList = useAppSelector((state) => state.listReducer.postsList)
    const dispatch = useDispatch()

    useEffect(() => {

        (async () => {
            try {
                const res = await axios.get(`${api}/posts/get-all`)
                dispatch(updateList(res.data.reverse()))
            } catch (err) {
                console.log(err)
            }
        })()
        
    }, [])

    return (
        <div>
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
