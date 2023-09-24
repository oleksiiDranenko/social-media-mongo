'use client'

// components
import Button from "@/components/Button"

// cookies
import { useCookies } from "react-cookie"

// redux
import { useDispatch } from "react-redux"
import { logOut } from "@/redux/slices/auth-slice"

// next js
import { useRouter } from "next/navigation"

export default function Settings() {

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
        <div>
            <Button content='Sign Out' width={80} color='red' onClick={signOut}/>
        </div>
    )
}
