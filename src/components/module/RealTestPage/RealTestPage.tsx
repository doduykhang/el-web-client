import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../../api/index.api'
import { Question } from '../../../types/questions'
import QuestionBuilder from './components/QuestionBuilder'
import SideBar from './components/SideBar'

const RealTestPage = () => {
	const { id } = useParams()
	const [questions, setQuestions] = useState<Question[]>([])
	const [currentQuestion, setCurrentQuestion] = useState(0)
	const [answers, setAnswer] = useState<any>({})
	const [finished, setFinishied] = useState(false)

	useEffect(() => {
		const getQuestions = async () => {
			if (id) {
				const response = await api.testApi.getQuestions(+id)
				setQuestions(response || [])
				if (response) {
					const initalAnswer = response.reduce(
						(object: any, current: any) => {
							object[current.id] = ''
							return object
						},
						{}
					)
					setAnswer(initalAnswer)
				}
			}
		}
		getQuestions()
	}, [])

	const handleAnswer = (id: number, answer: string) => {
		if (currentQuestion === questions.length - 1) {
			setFinishied(true)
			return
		}
		setAnswer((old: any) => {
			const newAnswer = { ...old }
			newAnswer[id] = answer
			return newAnswer
		})
		setCurrentQuestion((old) => old + 1)
	}

	return (
		<div className='u-page'>
			<div className='flex h-full gap-2'>
				<SideBar
					currentQuestion={currentQuestion}
					answers={answers}
					onSelectQuestion={setCurrentQuestion}
				/>
				<div className='w-full h-full'>
					{questions.length && (
						<QuestionBuilder
							question={questions[currentQuestion]}
							onAnswer={handleAnswer}
						/>
					)}
				</div>
			</div>
		</div>
	)
}

export default RealTestPage
