// components
import CommentsDisplay from "./CommentsDisplay"
import Form from "./Form"

export default function Comments({params} : any) {
    return (
        <div className='w-screen h-screen flex flex-col items-center box-border pt-36'>
            
            <Form id={params.id}/>
            
            <CommentsDisplay id={params.id}/>
        </div>
    )
}
