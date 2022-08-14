import { Option } from '../../../../types/option'
import { ButtonCommon } from '../../../common'

interface props {
	content: string
	option: string
	options: Option[]
	onChange: (input: string) => void
	onSubmit: () => void
}

const ChoiceQuestion = ({
	content,
	option,
	options,
	onChange,
	onSubmit,
}: props) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.value)
	}

	return (
		<div className='px-20 w-full h-full flex flex-col justify-around'>
			<h1 className='text-3xl'>{content}</h1>
			<div className='grid grid-cols-2 gap-4'>
				{options.map((opt, index) => (
					<div
						className='flex gap-2 ring-2 p-4 rounded-xl'
						key={index}
					>
						<label htmlFor='option'>{opt.content}</label>
						<input
							key={index}
							type='radio'
							value={opt.content}
							name='option'
							checked={opt.content === option}
							onChange={handleChange}
						/>
					</div>
				))}
			</div>
			<div className=''>
				<ButtonCommon onClick={onSubmit}>Choose</ButtonCommon>
			</div>
		</div>
	)
}

export default ChoiceQuestion
