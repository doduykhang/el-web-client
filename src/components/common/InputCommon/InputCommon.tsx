interface props {
	value: string
  type?: string
	onChange: (value: string) => void
	disabled?: boolean
}
const InputCommon = ({ value, onChange, disabled = false, type = "text" }: props) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault()
		onChange(e.target.value)
	}
	return (
		<input
			className='input input-bordered w-full max-w-xs'
      disabled={disabled}
			type={type}
			onChange={handleChange}
			value={value}
		/>
	)
}

export default InputCommon
