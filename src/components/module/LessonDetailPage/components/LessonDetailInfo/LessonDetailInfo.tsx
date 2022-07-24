import { lessonDetail } from '../../../../../types/lesson-detail'

interface props extends lessonDetail {}

const LessonDetailInfo = ({ title, imageUrl, content, createdBy }: props) => {
	return (
		<div>
			<h1 className='text-3xl mt-1'>{title}</h1>
			<h2 className='text-gray-700 mt-1'>
				Created by:
				<span className=''> {createdBy}</span>
			</h2>
			<img
				className='w-full h-auto my-4'
				src={imageUrl}
				alt='lesson image'
			/>
			<p className='mt-5'>{content}</p>
		</div>
	)
}
export default LessonDetailInfo
