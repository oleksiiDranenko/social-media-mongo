import Form from "./components/Form"

export default function PostEdit({params} : any) {

    return (
        <div className='w-screen h-screen flex justify-center box-border pt-36'>
            <Form id={params.id}/>
        </div>
    )
}
