// componenst
import UserInfo from "./components/UserInfo"

export default function Profile({params}: any) {
    return (
        <div className="w-full h-full flex flex-col items-center box-border pt-36">
            <UserInfo id={params.id}/>
        </div>
    )
}
