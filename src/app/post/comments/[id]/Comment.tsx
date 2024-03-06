// next
import Link from "next/link";
import Image from "next/image";

// interface
import { CommentInterface } from "@/interfaces/Comment";

// redux
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { updateList } from "@/redux/slices/comments-slice";

// api
import axios from "axios";
import { api } from "@/api";

export default function Comment(props: CommentInterface) {

    const user = useAppSelector((state) => state.authReducer.value.user)
    const commentsList = useAppSelector((state) => state.commentsListReducer.commentsList)

    const dispatch = useDispatch()

    const deleteComment = async () => {
        try {
            await axios.delete(`${api}/comments/delete/${props._id}`)

            const updatedList = commentsList?.filter((el) => el._id !== props._id) as CommentInterface[]

            dispatch(updateList(updatedList))
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="sm:w-[36rem] w-96 h-fit p-5 border rounded-xl mb-7">
            <div className="w-full h-min flex flex-row items-center justify-between">
                <Link 
                    href={props.userId === user?._id ? '/user-profile' : `/profile/${props.userId}`}
                    className="flex flex-row items-center"
                >
                    <Image 
                        alt="profile-picture" 
                        src={`/avatars/avatar-${props.avatar + 1}.png`} 
                        width={35}
                        height={35}
                        className="mr-3"
                    />
                    <span className="font-semibold text-slate-700 text-lg">
                        {props.username}
                    </span>
                </Link>

                {props.userId === user?._id ? (
                    <button
                        className="text-red-600 p-2"
                        onClick={deleteComment}
                    >
                        Delete
                    </button>
                ) : null}
            </div>

            <div className="w-full mt-5 p-3 bg-slate-50 rounded-lg">
                <p>
                    {props.value}
                </p>
            </div>

            <div className="w-full h-min flex flex-row justify-between mt-5">
                <span className="p-3 bg-slate-50 rounded-lg text-sm">
                    {props.date}
                </span>
            </div>
        </div>
    )
}
