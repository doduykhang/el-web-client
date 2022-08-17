import { Question } from '../../../../types/questions'
import QuestionItem from './QuestionItems'

interface props {
	answers: any
	currentQuestion: number
	onSelectQuestion: (index: number) => void
	isFinished: boolean
	questions: Question[]
	children: React.ReactNode
}
const SideBar = ({
	answers,
	currentQuestion,
	onSelectQuestion,
	isFinished,
	questions,
	children,
}: props) => {
	return (
		<div className='drawer flex'>
			<div className='drawer-side w-80'>
				<ul className='menu'>
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

			<div className='drawer-content flex-1'>{children}</div>
		</div>
	)
}

export default SideBar
