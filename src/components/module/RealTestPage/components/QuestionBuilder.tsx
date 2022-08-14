import { useEffect, useState } from 'react'
import api from '../../../../api/index.api'
import { Option } from '../../../../types/option'
import { Question } from '../../../../types/questions'
import AudioQuestion from './AudioQuestion'
import ChoiceQuestion from './ChoiceQuestion'
import FillQuestion from './FillQuestion'

interface props {
	question: Question
	onAnswer: (id: number, answer: string) => void
	userAnswer: any
	isFinished: boolean
}

const QuestionBuilder = ({
	question,
	onAnswer,
	userAnswer,
	isFinished,
}: props) => {
	const [input, setInput] = useState('')
	const [options, setOptions] = useState<Option[]>([])

	const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault()
		handleChooseOption()
	}

	const handleChooseOption = () => {
		onAnswer(question.id, input)
		setInput('')
	}

	const getOptions = async (id: number) => {
		const response = await api.questionApi.getOptions(id)
		setOptions(response || [])
	}

	useEffect(() => {
		setInput(userAnswer[question.id])
	}, [question, userAnswer])

	const buildQuestion = () => {
		switch (question.questionType) {
			case 'FILL': {
				return (
					<FillQuestion
						content={question.content}
						text={input}
						onChange={setInput}
					/>
				)
			}
			case 'AUDIO': {
				return (
					<AudioQuestion
						content={question.content}
						text={input}
						onChange={setInput}
					/>
				)
			}
			case 'CHOICE': {
				getOptions(question.id)
				return (
					<ChoiceQuestion
						content={question.content}
						option={input}
						onChange={setInput}
						options={options}
						onSubmit={handleChooseOption}
					/>
				)
			}
			default: {
				return <div></div>
			}
		}
	}
	return (
		<form className='w-full h-[600px]' onSubmit={handleSubmit}>
			{buildQuestion()}
			{isFinished ? (
				userAnswer[question.id] === question.answer ? (
					<div>Right</div>
				) : (
					<div>
						<span>Wrong, </span>
						<span>right answer is {question.answer}</span>
					</div>
				)
			) : (
				<div></div>
			)}
		</form>
	)
}

export default QuestionBuilder
