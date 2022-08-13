import { InputCommon } from '../../../common'

interface props {
	content: string
	text: string
	onChange: (input: string) => void
}

const FillQuestion = ({ content, text, onChange }: props) => {
	return (
		<div className='px-20 w-full h-full flex flex-col justify-around'>
			<h1 className='text-3xl'>{content}</h1>
			<div>
				<InputCommon value={text} onChange={onChange} />
			</div>
		</div>
	)
}

export default FillQuestion
