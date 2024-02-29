// components
import CommentsDisplay from "./CommentsDisplay"
import Form from "./Form"
import Button from "@/components/Button"
import Link from "next/link"

export default function Comments({params} : any) {
    return (
        <div className='w-screen h-screen flex flex-col items-center box-border pt-36'>
            <Link 
                className="w-[36rem] mb-10"
                href='/'
            >
                <Button content="<- Back to the Post" width={"full"} color="default"/>
            </Link>
            
            <Form id={params.id}/>
            
            <CommentsDisplay id={params.id}/>
        </div>
    )
}
