'use client'

interface InputInterface {
    onChange(e: React.ChangeEvent<HTMLInputElement>): void,
    type: 'text' | 'password',
    placeholder: string
}

export default function Input( props: InputInterface ) {
    return (
        <input 
            type={props.type}
            className='w-80 h-12 pl-5 pr-5 box-border border border-slate-700 focus:outline-slate-500 rounded-lg'
            placeholder={props.placeholder}
            onChange={props.onChange}
        />
    )
}