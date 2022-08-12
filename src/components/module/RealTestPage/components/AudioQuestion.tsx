interface props {
	content: string
	text: string
	onChange: (input: string) => void
}

const AudioQuestion = ({ content, text, onChange }: props) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.value)
	}

	return (
		<div>
			<audio src={content} controls></audio>
			<input value={text} onChange={handleChange} type='text' />{' '}
		</div>
	)
}

export default AudioQuestion
