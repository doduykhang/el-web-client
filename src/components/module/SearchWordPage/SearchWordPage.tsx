import { useContext, useEffect, useState } from 'react'
import api from '../../../api/index.api'
import { AuthContext } from '../../../context/AuthContext'
import { WordWithSave } from '../../../types/word'
import { ButtonCommon, SearchInputCommon } from '../../common'
import PaginationCommon from '../../common/PaginationCommon/PaginationCommon'

const WORD_PAGE_SIZE = 10

const SearchWordPage = () => {
	const [query, setQuery] = useState('')
	const [input, setInput] = useState('')
	const [total, setTotal] = useState(0)
	const [words, setWords] = useState<WordWithSave[]>([])
	const [currentPage, setCurrentPage] = useState(1)
	const { auth } = useContext(AuthContext)

	const handleSearchWord = async () => {
		setCurrentPage(1)
		setQuery(input)
	}

	useEffect(() => {
		const findWord = async () => {
			if (query === '') return
			const response = await api.wordApi.findWordsWithSave({
				pageNum: currentPage - 1,
				pageSize: WORD_PAGE_SIZE,
				word: query,
			})
			setTotal(response.total)
			setWords(response.data || [])
			console.log(response)
		}
		findWord()
	}, [currentPage, query])

	return (
		<div className='u-page p-2'>
			<div className='flex justify-center'>
				<SearchInputCommon
					value={input}
					onChange={setInput}
					onSubmit={handleSearchWord}
				/>
			</div>
			<div>
				{words.map((word) => {
					return (
						<div
							className='border-green border-2 mb-2 flex'
							key={word.id}
						>
							<div className='flex-1'>
								<h1>{word.word}</h1>
								<p>Definition: {word.definition}</p>
								<p>Example: {word.example}</p>
								<p>Type: {word.type}</p>
								<audio src={word.pronounciation} controls />
							</div>
							<div>
								{auth.role === 'USER' && !word.saved && (
									<ButtonCommon>Save word</ButtonCommon>
								)}
							</div>
						</div>
					)
				})}
			</div>
			<div className='flex justify-center'>
				{words.length > 0 && (
					<PaginationCommon
						total={total}
						pageSize={WORD_PAGE_SIZE}
						currentPage={currentPage}
						onChange={setCurrentPage}
					/>
				)}
			</div>
		</div>
	)
}

export default SearchWordPage
