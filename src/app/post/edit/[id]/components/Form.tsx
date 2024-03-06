'use client'

// components
import Button from "@/components/Button"

// next
import Image from "next/image"
import { useRouter } from "next/navigation"

// react hooks
import { useEffect, useState } from "react"

// api
import axios from "axios"
import { api } from "@/api"

// interface
import { PostInterface } from "@/interfaces/Post"


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

    const deletePost = async () => {
        try {
            await axios.delete(`${api}/posts/delete/${props.id}`)
            router.back()
        } catch (err) {
            console.log(err)
        }
    }
    

    return (
        
        <div>
            

            <div className="sm:w-[36rem] w-screen h-fit p-5 border rounded-xl mb-10">
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
                    className="w-full h-52 p-3 border mt-5 mb-5 rounded-lg focus:outline-slate-500 resize-none"
                    defaultValue={value}
                    onChange={handleValue}
                />



                <div className="w-full flex justify-between mb-5">
                    <Button 
                        content="Cancel" width={"flex-half"} color="default"
                        onClick={() => router.back()}
                    />
                    <Button 
                        content="Delete" width={"flex-half"} color="red"
                        onClick={deletePost}
                    />
                </div>

                <Button 
                    content="Save Changes" width={"full"} color="green" 
                    onClick={saveChanges}
                />
                
                

            </div>
        </div>
            
            
        
    )
}
