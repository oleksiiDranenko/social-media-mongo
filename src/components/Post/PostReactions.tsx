'use client'

// react
import { useEffect, useState } from "react"

//emojis
import { emojis } from "./emojis"

import axios from "axios"
import { api } from "@/api"

interface ReactionInterface {
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

	
	useEffect(() => {
		(
			async () => {		
				try{
					const res = await axios.get(`${api}/reactions/get-reactions/${props.postId}`)
					
					res.data.reactions.forEach((react: ReactionInterface) => {
						switch(react.reactionId) {
							case 0:
								const updatedReactions = [...reactions];
								updatedReactions[0].count++;
								setReactions(updatedReactions)
								break;

								case 1:
									const updatedReactions1 = [...reactions];
									updatedReactions1[1].count++;
									setReactions(updatedReactions1);
									break;
						
								case 2:
									const updatedReactions2 = [...reactions];
									updatedReactions2[2].count++;
									setReactions(updatedReactions2);
									break;
						
								case 3:
									const updatedReactions3 = [...reactions];
									updatedReactions3[3].count++;
									setReactions(updatedReactions3);
									break;
						
								case 4:
									const updatedReactions4 = [...reactions];
									updatedReactions4[4].count++;
									setReactions(updatedReactions4);
									break;
						
								default:
									break;
						}
					})
					setReactions([...reactions].sort((a, b) => b.count - a.count));
					
				}
				catch(err){
					console.log(err)
				}
			}
		
		)()
	}, [])

	const handleButtonClick = (id: number) => {

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
