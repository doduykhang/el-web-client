import { InputCommon } from '../../../common'

interface props {
	content: string
	text: string
	onChange: (input: string) => void
}

const AudioQuestion = ({ content, text, onChange }: props) => {
	return (
		<div className='px-20 w-full h-full flex flex-col justify-around'>
			<audio src={content} controls></audio>
			<div>
				<InputCommon value={text} onChange={onChange} />
			</div>
		</div>
	)
}

export default AudioQuestion
