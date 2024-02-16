'use client'

// react
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

//emojis
import { emojis } from "./emojis"

// axios
import axios from "axios"
import { api } from "@/api"


interface ReactionInterface {
	_id: string,
	postId: string,
	userId: string,
	reactionId: number
}

interface ReactionButtonInterface {
	id: number,
	value: string,
	count: number
}

interface PropsInterface {
	userId: string,
	postId: string
}

export default function PostReactions(props: PropsInterface) {

	const [reactions, setReactions] = useState<ReactionButtonInterface[]>([
		{id: 0, value: emojis[0], count: 0},
		{id: 1, value: emojis[1], count: 0},
		{id: 2, value: emojis[2], count: 0},
		{id: 3, value: emojis[3], count: 0},
		{id: 4, value: emojis[4], count: 0}
	])

	const [selectedReaction, setSelectedReaction] = useState<number | null>(null)

	const router = useRouter()
	
	useEffect(() => {
		(async () => {
		  	try {
				const userId = localStorage.getItem('userId')
				const res = await axios.get(`${api}/reactions/get-reactions/${props.postId}`);
				const apiReactions = res.data.reactions;

 
				const updatedReactions = reactions.map((reaction, index) => {
			  		const count = apiReactions.filter((item: ReactionInterface) => item.reactionId === index).length;
			  		return { ...reaction, count };
				});

				apiReactions.forEach((reaction: ReactionInterface) => {
					if(reaction.userId === userId) { 
						setSelectedReaction(reaction.reactionId)
					}
				})

				updatedReactions.sort((a, b) => b.count - a.count);

				setReactions(updatedReactions);
		  	} catch (err) {
				console.log(err);
		  	}
		})()
	}, []);

	const postReaction = async (id: number) => {
		try {
			axios.post(`${api}/reactions/react`, {
				userId: props.userId,
				postId: props.postId,
				reactionId: id
			})
		} catch (err) {
			console.log(err)
		}
	}

	const handleButtonClick = (id: number) => {

		if(props.userId === 'not_auth') {
			router.push('/login')
		} else {
			postReaction(id)

			if(selectedReaction === id) {

				setSelectedReaction(null)

				const updatedReactions = reactions.map((el) => {
					if(el.id === id) {
						return {...el, count: el.count - 1}
					} else {
						return el
					}
				})
			
				setReactions(updatedReactions)

			} else {
				const lastReaction = selectedReaction
				setSelectedReaction(id)
				const updatedReactions = reactions.map((el) => {
					if(el.id === id) {
						return {...el, count: el.count + 1}
					} else if(el.id === lastReaction){
						return {...el, count: el.count - 1} 
					} else {
						return el
					}
				})
			
				setReactions(updatedReactions)
			}
		}
	}

    return (
        <div className="w-full h-min flex flex-row items-center mt-5">
            {reactions.map((el) => {
				return (
					<button 
						className={`border p-2 mr-2 rounded-lg flex flex-row items-center ${el.id === selectedReaction ? 'bg-slate-500 hover:bg-slate-600 text-white' : ' hover:bg-neutral-50' }`}
						onClick={() => handleButtonClick(el.id)}
						key={el.id}
					>
						<span className="text-xl">{el.value}</span> 
						<span className="w-4 text-sm ml-2">{el.count}</span>
					</button>
				)
			})}  
        </div>
    )
}
