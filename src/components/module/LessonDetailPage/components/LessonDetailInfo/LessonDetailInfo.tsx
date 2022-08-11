interface props {
	name: string
	imageURL: string
	content: string
	createdBy: string
}

const LessonDetailInfo = ({ name, imageURL, content, createdBy }: props) => {
	return (
		<div className='w-1/2 flex flex-col items-center'>
			<img className=' h-auto' src={imageURL} alt='lesson image' />
			<h1 className='text-3xl mt-1'>{name}</h1>
			<h2 className='text-gray-700 mt-1'>
				Created by:
				<span className=''> {createdBy}</span>
			</h2>
			<div
				className='my-5'
				dangerouslySetInnerHTML={{ __html: content }}
			></div>
		</div>
	)
}
export default LessonDetailInfo
