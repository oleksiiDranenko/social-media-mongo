import Post from "@/components/Post/Post"
import PostsDisplay from "@/components/PostsDisplay"

export default function Home() {

	return (
    	<div className='w-full h-full flex flex-col items-center box-border pt-32'>
			
			<PostsDisplay/>
			
		</div>
  	)
}
