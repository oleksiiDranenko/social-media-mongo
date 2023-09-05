'use client'

// hooks
import { useState } from "react"
import { useEffect } from "react"

// components
import Button from "@/components/Button"
import Input from "@/components/Input"

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

        setError(false)

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
