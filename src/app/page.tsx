import Post from "@/components/Post/Post"

export default function Home() {

	return (
    	<div className='w-full h-full flex flex-col items-center box-border pt-32 pb-32'>
			<Post username="oleksii" userAvatar={2} userId="aklsfgjdhkl" date="1 sept 2023" edited={false} value="hello" key={5}/>
			<Post username="max" userAvatar={4} userId="aklsfgjdhkl" date="1 sept 2023" img="https://png.pngtree.com/thumb_back/fh260/background/20210101/pngtree-double-row-tree-path-with-yellow-deciduous-autumn-leaves-image_519106.jpg" edited value="look at this picture bro" key={5}/>
			
		</div>
  	)
}
