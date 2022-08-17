import { Link } from 'react-router-dom'

interface props {
	id: number
	title: string
	imageURL: string
}

const LessonCard = ({ id, imageURL, title }: props) => {
	return (
		<>
			<div className='card w-60 bg-base-100 shadow-xl '>
				<figure>
					<img src={imageURL} alt='Lesson' />
				</figure>
				<div className='card-body items-center text-center'>
					<h2 className='card-title'>{title}</h2>
					<p></p>

					<div className='card-actions justify-end'>
						<Link to={`/lesson-detail/${id}`}>
							<button className='btn btn-primary'>
								Learn now
							</button>
						</Link>
					</div>
				</div>
			</div>
		</>
	)
}

export default LessonCard
