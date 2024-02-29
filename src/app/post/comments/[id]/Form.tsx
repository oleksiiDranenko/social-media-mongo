'use client'

// react hooks
import { useState } from "react"

// api
import axios from "axios"
import { api } from "@/api"

// redux
import { useAppSelector } from "@/redux/store"
import { useDispatch } from "react-redux"
import { updateList } from "@/redux/slices/comments-slice"
import { CommentInterface } from "@/interfaces/Comment"

interface PropsInterface {
    id: string
}

export default function Form(props: PropsInterface) {

    const user = useAppSelector((state) => state.authReducer.value.user)
    const commentsList = useAppSelector((state) => state.commentsListReducer.commentsList)

    const dispatch = useDispatch()

    const [value, setValue] = useState<string>('')

    const handleForm = async (e: React.FormEvent) => {
        e.preventDefault()

        try {

            if(value.trim() === '') {
                return
            }

            const res = await axios.post(`${api}/comments/add`, {
                username: user?.username,
                avatar: user?.avatar,
                userId: user?._id,
                postId: props.id,
                value,
            })

            
            const newComment: CommentInterface = res.data; 

            dispatch(updateList([...(commentsList || []), newComment]))
            setValue('')
        } catch (err) {
            console.log(err)
        }
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    return (
        <form 
            className="w-[36rem] mb-10 flex justify-between"
            onSubmit={handleForm}
        >
            <input 
                type="text" 
                placeholder="Comment..."
                className="w-[82%] p-3 border rounded-lg focus:outline-slate-500"
                onChange={handleInput}
                value={value}
            />

            <button
                className="w-[15%] p-3 bg-green-600 hover:bg-green-700 rounded-lg text-white"
            >
                Post
            </button>
        </form>
    )
}
