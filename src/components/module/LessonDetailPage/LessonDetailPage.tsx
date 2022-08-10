import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../../api/index.api'
import { LessonDetail } from '../../../types/lesson-detail'
import { Manager } from '../../../types/manager'
import { word } from '../../../types/word'
import LessonDetailInfo from './components/LessonDetailInfo/LessonDetailInfo'
import WordTable from './components/WordTable/WordTable'

const LessonDetailPage = () => {
	const [lessonDetail, setLessonDetail] = useState<LessonDetail | null>(null)
	const [words, setWords] = useState<word[]>([])
	const [manager, setManager] = useState<Manager | null>(null)

	const { id } = useParams()

	useEffect(() => {
		const getLessonDetail = async () => {
			if (id) {
				const response = await api.lessonApi.getLessonDetail(+id)
				setLessonDetail(response.lesson)
				setWords(response.words || [])
				setManager(response.manager)
			}
		}
		getLessonDetail()
	}, [])

	return (
		<div className='px-20 flex flex-col items-center'>
			{lessonDetail && manager && (
				<LessonDetailInfo
					name={lessonDetail.lessonName}
					content={lessonDetail.content}
					imageURL={lessonDetail.imageURL}
					createdBy={manager.firstName}
				/>
			)}
			<div className='w-1/2'>
				<WordTable words={words} />
			</div>
		</div>
	)
}

export default LessonDetailPage
