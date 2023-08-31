'use client'

//use only in client components

interface ButtonInterface {
    content: string,
    onClick(): void
}

export default function Button( props: ButtonInterface ) {

    return (
        <button 
            className='w-auto pl-4 pr-4 pt-2 pb-2 bg-slate-600 hover:bg-slate-700 transition-colors duration-100 ease-in-out rounded-lg'
            onClick={props.onClick}
        >
            <span className='text-white'>
                {props.content}
            </span>
        </button>
    )
}
