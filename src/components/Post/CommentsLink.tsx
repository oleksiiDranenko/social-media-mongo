'use client'

// next
import Link from 'next/link'

// react hooks
import { useEffect, useState } from 'react'

// api
import axios from 'axios'
import { api } from '@/api'


interface PropsInterface {
    _id: string
}

export default function CommentsLink(props: PropsInterface) {

    const [count, setCount] = useState<number>(0)

    useEffect(() => {
        (
            async () => {
                const res = await axios.get(`${api}/comments/get-comments-count/${props._id}`)
                setCount(res.data)
            }
        )()
    })

    return (
        <div className="w-full h-min flex flex-row items-center mt-5">
        <Link
            className="w-full rounded-lg p-3 text-white bg-slate-500 hover:bg-slate-600  duration-200"
            href={`/post/comments/${props._id}`}
        >
            {`${count} Comments ->`}
        </Link>
    </div>
    )
}
