import { Option } from '../../../../types/option'
import { ButtonCommon } from '../../../common'

interface props {
	content: string
	option: string
	options: Option[]
	onChange: (input: string) => void
	onSubmit: () => void
	finished?: boolean
}

const ChoiceQuestion = ({
	content,
	option,
	options,
	onChange,
	onSubmit,
	finished = false,
}: props) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.value)
	}

	return (
		<div className='card w-96 self-center bg-base-100 shadow-xl'>
			<div className='card-body justify-between'>
				<div>
					<h2 className='text-2xl'>Choose the right answer</h2>
					<h1 className='text-3xl'>{content}</h1>
				</div>
				<div className='grid grid-cols-2 gap-4'>
					{options.map((opt, index) => (
						<div className='form-control' key={index}>
							<label
								htmlFor='option'
								className='label cursor-pointer'
							>
								<span className='label-text'>
									{opt.content}
								</span>
								<input
									className='radio'
									key={index}
									type='radio'
									value={opt.content}
									name='option'
									disabled={finished}
									checked={opt.content === option}
									onChange={handleChange}
								/>
							</label>
						</div>
					))}
				</div>
				<div className=''>
					<ButtonCommon onClick={onSubmit}>Choose</ButtonCommon>
				</div>
			</div>
		</div>
	)
}

export default ChoiceQuestion
