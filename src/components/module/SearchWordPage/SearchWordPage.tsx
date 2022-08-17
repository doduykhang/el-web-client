import { Alert, Snackbar } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import api from '../../../api/index.api'
import { AuthContext } from '../../../context/AuthContext'
import { WordWithSave } from '../../../types/word'
import { ButtonCommon, SearchInputCommon, WordCard } from '../../common'
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
			const response = await api.wordApi.findWords({
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
			<div className='flex justify-center'>
				<div className='grid grid-cols-3 gap-2'>
					{words.map((word) => {
						return (
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
						)
					})}
				</div>
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
				open={isRemoveSnackbarOpen}
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
