interface props {
	title: string
	link: string
}
const GobackButtonCommon = ({ title, link }: props) => {
	return (
		<div>
			{title} <span>{link}</span>
		</div>
	)
}

export default GobackButtonCommon
