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
						finished={isFinished}
					/>
				)
			}
			case 'AUDIO': {
				return (
					<AudioQuestion
						content={question.content}
						text={input}
						onChange={setInput}
						finished={isFinished}
					/>
				)
			}
			case 'CHOICE': {
				getOptions(question.id)
				return (
					<ChoiceQuestion
						content={question.content}
						option={input}
						finished={isFinished}
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
		<form
			className='w-full h-[600px] flex flex-col justify-center'
			onSubmit={handleSubmit}
		>
      <div className='mb-auto'>

			{isFinished ? (
				userAnswer[question.id] === question.answer ? (
					<div className='alert alert-success shadow-lg'>
						<div>
							<span>You are correct </span>
						</div>
					</div>
				) : (
					<div className='alert alert-error shadow-lg'>
						<div>
							<span>
								Wrong, right answer is {question.answer}{' '}
							</span>
						</div>
					</div>
				)
			) : (
				<div></div>
			)}
      </div>
			{buildQuestion()}
		</form>
	)
}

export default QuestionBuilder
