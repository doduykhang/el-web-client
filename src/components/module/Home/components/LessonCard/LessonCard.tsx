import { Link } from 'react-router-dom'
import { ButtonCommon } from '../../../../common/'

interface props {
	id: number
	title: string
	imageURL: string
}

const LessonCard = ({ id, imageURL, title }: props) => {
	return (
		<div className='flex flex-col gap-2 w-60 p-2 rounded-md ring-2 ring-gray-400 shadow-lg '>
			<img
				src={imageURL}
				alt='lesson image'
				className='w-60 rounded-md'
			/>
			<span className='text-xl font-medium line-clamp-2'>{title}</span>
			<ButtonCommon>
				<Link to={`/lesson-detail/${id}`}>Learn now</Link>
			</ButtonCommon>
		</div>
	)
}

export default LessonCard
