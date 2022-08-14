interface props {
	value: string
	onChange: (value: string) => void
}
const InputCommon = ({ value, onChange }: props) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault()
		onChange(e.target.value)
	}
	return (
		<input
			className='p-2 h-12 w-full text-2xl border-black border-2 rounded-xl [&:not(:focus)]:text-3xl'
			type='text'
			onChange={handleChange}
			value={value}
		/>
	)
}

export default InputCommon
