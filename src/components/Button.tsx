'use client'

//use only in client components

interface ButtonInterface {
    content: string | undefined,
    onClick?(): void,
    width: 'auto' | 80,
    disabled?: boolean,
    color?: 'default' | 'red' | 'light'
}

export default function Button( props: ButtonInterface ) {

    return (
        <button 
            className={`
                ${props.width === 'auto' ? 'w-auto' : props.width === 80 ? 'w-80' : 'w-auto'} 
                h-12 pl-4 pr-4 
                ${props.color === 'default' ? 'bg-slate-600 hover:bg-slate-700' : props.color === 'red' ? 'bg-red-500 hover:bg-red-600' : props.color === 'light' ? 'bg-slate-400 hover:bg-slate-500' : 'bg-slate-600 hover:bg-slate-700'} 
                transition-colors duration-100 ease-in-out rounded-lg disabled:bg-slate-400`
            }
            onClick={props.onClick}
            disabled={props.disabled}
        >
            <span className='text-white'>
                {props.content}
            </span>
        </button>
    )
}
