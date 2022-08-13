import { useState } from 'react'
import api from '../../../../api/index.api'
import { Option } from '../../../../types/option'
import { Question } from '../../../../types/questions'
import AudioQuestion from './AudioQuestion'
import ChoiceQuestion from './ChoiceQuestion'
import FillQuestion from './FillQuestion'

interface props {
	question: Question
	onAnswer: (id: number, answer: string) => void
}

const QuestionBuilder = ({ question, onAnswer }: props) => {
	const [input, setInput] = useState('')
	const [options, setOptions] = useState<Option[]>([])

	const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault()
		setInput('')
		onAnswer(question.id, input)
	}

	const getOptions = async (id: number) => {
		const response = await api.questionApi.getOptions(id)
		setOptions(response || [])
	}

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
					/>
				)
			}
			default: {
				return <div></div>
			}
		}
	}
	return (
		<form className='w-full h-full' onSubmit={handleSubmit}>
			{buildQuestion()}
		</form>
	)
}

export default QuestionBuilder
