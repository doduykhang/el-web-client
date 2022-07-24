import { useState } from 'react'

interface props {
	word: string
	definition: string
}
const Flashcard = ({ word, definition }: props) => {
	const [isShowDefinition, setIsShowDefinition] = useState(false)

	const handleToggle = () => {
		setIsShowDefinition((old) => !old)
	}

	return (
		<div
			onClick={handleToggle}
			className='h-96 shadow-lg p-2 flex flex-col justify-center items-center bg-gray-100 rounded-md'
		>
			{!isShowDefinition ? (
				<span className='text-blue-400 font-bold text-2xl'>{word}</span>
			) : (
				<span className='text-blue-400 font-bold text-2xl'>
					{definition}
				</span>
			)}
		</div>
	)
}

export default Flashcard
