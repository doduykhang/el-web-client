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
			className={classNames('h-10 mb-2 flex gap-2 items-center pl-4', {
				'ring-4': index === currentQuestion || finished,
				'ring-red-200': finished && !right,
				'ring-green-200': finished && right,
			})}
			onClick={handleSelectQuestion}
		>
			<span>{index}</span>
			<span>{answer}</span>
		</li>
	)
}

export default QuestionItem
