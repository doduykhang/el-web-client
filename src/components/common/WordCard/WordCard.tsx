import AudioIcon from '../../../icons/AudioIcon'
import { word } from '../../../types/word'

interface props {
	word: word
	children?: React.ReactNode
}

const WordCard = ({
	word: { word, definition, example, type, pronounciation },
	children,
}: props) => {
	let audio = new Audio(pronounciation)
	const start = () => {
		audio.play()
	}

	return (
		<div className='card w-96 bg-base-100 shadow-xl'>
			<div className='card-body'>
				<h2 className='card-title'>{word}</h2>
				<div className='flex'>
					<div className='flex-1'>
						<p>
							<span className='font-bold'> Definition:</span>{' '}
							{definition}
						</p>
						<p>
							<span className='font-bold'> Example:</span>{' '}
							{example}
						</p>

						<p>

							<span className='font-bold'> Type:</span>{' '}
              {type}</p>
					</div>
					<div>
						<button className='btn btn-circle' onClick={start}>
							<AudioIcon />
						</button>
						<audio src={pronounciation} />
					</div>
				</div>
				{children}
			</div>
		</div>
	)
}

export default WordCard
