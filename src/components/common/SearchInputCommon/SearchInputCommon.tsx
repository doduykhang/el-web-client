import { SearchIcon } from '../../../icons'

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
		<form
			className='ring-2 ring-black rounded-md p-1 flex w-fit'
			onSubmit={handleSubmit}
		>
			<input
				className='focus:outline-none'
				type='text'
				placeholder='search'
				value={value}
				onChange={onTextChange}
			/>
			<button type='submit'>
				<SearchIcon />
			</button>
		</form>
	)
}

export default SearchInputCommon
