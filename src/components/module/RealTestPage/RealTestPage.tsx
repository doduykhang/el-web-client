import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../../api/index.api'
import { Question } from '../../../types/questions'
import QuestionBuilder from './components/QuestionBuilder'

const RealTestPage = () => {
	const { id } = useParams()
	const [questions, setQuestions] = useState<Question[]>([])
	const [currentQuestion, setCurrentQuestion] = useState(0)
	const [finished, setFinishied] = useState(false)

	useEffect(() => {
		const getQuestions = async () => {
			if (id) {
				const response = await api.testApi.getQuestions(+id)
				setQuestions(response || [])
			}
		}
		getQuestions()
	}, [])

	const handleAnswer = (answer: string) => {
		console.log(answer)
		if (currentQuestion === questions.length - 1) {
			setFinishied(true)
			return
		}
		setCurrentQuestion((old) => old + 1)
	}

	return (
		<div>
			{questions.length && (
				<QuestionBuilder
					question={questions[currentQuestion]}
					onAnswer={handleAnswer}
				/>
			)}
			{finished && <div>finished</div>}
		</div>
	)
}

export default RealTestPage
