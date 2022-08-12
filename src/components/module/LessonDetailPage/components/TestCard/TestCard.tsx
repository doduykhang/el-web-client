import { Link } from 'react-router-dom'
import { ButtonCommon } from '../../../../common'

interface props {
	id: number
	testName: string
	level: number
	time: number
}

const TestCard = ({ id, testName, level, time }: props) => {
	return (
		<div>
			<h1>Name: {testName}</h1>
			<p>Level: {level}</p>
			<p>Time: {time}</p>
			<Link to={`/test/${id}`}>
				<ButtonCommon>Take test</ButtonCommon>
			</Link>
		</div>
	)
}

export default TestCard
