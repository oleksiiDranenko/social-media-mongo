'use client'

// components
import Button from "@/components/Button"
import Link from "next/link"

// axios
import axios from "axios"
import { api } from "@/api"

// react hooks
import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"

// redux
import { useAppSelector } from "@/redux/store"


interface PostInterface {
    username: string,
    userAvatar: number,
    userId: string,
    value: string,
    img?: string,
}

export default function Form() {

    const user = useAppSelector((state) => state.authReducer.value.user)

    const [urlValue, setUrlValue] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    const [value, setValue] = useState<string>('')

    const [urlValid, setUrlValid] = useState<boolean>(false)

    const router = useRouter()

    const handleForm =  (e: FormEvent) => {
        e.preventDefault()

        if(urlValue.trim() !== '') {
            const image = new Image()
            image.src = urlValue

            image.onload = () => {
                setUrlValid(true)
                setError(false)
            }

            image.onerror = () => {
                setUrlValid(false)
                setError(true)
            }
        }
    }

    const updateUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrlValue(e.target.value)
    }
    
    const removeUrl = () => {
        setUrlValue('')
        setUrlValid(false)
    }



    const handleValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value)
    }

    const makePost = async (e: FormEvent) => {
        e.preventDefault()

        try {
            if(user && value.trim() !== '') {

                var newPost: PostInterface

                if(urlValid) {
                    newPost = {
                        username: user.username,
                        userAvatar: user.avatar + 1,
                        userId: user._id,
                        value,
                        img: urlValue
                    }


                } else {
                    newPost = {
                        username: user.username,
                        userAvatar: user.avatar + 1,
                        userId: user._id,
                        value,
                    }
                }

                await axios.post(`${api}/posts/add`, newPost)

                router.push('/')
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>

             {error ? (
                <div className='w-[36rem] mb-3 p-5 bg-red-400 text-white rounded-lg'>
                    <div className='w-full mb-3 flex justify-between'>
                        <h2 className='text-lg font-semibold'>
                            Error:
                        </h2>
                        <button 
                            className='text-slate-200'
                            onClick={() => setError(false)}    
                        >
                            Close
                        </button>
                    </div>
                    <p>
                        Cannot find the image with this URL. Try another one
                    </p>
                </div>
            ) : null}


            {!urlValid ? 
                <form 
                    className="w-[36rem] flex justify-between"
                    onSubmit={handleForm}
                >
                    <input
                        className="w-[82%] p-3 border rounded-lg focus:outline-slate-500"
                        placeholder="Paste image URL..."
                        onChange={updateUrl}
                    />
                    <button
                        className="w-[15%] p-3 bg-slate-600 hover:bg-slate-700 rounded-lg text-white"
                    >
                        Check
                    </button>
                </form>
            : 
                <div className="w-[36rem] relative flex justify-start items-center border rounded-lg overflow-hidden">
                    <img 
                        src={urlValue}
                        className="h-16 w-16 object-cover"
                    />
                    <Link
                        href={urlValue}
                        target="blank"
                        className="ml-5 underline text-slate-500"
                    >
                        {urlValue.length === 2 ? urlValue : urlValue.slice(0, 40) + '...'}
                    </Link>

                    <button
                        className="absolute right-0 mr-3 p-3 bg-red-600 hover:bg-red-700 rounded-lg text-white"
                        onClick={removeUrl}
                    >
                        Delete
                    </button>
                </div>
            }
            

            <form
                onSubmit={makePost}
            >
                <textarea 
                    className="w-full h-52 p-3 border mt-7 mb-5 rounded-lg focus:outline-slate-500 resize-none"
                    defaultValue={value}
                    onChange={handleValue}
                    placeholder="Enter Post text..."
                />

                <Button content="Post" width='full' color="green"/>
            </form>

            
        </div>
    )
}
