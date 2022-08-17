import { ButtonCommon, InputCommon } from '../../../common'

interface props {
	content: string
	text: string
	onChange: (input: string) => void
  finished?: boolean
}

const FillQuestion = ({ content, text, onChange, finished }: props) => {
	return (
		<div className='card w-96 self-center bg-base-100 shadow-xl'>
			<div className='card-body justify-between'>
				<div className='flex flex-col gap-2 '>
					<h2 className='text-2xl'>Fill in blank space</h2>
					<h1 className='text-3xl'>{content}</h1>
				</div>
				<div className='form-control '>
					<label>Answer</label>
					<InputCommon value={text} onChange={onChange} disabled={finished}/>
				</div>

				<div className=''>
					<ButtonCommon htmlType='submit'>Choose</ButtonCommon>
				</div>
			</div>
		</div>
	)
}

export default FillQuestion
