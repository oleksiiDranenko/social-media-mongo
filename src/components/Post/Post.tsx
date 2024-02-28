// interface 
import { PostInterface } from "@/interfaces/Post"

// icons
import { FaEdit } from "react-icons/fa";

// next js
import Image from "next/image"
import Link from "next/link"

// redux
import PostReactions from "./PostReactions";
import { useAppSelector } from "@/redux/store";



export default function Post(props: PostInterface) {

    const auth = useAppSelector((state) => state.authReducer.value)


    return (
        <div className="w-[36rem] h-fit p-5 border rounded-xl mb-10">
            <div className="w-full h-min flex flex-row items-center justify-between">
                <Link 
                    href={`/posts/${props.userId}`}
                    className="flex flex-row items-center"
                >
                    <Image 
                        alt="profile-picture" 
                        src={`/avatars/avatar-${props.userAvatar}.png`} 
                        width={35}
                        height={35}
                        className="mr-3"
                    />
                    <span className="font-semibold text-slate-700 text-lg">
                        {props.username}
                    </span>
                </Link>

                {props.userId === auth.user?._id ? (
                    <Link href={`/post/edit/${props._id}`} className="text-xl text-slate-700 p-2">
                        <FaEdit />
                    </Link>
                ) : null}
                
            </div>

            {props.img ? (
                <div className="w-full max-h-[40rem] bg-slate-200 flex items-center justify-center mt-5 rounded-lg overflow-hidden">
                    <img 
                        src={props.img}
                        className="max-h-[40rem] object-cover opacity-100"
                        draggable={false}
                    />
                </div>
            ) : null} 


            <div className="w-full mt-5 p-3 bg-slate-50 rounded-lg">
                <p>
                    {props.value}
                </p>
            </div>

            {auth.user?._id ? 
                <PostReactions postId={props._id} userId={auth.user?._id}/>
                :
                <PostReactions postId={props._id} userId='not_auth'/>
            }

            <div className="w-full h-min flex flex-row items-center mt-5">
                <Link
                    className="w-full rounded-lg p-3 text-white bg-slate-500 hover:bg-slate-600  duration-200"
                    href={`/post/comments/${props._id}`}
                >
                    {"15 Comments ->"}
                </Link>
            </div>

            <div className="w-full h-min flex flex-row justify-between mt-5">
                <span className="p-3 bg-slate-50 rounded-lg text-sm">
                    {props.date}
                </span>

                {props.edited ? (
                    <span className="p-3 ml-3 bg-slate-50 rounded-lg text-sm">
                        Edited !
                    </span>
                ) : null
                }
            </div>

        </div>
    )
}
