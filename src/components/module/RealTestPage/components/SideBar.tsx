import { Question } from '../../../../types/questions'
import QuestionItem from './QuestionItems'

interface props {
	answers: any
	currentQuestion: number
	onSelectQuestion: (index: number) => void
	isFinished: boolean
	questions: Question[]
}
const SideBar = ({
	answers,
	currentQuestion,
	onSelectQuestion,
	isFinished,
	questions,
}: props) => {
	return (
		<div>
			<ul className='ring-2 ring-black w-48 h-full p-2 overflow-auto'>
				{questions.map((question, index) => (
					<QuestionItem
						key={question.id}
						id={question.id}
						answer={answers[question.id]}
						index={index}
						currentQuestion={currentQuestion}
						finished={isFinished}
						right={question.answer === answers[question.id]}
						onSelectQuestion={onSelectQuestion}
					/>
				))}
			</ul>
		</div>
	)
}

export default SideBar
