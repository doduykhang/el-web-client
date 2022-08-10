interface props {
	name: string
	imageURL: string
	content: string
	createdBy: string
}

const LessonDetailInfo = ({ name, imageURL, content, createdBy }: props) => {
	return (
		<div className='flex flex-col items-center'>
			<img
				className='w-1/2 h-auto my-4'
				src={imageURL}
				alt='lesson image'
			/>
			<h1 className='text-3xl mt-1'>{name}</h1>
			<h2 className='text-gray-700 mt-1'>
				Created by:
				<span className=''> {createdBy}</span>
			</h2>
			<p className='mt-5'>{content}</p>
		</div>
	)
}
export default LessonDetailInfo
