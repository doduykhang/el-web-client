interface props {
	content: string
	text: string
	onChange: (input: string) => void
}

const FillQuestion = ({ content, text, onChange }: props) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.value)
	}

	return (
		<div>
			<h1>{content}</h1>
			<input value={text} onChange={handleChange} type='text' />{' '}
		</div>
	)
}

export default FillQuestion
