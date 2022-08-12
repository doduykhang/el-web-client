import { Option } from '../../../../types/option'

interface props {
	content: string
	option: string
	options: Option[]
	onChange: (input: string) => void
}

const ChoiceQuestion = ({ content, option, options, onChange }: props) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.value)
	}

	return (
		<div>
			<h1>{content}</h1>
			<div onChange={handleChange}>
				{options.map((opt, index) => (
					<>
						<label htmlFor='option'>{opt.content}</label>
						<input
							key={index}
							type='radio'
							value={opt.content}
							name='option'
							checked={opt.content === option}
						/>
					</>
				))}
			</div>
		</div>
	)
}

export default ChoiceQuestion
