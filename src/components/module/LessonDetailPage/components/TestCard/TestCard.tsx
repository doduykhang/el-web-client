import classNames from 'classnames'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../../../context/AuthContext'
import { ButtonCommon } from '../../../../common'

interface props {
	id: number
	testName: string
	level: number
	time: number
}

const TestCard = ({ id, testName, level, time }: props) => {
	const { auth } = useContext(AuthContext)
	return (
		<div className='card w-96 bg-base-100 shadow-xl'>
			<div className='card-body'>
				<h2 className='card-title'>{testName}</h2>
				<div className='flex'>
					<div className='flex-1 '>
						<p>
							Level:{' '}
							<span
								className={classNames('badge', {
									'badge-success': level <= 2,
									'badge-warning': level === 3,
									'badge-error': level >= 4,
								})}
							>
								{level}
							</span>
						</p>
						<p>
							Time:{' '}
							<span className='countdown font-mono text-md'>
								<span
									style={
										//@ts-ignore
										{ '--value': Math.floor(time / 60) }
									}
								></span>
								m
								<span
									style={
										//@ts-ignore
										{ '--value': Math.floor(time % 60) }
									}
								></span>
								s
							</span>
						</p>
					</div>
					{auth.role === 'USER' ? (
						<Link to={`/test/${id}`}>
							<ButtonCommon>Take test</ButtonCommon>
						</Link>
					) : (
						<Link to={`/login`}>
							<ButtonCommon>Login to take test</ButtonCommon>
						</Link>
					)}
				</div>
			</div>
		</div>
	)
}

export default TestCard
