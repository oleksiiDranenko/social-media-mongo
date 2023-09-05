'use client'

// components
import Button from "@/components/Button"
import Input from "@/components/Input"

export default function Form() {

    return (
        <form>
            <h1 className='w-full mb-8 text-center text-3xl text-slate-800'>
                Register
            </h1>

            <div className='w-80 mb-5 p-5 bg-red-400 text-white rounded-lg'>
                <h2 className='text-lg font-semibold'>
                    Error:
                </h2>
                <p>
                    Passeord should contain at least 5 char
                </p>
            </div>

            <div>
                <h2 className='mb-3 text-lg text-slate-800 font-semibold'>
                    Username
                </h2>
                <Input type="text" placeholder="Enter username..." onChange={() => console.log('hey')}/>
            </div>

            <div>
                <h2 className='mb-3 mt-5 text-lg text-slate-800 font-semibold'>
                    Password
                </h2>
                <Input type="password" placeholder="Enter password..." onChange={() => console.log('hey')}/>

                <h2 className='mb-3 mt-5 text-lg text-slate-800 font-semibold'>
                    Password again
                </h2>
                <Input type="password" placeholder="Enter password..." onChange={() => console.log('hey')}/>
            </div>

            <div className='mt-8'>
                <Button width={80} content="Create account" onClick={() => console.log()} disabled={false}/>
            </div>
            
        </form>
    )
}
