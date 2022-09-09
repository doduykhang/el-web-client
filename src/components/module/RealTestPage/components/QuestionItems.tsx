import classNames from 'classnames'

interface props {
	index: number
	id: number
	answer: string
	currentQuestion: number
	onSelectQuestion: (index: number) => void
	finished: boolean
	right: boolean
}
const QuestionItem = ({
	id,
	answer,
	index,
	currentQuestion,
	onSelectQuestion,
	finished,
	right,
}: props) => {
	const handleSelectQuestion = () => {
		onSelectQuestion(index)
	}

	return (
		<li
			className={classNames('', {
				'ring-2 ring-black z-20': index === currentQuestion,
				'bg-red-200': finished && !right,
				'bg-green-200': finished && right,
			})}
			onClick={handleSelectQuestion}
		>
			<div>
				<span>{index+1}</span>
				<span>{answer}</span>
			</div>
		</li>
	)
}

export default QuestionItem
