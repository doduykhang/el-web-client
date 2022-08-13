import { useMemo } from 'react'
import QuestionItem from './QuestionItems'

interface props {
	answers: any
	currentQuestion: number
	onSelectQuestion: (index: number) => void
}
const SideBar = ({ answers, currentQuestion, onSelectQuestion }: props) => {
	const myAnswers = useMemo(() => {
		let temp: any[] = []
		Object.keys(answers).forEach(function (key) {
			temp.push({ id: key, answer: answers[key] })
		})
		return temp
	}, [answers])

	return (
		<div>
			<ul className='ring-2 ring-black w-48 h-full p-2 overflow-auto'>
				{myAnswers.map((answer, index) => (
					<QuestionItem
						id={answer.id}
						answer={answer.answer}
						index={index}
						currentQuestion={currentQuestion}
						onSelectQuestion={onSelectQuestion}
					/>
				))}
			</ul>
		</div>
	)
}

export default SideBar
