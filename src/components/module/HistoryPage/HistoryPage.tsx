import { useEffect, useState } from 'react'
import api from '../../../api/index.api'
import { TestHistory } from '../../../types/test'
import TestHistoryCard from './components/TestHistoryCard'

const HistoryPage = () => {
	const [tests, setTests] = useState<TestHistory[]>([])

	useEffect(() => {
		const getTestHistory = async () => {
			const response = await api.testApi.testHistory()
			setTests(response || [])
		}
		getTestHistory()
	}, [])

	return (
		<div className='u-page'>
			<div className='flex flex-col gap-2'>
				{tests.map((test) => {
					return <TestHistoryCard {...test} />
				})}
			</div>
		</div>
	)
}

export default HistoryPage
