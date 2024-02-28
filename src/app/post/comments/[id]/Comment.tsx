import Link from "next/link";
import Image from "next/image";
import { CommentInterface } from "@/interfaces/Comment";

export default function Comment(props: CommentInterface) {

    return (
        <div className="w-[36rem] h-fit p-5 border rounded-xl mb-10">
            <div className="w-full h-min flex flex-row items-center justify-between">
                <Link 
                    href={``}
                    className="flex flex-row items-center"
                >
                    <Image 
                        alt="profile-picture" 
                        src={`/avatars/avatar-${props.avatar}.png`} 
                        width={35}
                        height={35}
                        className="mr-3"
                    />
                    <span className="font-semibold text-slate-700 text-lg">
                        {props.username}
                    </span>
                </Link>
            </div>

            <div className="w-full mt-5 p-3 bg-slate-50 rounded-lg">
                <p>
                    {props.value}
                </p>
            </div>
        </div>
    )
}
