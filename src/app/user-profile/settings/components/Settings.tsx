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
import { logOut } from "@/redux/slices/auth-slice"
import { useAppSelector } from '@/redux/store'


// next js
import { useRouter } from "next/navigation"
import Input from "@/components/Input"



export default function Settings() {

    const user = useAppSelector((state) => state.authReducer.value.user)
    const dispatch = useDispatch()
    const [_, setCookies] = useCookies()

    const router = useRouter()

    const signOut = () => {
        dispatch(logOut())

        setCookies('access_cookies', '')
        window.localStorage.removeItem('userId')

        router.push('/')
    }

    return (
        <div className='flex flex-col items-center'>

            <Link 
                className='mb-5 w-fit  relative'
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



            <div className="w-full flex flex-col ">

                <h2 className='font-semibold text-xl text-slate-600'>
                    Username:
                </h2>
                <Link
                    className='mt-3 mb-3 w-min min-w-fit'
                    href={'/user-profile'}
                >
                    <Button content={user?.username} width='auto' color='light'/>
                </Link>  


                <h2 className='font-semibold text-xl text-slate-600'>
                        Description:
                </h2>
                <Link
                    className='mt-3 mb-6 w-min min-w-fit'
                    href={'/user-profile'}
                >
                    <Button content={user?.about} width='auto' color='light'/>
                </Link>  

            </div>



            <Button content='Sign Out' width={80} color='red' onClick={signOut}/>
            
            <Link
                className='mt-3 w-min min-w-fit'
                href={'/user-profile'}
            >
                <Button content='<- Back' width={80} />
            </Link>
        </div>
    )
}
