import { Alert, Snackbar } from '@mui/material'
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
	const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
	const [isRemoveSnackbarOpen, setIsRemoveSnackbarOpen] = useState(false)

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
		}
		findWord()
	}, [currentPage, query])

	const saveWord = async (id: number) => {
		await api.wordApi.addWordToUser({ wordID: id })
		setWords((old) => {
			return old.map((word) => {
				if (word.id === id) word.saved = true
				return word
			})
		})

		setIsSnackbarOpen(true)
	}

	const removeWord = async (id: number) => {
		await api.wordApi.removeWordFromUser({ wordID: id })
		setWords((old) => {
			return old.map((word) => {
				if (word.id === id) word.saved = false
				return word
			})
		})

		setIsRemoveSnackbarOpen(true)
	}

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
								{auth.role === 'USER' &&
									(!word.saved ? (
										<ButtonCommon
											onClick={() => saveWord(word.id)}
										>
											Save word
										</ButtonCommon>
									) : (
										<ButtonCommon
											onClick={() => removeWord(word.id)}
											variant='error'
										>
											Remove word
										</ButtonCommon>
									))}
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
			<Snackbar
				open={isSnackbarOpen}
				autoHideDuration={6000}
				onClose={() => setIsSnackbarOpen(false)}
			>
				<Alert
					onClose={() => setIsSnackbarOpen(false)}
					severity='success'
				>
					Word saved
				</Alert>
			</Snackbar>

			<Snackbar
				open={isSnackbarOpen}
				autoHideDuration={6000}
				onClose={() => setIsRemoveSnackbarOpen(false)}
			>
				<Alert
					onClose={() => setIsRemoveSnackbarOpen(false)}
					severity='success'
				>
					Word removed
				</Alert>
			</Snackbar>
		</div>
	)
}

export default SearchWordPage
