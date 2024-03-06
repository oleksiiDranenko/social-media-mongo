// components
import UserInfo from "./components/UserInfo"
import UserPostsDisplay from "@/components/UserPostsDisplay"

export default function UserProfile() {

    return (
        <div className='w-full h-full flex flex-col items-center box-border pt-36'>
            <UserInfo/>
            <UserPostsDisplay/>
        </div>
    )
}
