'use client'

// react
import { useEffect, useState } from "react"

//emojis
import { emojis } from "./emojis"

interface ReactionInterface {
	id: number,
	value: string,
	count: number
}

export default function PostReactions() {

	const [reactions, setReactions] = useState<ReactionInterface[]>([])
	const [selectedReaction, setSelectedReaction] = useState<number | null>(null)

	const list = [{id: 0, value: emojis[0], count: 0}, {id: 1, value: emojis[1], count: 2}, {id: 2, value: emojis[2], count: 2}]

	useEffect(() => {
		setReactions(list.sort((a,b) => b.count - a.count))
	}, [])

	const handleButtonClick = (id: number) => {

		if(selectedReaction === id) {
			setSelectedReaction(null)
			const updatedReactions = reactions.map((el) => {
				if(el.id === id) {
					return {...el, count : el.count - 1}
				} else {
					return el
				}
			})
	
			setReactions(updatedReactions)
		} else {
			setSelectedReaction(id)
			const updatedReactions = reactions.map((el) => {
				if(el.id === id) {
					return {...el, count : el.count + 1}
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
