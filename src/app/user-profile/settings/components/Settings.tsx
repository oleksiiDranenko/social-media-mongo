'use client'

// components
import Button from "@/components/Button"
import Link from "next/link"
import Image from "next/image"

// cookies
import { useCookies } from "react-cookie"

// avatars
import { avatars } from "@/avatars"

// redux
import { useDispatch } from "react-redux"
import { logOut, updateAbout } from "@/redux/slices/auth-slice"
import { useAppSelector } from '@/redux/store'

// next js
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

// axios
import axios from "axios"

//api
import { api } from "@/api"



export default function Settings() {

    const user = useAppSelector((state) => state.authReducer.value.user)
    const dispatch = useDispatch()
    const [_, setCookies] = useCookies()

    const [about, setAbout] = useState<string>('')

    const router = useRouter()

    useEffect(() => {
        if(user?.about) {
            setAbout(user.about)
        } 
    }, [user])

    const signOut = () => {
        dispatch(logOut())

        setCookies('access_cookies', '')
        window.localStorage.removeItem('userId')

        router.push('/')
    }

    const handleAbout = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setAbout(e.target.value)
    }

    const saveChanges = async () => {
        try {
            
            const res = await axios.patch(`${api}/user/edit-about/${user?._id}`, {about})

            if(!res.data.error) {
                dispatch(updateAbout(about))
            }

            router.push('/user-profile')
            
        } 
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex flex-col items-center'>

            <Link 
                className='w-fit  relative'
                href={'/user-profile/settings/avatar'}
            >
                <Image 
                    alt="user avatar" 
                    src={`/avatars/${avatars[user ? user?.avatar : 0]}`}
                    width={120} 
                    height={120} 
                    className='border-8 border-slate-200 rounded-full'
                />
                <p className='absolute top-0 -right-4 text-2xl'>
                    &#x270E;
                </p>
            </Link>

            <h1 className='mt-5 mb-5 text-2xl font-bold text-slate-700'>
                {user?.username}
            </h1>

            <textarea 
                className="w-full p-3 bg-neutral-100 mb-5 rounded-lg focus:outline-slate-500"
                placeholder="Update 'about' section..."
                defaultValue={about}
                onChange={handleAbout}
            />
     

            <div className="w-full flex justify-between">
                <Button content='Save Changes' width='flex-half' color='green' onClick={saveChanges}/>

                <Button content='Sign Out' width='flex-half' color='red' onClick={signOut}/>
            </div>

            
            
            <Link
                className='mt-5 w-min min-w-fit'
                href={'/user-profile'}
            >
                <Button content='<- Back' width={80} />
            </Link>

            
        </div>
    )
}
