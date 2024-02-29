'use client'

import Comment from "./Comment"

// react hooks
import { useEffect } from "react"
import { useState } from "react"

// api
import axios from "axios"
import { api } from "@/api"

// redux
import { useAppSelector } from "@/redux/store"
import { useDispatch } from "react-redux"
import { updateList } from "@/redux/slices/comments-slice"

interface PropsInterface {
    id: string
}

export default function CommentsDisplay(props: PropsInterface) {

    const [loading, setLoading] = useState<boolean>(true)

    const commentsList = useAppSelector((state) => state.commentsListReducer.commentsList)

    const dispatch = useDispatch()

    useEffect(() => {
        (
            async () => {
                try {
                    const res = await axios.get(`${api}/comments/get-comments/${props.id}`)
                    
                    dispatch(updateList(res.data))
                    setLoading(false)
                } catch (err) {
                    console.log(err)
                }
            }
        ) ()
    }, [])

    return (
        <div>
            {loading ? null : commentsList?.map((el) => (
                <Comment 
                    _id={el._id}
                    username={el.username}
                    userId={el.userId}
                    avatar={el.avatar}
                    date={el.date}
                    postId={el.postId}
                    value={el.value}
                    key={el._id}
                />
            ))}
        </div>
    )
}
