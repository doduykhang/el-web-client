import { useEffect, useState } from 'react'
import LessonCard from '../components/LessonCard/LessonCard'
import { SearchInputCommon } from '../../../common'
import { lesson } from '../../../../types/lesson'
import api from '../../../../api/index.api'
import PaginationCommon from '../../../common/PaginationCommon/PaginationCommon'

const LESSON_PAGE_SIZE = 15

const HomePage = () => {
	const [lessons, setLessons] = useState<lesson[]>([])
	const [total, setTotal] = useState(0)
	const [currentPage, setCurrentPage] = useState(1)
	const [searchText, setSearchText] = useState('')
	const [searchQuery, setSearchQuery] = useState('')

	useEffect(() => {
		const getLesson = async () => {
			const response = await api.lessonApi.getLessons({
				pageNum: currentPage - 1,
				pageSize: LESSON_PAGE_SIZE,
				name: searchQuery,
			})
			setLessons(response.data || [])
			setTotal(response.total)
		}
		getLesson()
	}, [currentPage, searchQuery])

	const handleSearch = (value: string) => {
		setCurrentPage(1)
		setSearchQuery(value)
	}

	return (
		<div className='p-3 flex justify-center'>
			<div className=''>
				<h1 className='text-5xl font-bold text-center mb-4'>Lessons</h1>
				<div className='mb-4 flex justify-end'>
					<SearchInputCommon
						value={searchText}
						onChange={setSearchText}
						onSubmit={handleSearch}
					/>
				</div>
				<div className='grid grid-cols-5 gap-4 justify-items-center '>
					{lessons.map((lesson) => (
						<div key={lesson.id}>
							<LessonCard
								key={lesson.id}
								id={lesson.id}
								title={lesson.lessonName}
								imageURL={lesson.imageURL}
							/>
						</div>
					))}
				</div>
				<div className='flex justify-center mt-2'>
					<PaginationCommon
						total={total}
						pageSize={LESSON_PAGE_SIZE}
						currentPage={currentPage}
						onChange={setCurrentPage}
					/>
				</div>
			</div>
		</div>
	)
}

export default HomePage
