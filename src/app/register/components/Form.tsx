'use client'

//api
import { api } from "../../../api"

// library
import axios from "axios"
import { useCookies } from "react-cookie"

// hooks
import { useState } from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

// components
import Button from "@/components/Button"
import Input from "@/components/Input"

// redux
import { useDispatch } from "react-redux"
import { logIn } from "@/redux/slices/auth-slice"

export default function Form() {

    // values
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [passwordAgain, setPasswordAgain] = useState<string>('')

    // button state
    const [isDisabled, setIsDisabled] = useState<boolean>(true)

    // error
    const [error, setError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>()

    // cookies
    const [_, setCookies] = useCookies(['access_cookies'])

    // router
    const router = useRouter()

    //redux
    const dispatch = useDispatch()


    // on change

    const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handlePasswordAgain = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordAgain(e.target.value)
    }

    useEffect(() => {
        if (username.trim().length > 0 &&
            password.trim().length > 0 &&
            passwordAgain.trim().length > 0
        ){
            
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }

    }, [username, password, passwordAgain])


    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (username.indexOf(' ') !== -1) {
            setError(true)
            setErrorMessage('Username can not contain SPACE')
        } else if (password !== passwordAgain) {
            setError(true)
            setErrorMessage('Passwords in the input are different')
        } else if (password.length < 4) {
            setError(true)
            setErrorMessage('Password should be at least 4 characters')
        } else {

            try {
                const user = {
                    username,
                    password,
                    avatar: 0
                }

                const res = await axios.post(`${api}/user/register`, user)

                if (res.data.error) {
                    setError(true)
                    setErrorMessage(res.data.error)
                } else {
                    
                    setCookies('access_cookies', res.data.token)
                    window.localStorage.setItem('userId', res.data.userId)
                    dispatch(logIn(res.data))
                    router.push('/user-profile/settings/avatar')
                }
            } 
            catch {
                setError(true)
                setErrorMessage('Unable to register. Check your internet connection')
            }

        }
    }

    return (
        <form
            onSubmit={handleFormSubmit}
        >
            <h1 className='w-full mb-8 text-center text-3xl text-slate-800'>
                Register
            </h1>

            {error ? (
                <div className='w-80 mb-5 p-5 bg-red-400 text-white rounded-lg'>
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
                        {errorMessage}
                    </p>
                </div>
            ) : null}

            <div>
                <h2 className='mb-3 text-lg text-slate-800 font-semibold'>
                    Username
                </h2>
                <Input type="text" placeholder="Enter username..." onChange={handleUsername}/>
            </div>

            <div>
                <h2 className='mb-3 mt-5 text-lg text-slate-800 font-semibold'>
                    Password
                </h2>
                <Input type="password" placeholder="Enter password..." onChange={handlePassword}/>

                <h2 className='mb-3 mt-5 text-lg text-slate-800 font-semibold'>
                    Password again
                </h2>
                <Input type="password" placeholder="Enter password..." onChange={handlePasswordAgain}/>
            </div>

            <div className='mt-8'>
                <Button width={80} content="Create account" disabled={isDisabled}/>
            </div>
            
        </form>
    )
}
