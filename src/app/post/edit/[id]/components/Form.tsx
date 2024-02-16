'use client'

import Button from "@/components/Button"
import Image from "next/image"
import { useEffect, useState } from "react"
import axios from "axios"
import { api } from "@/api"
import { PostInterface } from "@/interfaces/Post"
import { useRouter } from "next/navigation"

interface PropsInterface {
    id: string
}

export default function Form(props: PropsInterface) {

    const [post, setPost] = useState<PostInterface>()
    const [value, setValue] = useState<string>()

    const router = useRouter()

    useEffect(() => {
        (
            async() => {
                try {
                    const res = await axios.get(`${api}/posts/get-one/${props.id}`)
                    setPost(res.data)
                    setValue(res.data.value)
                    
                } catch (err) {
                    console.log(err)
                }
            }
        )()
    }, [])

    const handleValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value)
        
    }

    const saveChanges = async() => {
        try {
            await axios.patch(`${api}/posts/edit/${props.id}`, {value})
            router.back()
        } catch (err) {
            console.log(err)
        }
    }
    

    return (
        
        <div>
            <h1 className='w-full mb-8 text-center text-3xl text-slate-800'>
                Post edit
            </h1>

            <div className="w-[36rem] h-fit p-5 border rounded-xl mb-10">
                <div className="w-full h-min flex flex-row items-center justify-between">
                    <div
                        className="flex flex-row items-center"
                    >
                        <Image 
                            alt="profile-picture" 
                            src={`/avatars/avatar-${post?.userAvatar}.png`} 
                            width={35}
                            height={35}
                            className="mr-3"
                        />
                        <span className="font-semibold text-slate-700 text-lg">
                            {post?.username}
                        </span>
                    </div>


                </div>


                <textarea 
                    className="w-full h-52 p-3 border mt-5 mb-5 rounded-lg focus:outline-slate-300 resize-none"
                    defaultValue={value}
                    onChange={handleValue}
                />



                <div className="w-full flex justify-between">
                    <Button 
                        content="Cancel" width={"flex-half"} color="default"
                        onClick={() => router.back()}
                    />
                    <Button 
                        content="Save Changes" width={"flex-half"} color="green"
                        onClick={saveChanges}
                    />
                </div>
                

            </div>
        </div>
            
            
        
    )
}
