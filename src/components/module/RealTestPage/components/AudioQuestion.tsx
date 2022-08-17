import AudioIcon from '../../../../icons/AudioIcon'
import { ButtonCommon, InputCommon } from '../../../common'

interface props {
	content: string
	text: string
	onChange: (input: string) => void
  finished?: boolean 
}

const AudioQuestion = ({ content, text, onChange, finished }: props) => {
	let audio = new Audio(content)
	const start = () => {
		audio.play()
	}
	return (
		<div className='card w-96 self-center bg-base-100 shadow-xl'>
			<div className='card-body justify-between'>
				<div className='flex flex-col gap-2 '>
					<h2 className='text-2xl'>Listen and type the answer</h2>
					<button
						type='button'
						className='btn btn-circle'
						onClick={start}
					>
						<AudioIcon />
					</button>
				</div>
				<div className='form-control '>
					<label>Answer</label>
					<InputCommon value={text} onChange={onChange} disabled={finished} />
				</div>

				<div className=''>
					<ButtonCommon htmlType='submit'>Choose</ButtonCommon>
				</div>
			</div>
		</div>
	)
}

export default AudioQuestion
