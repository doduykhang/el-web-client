import { useEffect, useMemo, useState } from 'react'
import { AxisOptions, Chart } from 'react-charts'
import { Link, useParams } from 'react-router-dom'
import api from '../../../api/index.api'
import { TestHistoryDetail } from '../../../types/test'
import HistoryDetailCard from './components/HistoryDetailCard'
type TestData = {
	time: number
	score: number
}

type Series = {
	label: string
	data: TestData[]
}

const HistoryDetailPage = () => {
	const { testId, id } = useParams()
	const [testDetails, setTestDetail] = useState<TestHistoryDetail[]>([])
	const [testStats, setTestStats] = useState<Series[]>([])

	useEffect(() => {
		const getUserDetail = async () => {
			const response = await api.testApi.testHistoryDetail(id ? +id : 0)
			setTestDetail(response || [])
		}

		const getTestStat = async () => {
			const response = await api.testApi.testHistoryStat(
				testId ? +testId : 0
			)
			console.log(response)

			setTestStats([{ label: 'test', data: response || [] }])
		}

		getUserDetail()
		getTestStat()
	}, [])

	const primaryAxis = useMemo(
		(): AxisOptions<TestData> => ({
			getValue: (datum) => datum.time,
			tickCount: 1,
		}),
		[]
	)

	const secondaryAxes = useMemo(
		(): AxisOptions<TestData>[] => [
			{
				getValue: (datum) => datum.score * 10,
				max: 10,
				min: 0,
			},
		],
		[]
	)
	return (
		<div className='u-page'>
			<h1 className='text-5xl font-bold text-center mb-4'>Test detail</h1>

			<h2 className='text-2xl font-bold text-center mb-4'>
				Test history
			</h2>
			<div className='flex justify-center'>
				<div className='w-1/2 h-96 flex items-end'>
					<div className='w-full h-full '>
						<span>Score</span>
						{testStats.length && (
							<Chart
								options={{
									data: testStats,
									primaryAxis,
									secondaryAxes,
								}}
							/>
						)}
					</div>
					<span>Times</span>
				</div>
			</div>

			<div className='flex justify-center mt-5'>
				<Link to={`/test/${testId}`}>
					<button className='btn btn-primary'>Take test again</button>
				</Link>
			</div>
			<h2 className='text-2xl font-bold text-center mb-4'>Your answer</h2>
			<div className='flex justify-center'>
				<div className='grid grid-cols-3 gap-2'>
					{testDetails.map((detail, index) => {
						return <HistoryDetailCard key={index} {...detail} />
					})}
				</div>
			</div>
		</div>
	)
}

export default HistoryDetailPage
