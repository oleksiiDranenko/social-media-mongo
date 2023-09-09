'use client'

// cookies
import { useCookies } from 'react-cookie'

// hooks
import { useState } from 'react'
import { useEffect } from 'react'

// next components
import Link from 'next/link'
import Image from 'next/image'

// react icons
import { AiOutlineHome } from 'react-icons/ai'
import{ RiAddCircleLine } from 'react-icons/ri'

// avatars list
import { avatars } from '@/avatars'

// api
import axios from 'axios'
import { api } from '@/api'


interface UserInterface {
    _id: string,
    username: string,
    password: string,
    avatar: number,
    about: string
}

export default function Navbar() {

    // logged state
    const [cookies, _] = useCookies(['access_cookies'])
    const [isLogged, setIsLogged] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)

    const [user, setUser] = useState<UserInterface>()


    const getUser = async () => {
        const userId = window.localStorage.getItem('userId')

        const res = await axios.get(`${api}/user/get/${userId}`)

        if(!res.data.error) {
            setUser(res.data)
        }
    }


    useEffect(() => {
        if (cookies.access_cookies) {
            getUser()
            setIsLogged(true)
            setLoading(false)
        } else {
            setIsLogged(false)
            setLoading(false)
        }
    }, [])

    return (
        <div className='w-screen text-base h-20 border-b fixed flex items-center justify-evenly'>

            <div className='w-32 flex justify-center'>
                <Link 
                    className='border pr-3 pl-3 pt-2 pb-2 rounded-lg flex items-center justify-center hover:bg-neutral-50 transition-colors duration-100 ease-in-out'
                    href={'/'}
                >
                    <AiOutlineHome className='w-6 h-6 mr-3'/>
                    <p>
                        Home
                    </p>
                </Link>
            </div>

            <div className='w-32 flex justify-center'>
                <Link 
                    className='border pr-3 pl-3 pt-2 pb-2 rounded-lg flex items-center justify-center hover:bg-neutral-50 transition-colors duration-100 ease-in-out'
                    href={'/'}
                >
                    <RiAddCircleLine className='w-6 h-6 mr-3'/>
                    <p>
                        Add 
                    </p>
                </Link>
            </div>

            <div className='w-32 flex justify-center'>
                
                {loading ? (
                    <Image alt='loading' src={'/gif/loading.gif'} width={50} height={50} />
                ) 
                
                : !isLogged ? (
                    <Link
                        className='pr-3 pl-3 pt-2 pb-2 text-white bg-green-600 hover:bg-green-700 transition-colors duration-100 ease-in-out rounded-lg'
                        href={'/login'}
                    >
                        Log In
                    </Link>
                ) 
                
                : (
                    <Link
                        className='border pr-4 pl-4 pt-2 pb-2 rounded-lg flex items-center justify-center  bg-slate-600 hover:bg-slate-700 text-white transition-colors duration-100 ease-in-out'
                        href={'/login'}
                    >
                        <Image alt='avatar' src={`/avatars/${avatars[user === undefined ? 0 : user.avatar]}`} width={30} height={30} className='mr-3'/>
                        {
                            !user ? '' : user?.username.length <= 7 ? user.username : (user.username.slice(0, 7) + '...')
                        }
                    </Link>
                )}
            </div>

        </div>
    )
}
