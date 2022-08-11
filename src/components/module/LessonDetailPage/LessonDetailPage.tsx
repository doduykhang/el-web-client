import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../../api/index.api'
import { setCard } from '../../../redux/card/cardSlice'
import { useAppDispatch } from '../../../redux/hook'
import { setTest } from '../../../redux/test/testSlice'
import { LessonDetail } from '../../../types/lesson-detail'
import { Manager } from '../../../types/manager'
import { word } from '../../../types/word'
import { ButtonCommon } from '../../common'
import LessonDetailInfo from './components/LessonDetailInfo/LessonDetailInfo'
import WordTable from './components/WordTable/WordTable'

const LessonDetailPage = () => {
	const [lessonDetail, setLessonDetail] = useState<LessonDetail | null>(null)
	const [words, setWords] = useState<word[]>([])
	const [manager, setManager] = useState<Manager | null>(null)

	const { id } = useParams()
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

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

	const handleLearnWithFlashcard = () => {
		dispatch(setCard(words))
		navigate('/flashcard')
	}

	const handleMockTest = () => {
		dispatch(setTest(words))
		navigate('/test')
	}

	return (
		<div className='px-20 py-10 flex'>
			{lessonDetail && manager && (
				<LessonDetailInfo
					name={lessonDetail.lessonName}
					content={lessonDetail.content}
					imageURL={lessonDetail.imageURL}
					createdBy={manager.firstName}
				/>
			)}
			<div className='w-1/2'>
				<div className='flex flex-col gap-2'>
					<WordTable words={words} />
					<ButtonCommon onClick={handleLearnWithFlashcard}>
						Learn with flascard
					</ButtonCommon>

					<ButtonCommon onClick={handleMockTest}>
						Mock test
					</ButtonCommon>
				</div>
			</div>
		</div>
	)
}

export default LessonDetailPage
