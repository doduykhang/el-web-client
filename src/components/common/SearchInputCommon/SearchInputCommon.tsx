interface props {
	value: string
	onChange: (value: string) => void
	onSubmit?: (value: string) => void
}

const SearchInputCommon = ({ value, onChange, onSubmit }: props) => {
	const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.value)
	}

	const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault()
		onSubmit && onSubmit(value)
	}

	return (
		<form onSubmit={handleSubmit}>
			<input
				className='input input-bordered w-full max-w-xs'
				type='text'
				placeholder='search'
				value={value}
				onChange={onTextChange}
			/>
		</form>
	)
}

export default SearchInputCommon
