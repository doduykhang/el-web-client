import classNames from 'classnames'

interface props {
	index: number
	id: number
	answer: string
	currentQuestion: number
	onSelectQuestion: (index: number) => void
}
const QuestionItem = ({
	id,
	answer,
	index,
	currentQuestion,
	onSelectQuestion,
}: props) => {
	const handleSelectQuestion = () => {
		onSelectQuestion(index)
	}

	return (
		<li
			className={classNames('h-10 mb-2 flex gap-2 items-center pl-4', {
				'ring-2': index === currentQuestion,
			})}
			onClick={handleSelectQuestion}
		>
			<span>{index}</span>
			<span>{answer}</span>
		</li>
	)
}

export default QuestionItem
