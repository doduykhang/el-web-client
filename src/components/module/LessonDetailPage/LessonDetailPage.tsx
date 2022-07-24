import { useEffect, useState } from 'react'
import { lessonDetail1 } from '../../../data/lesson-detai.data'
import { word1, word2 } from '../../../data/words.data'
import LessonDetailInfo from './components/LessonDetailInfo/LessonDetailInfo'
import WordTable from './components/WordTable/WordTable'

const LessonDetailPage = () => {
	const [lessonDetail, setLessonDetail] = useState(lessonDetail1)
	const [words, setWords] = useState([word1, word2])
	useEffect(() => {
		setLessonDetail(lessonDetail1)
		setWords([word1, word2])
	}, [])
	return (
		<div className='px-20'>
			<LessonDetailInfo
				id={lessonDetail.id}
				title={lessonDetail.title}
				content={lessonDetail.content}
				imageUrl={lessonDetail.imageUrl}
				createdBy={lessonDetail.createdBy}
			/>
			<WordTable words={words} />
		</div>
	)
}

export default LessonDetailPage
