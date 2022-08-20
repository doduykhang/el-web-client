import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../../api/index.api'
import { Question } from '../../../types/questions'
import { ButtonCommon } from '../../common'
import QuestionBuilder from './components/QuestionBuilder'
import SideBar from './components/SideBar'

const RealTestPage = () => {
	const { id } = useParams()
	const [questions, setQuestions] = useState<Question[]>([])
	const [currentQuestion, setCurrentQuestion] = useState(0)
	const [answers, setAnswer] = useState<any>({})
	const [remainingTime, setRemainingTime] = useState(30)
	const [finished, setFinishied] = useState(false)
	const [score, setScore] = useState('')

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

	const handleSubmitTest = async () => {
		if (id) {
			const response = await api.testApi.submitTest({
				testID: +id,
				answers,
			})
			console.log(response)

			const totalScore = questions.reduce((score, current) => {
				if (current.answer === answers[current.id]) score++
				return score
			}, 0)
			setScore(((totalScore / questions.length) * 10).toFixed(1))
			setFinishied(true)
		}
	}

	useEffect(() => {
		const interval = setInterval(() => {
			if (remainingTime <= 0 && !finished) {
				handleSubmitTest()
				setFinishied(true)
				return
			}
			if (remainingTime > 0 && !finished)
				setRemainingTime((old) => old - 1)
		}, 1000)

		return () => {
			clearInterval(interval)
		}
	}, [remainingTime, handleSubmitTest])

	const handleAnswer = (id: number, answer: string) => {
		setAnswer((old: any) => {
			const newAnswer = { ...old }
			newAnswer[id] = answer
			return newAnswer
		})
		if (currentQuestion === questions.length - 1) return
		setCurrentQuestion((old) => old + 1)
	}

	const formatTime = (time: number) => {
		const minute = Math.floor(time / 60)
		const second = Math.floor(time % 60)
		return `${minute}:${second}`
	}

	return (
		<div className=''>
			<div className='flex h-full gap-2'>
				<SideBar
					currentQuestion={currentQuestion}
					answers={answers}
					questions={questions}
					isFinished={finished}
					onSelectQuestion={setCurrentQuestion}
				>
					<div className='w-full flex flex-col items-center'>
						<div className='w-full flex justify-between items-center px-6 mt-2'>
							<span className='mx-auto text-2xl'>
								<p>
									<span className='countdown font-mono text-md'>
										<span
											style={{
												//@ts-ignore
												'--value': Math.floor(
													remainingTime / 60
												),
											}}
										></span>
										:
										<span
											style={{
												//@ts-ignore
												'--value': Math.floor(
													remainingTime % 60
												),
											}}
										></span>
									</span>
								</p>
							</span>
							<div className='w-28'>
								{finished ? (
									<div className='text-xl'>Score {score}</div>
								) : (
									<ButtonCommon onClick={handleSubmitTest}>
										Submit
									</ButtonCommon>
								)}
							</div>
						</div>
						{questions.length && (
							<QuestionBuilder
								question={questions[currentQuestion]}
								isFinished={finished}
								onAnswer={handleAnswer}
								userAnswer={answers}
							/>
						)}
					</div>
				</SideBar>
			</div>
		</div>
	)
}

export default RealTestPage
