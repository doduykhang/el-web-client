import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../../api/index.api'
import { AuthContext } from '../../../context/AuthContext'
import { setCard } from '../../../redux/card/cardSlice'
import { useAppDispatch } from '../../../redux/hook'
import { setTest } from '../../../redux/test/testSlice'
import { LessonDetail } from '../../../types/lesson-detail'
import { Manager } from '../../../types/manager'
import { Test } from '../../../types/test'
import { WordWithSave } from '../../../types/word'
import { ButtonCommon, WordCard } from '../../common'
import LessonDetailInfo from './components/LessonDetailInfo/LessonDetailInfo'
import TestCard from './components/TestCard/TestCard'

const LessonDetailPage = () => {
	const [lessonDetail, setLessonDetail] = useState<LessonDetail | null>(null)
	const [words, setWords] = useState<WordWithSave[]>([])
	const [manager, setManager] = useState<Manager | null>(null)
	const [tests, setTests] = useState<Test[]>([])
	const { auth } = useContext(AuthContext)

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
				setTests(response.tests || [])
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

	const saveWord = async (id: number) => {
		await api.wordApi.addWordToUser({ wordID: id })
		setWords((old) => {
			return old.map((word) => {
				if (word.id === id) word.saved = true
				return word
			})
		})
	}

	const removeWord = async (id: number) => {
		await api.wordApi.removeWordFromUser({ wordID: id })
		setWords((old) => {
			return old.map((word) => {
				if (word.id === id) word.saved = false
				return word
			})
		})
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
				<div className='flex flex-col items-center gap-2'>
					<div className='grid grid-cols-2 gap-2'>
						{words.map((word) => (
							<WordCard key={word.id} word={word}>
								{auth.role === 'USER' &&
									(!word.saved ? (
										<ButtonCommon
											onClick={() => saveWord(word.id)}
											className='btn-success'
										>
											Save word
										</ButtonCommon>
									) : (
										<ButtonCommon
											onClick={() => removeWord(word.id)}
											className='btn-error'
										>
											Remove word
										</ButtonCommon>
									))}
							</WordCard>
						))}
					</div>
					<button
						className='btn btn-primary'
						onClick={handleLearnWithFlashcard}
					>
						Learn with flascard
					</button>
				</div>
				<hr className='border-b-black border-b-2 my-2' />
				<h1 className='text-2xl mb-2 text-center'>Tests</h1>
				<div className='flex justify-center '>
					<div className='grid grid-cols-2 gap-2'>
						{tests.map((test) => (
							<TestCard
								key={test.id}
								id={test.id}
								testName={test.testName}
								time={test.time}
								level={test.level}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default LessonDetailPage
