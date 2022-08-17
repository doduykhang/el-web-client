interface props {
	name: string
	imageURL: string
	content: string
	createdBy: string
}

const LessonDetailInfo = ({ name, imageURL, content, createdBy }: props) => {
	return (
		<div className='w-1/2 flex flex-col items-center'>
			<div className='card card-compact w-full bg-base-100 shadow-xl '>
				<figure>
					<img src={imageURL} alt='Lesson' />
				</figure>
				<div className='card-body '>
					<div className='flex flex-col items-center text-center'>
						<h2 className='card-title'>{name}</h2>
						<span className=''> {createdBy}</span>
					</div>
					<p
						className='my-5'
						dangerouslySetInnerHTML={{ __html: content }}
					></p>
				</div>
			</div>
		</div>
	)
}
export default LessonDetailInfo
