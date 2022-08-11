interface props {
	option: string
	onSelect: (option: string) => void
}
const Option = ({ option, onSelect }: props) => {
	const handleSelectOption = () => {
		onSelect(option)
	}

	return <li onClick={handleSelectOption}>{option}</li>
}

export default Option
