import { Link, useNavigate } from 'react-router-dom'

interface props {
	title: string
	link?: string
}
const GobackButtonCommon = ({ title, link }: props) => {
	const navigate = useNavigate()

	if (!link)
		return (
			<a className='link' onClick={() => navigate(-1)}>
				{title}
			</a>
		)
	return (
		<Link to={link}>
			<a className='link'>{title}</a>
		</Link>
	)
}

export default GobackButtonCommon
