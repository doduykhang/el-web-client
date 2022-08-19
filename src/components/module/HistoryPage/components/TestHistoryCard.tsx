import classNames from 'classnames'
import { Link } from 'react-router-dom'

interface props {
	id: number
	testName: string
	level: number
	testId: number
	score: number
	time: number
	startTime: string
	lessonId: number
}

const TestHistoryCard = ({
	id,
	testName,
	level,
	testId,
	time,
	startTime,
	score,
	lessonId,
}: props) => {
	return (
		<div className='card w-1/2 bg-base-100 shadow-xl'>
			<div className='card-body'>
				<h2 className='card-title flex justify-between'>
					<span>{testName}</span>

					<div>
						<span className='text-red-400'>Score: </span>

						<span className='text-red-400'>
							{(score * 10).toFixed(1)}
						</span>
					</div>
				</h2>
				<div className='flex'>
					<div className='flex-1 '>
						<p>
							Level:{' '}
							<span
								className={classNames('badge', {
									'badge-success': level <= 2,
									'badge-warning': level === 3,
									'badge-error': level >= 4,
								})}
							>
								{level}
							</span>
						</p>
						<p>Start time: {new Date(startTime).toUTCString()}</p>
						<p>Time: {time}</p>
						<div className='card-actions justify-end'>
							<button className='btn btn-primary'>Detail</button>
							<Link to={`/lesson-detail/${lessonId}`}>
								<button className='btn btn-primary'>
									Go to lesson
								</button>
							</Link>

							<Link to={`/test/${testId}`}>
								<button className='btn btn-primary'>
									Take test again
								</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default TestHistoryCard
