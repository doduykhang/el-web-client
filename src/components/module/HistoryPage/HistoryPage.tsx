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
			<h1 className='text-5xl font-bold text-center mb-4'>
				Test history
			</h1>
				<div className='flex w-full flex-col gap-2 items-center'>
					{tests.map((test) => {
						return <TestHistoryCard {...test} />
					})}
				</div>
		</div>
	)
}

export default HistoryPage
