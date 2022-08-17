import { Link } from 'react-router-dom'

interface props {
	title: string
	link: string
}
const GobackButtonCommon = ({ title, link }: props) => {
	return (
			<Link to={link}>
				<a className='link'>{title}</a>
			</Link>
	)
}

export default GobackButtonCommon
