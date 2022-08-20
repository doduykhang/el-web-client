import classNames from 'classnames'
import AudioIcon from '../../../../icons/AudioIcon'

interface props {
	content: string
	questionType: 'CHOICE' | 'AUDIO' | 'FILL'
	userAnswer: string
	answer: string
}

const HistoryDetailCard = ({
	content,
	answer,
	userAnswer,
	questionType,
}: props) => {
	let audio = new Audio(content)
	const start = () => {
		audio.play()
	}

	return (
		<div className='card w-96 bg-base-100 shadow-xl'>
			<div
				className={classNames('card-body bg-red-200', {
					'bg-green-200': answer === userAnswer,
				})}
			>
				<h2 className='card-title'>
					<span>Content: </span>
					{questionType !== 'AUDIO' ? (
						content
					) : (
						<button className='btn btn-circle' onClick={start}>
							<AudioIcon />
						</button>
					)}
				</h2>
				<div>
					<p>Answer: {answer}</p>
					<span>Your answer:</span>

					<span>{' ' + userAnswer}</span>
				</div>
			</div>
		</div>
	)
}
export default HistoryDetailCard
