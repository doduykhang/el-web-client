import { Alert, Snackbar } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import api from '../../../api/index.api'
import { AuthContext } from '../../../context/AuthContext'
import { word } from '../../../types/word'
import useModal from '../../../utils/useModal'
import PaginationCommon from '../../common/PaginationCommon/PaginationCommon'
import {
	ButtonCommon,
	SaveWordToFolderModal,
	SearchInputCommon,
	WordCard,
} from '../../common'

const WORD_PAGE_SIZE = 10

const SearchWordPage = () => {
	const [query, setQuery] = useState('')
	const [input, setInput] = useState('')
	const [total, setTotal] = useState(0)
	const [words, setWords] = useState<word[]>([])
	const [currentPage, setCurrentPage] = useState(1)
	const [selectedWord, setSelectedWord] = useState(0)
	const { auth } = useContext(AuthContext)
	const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
	const [isRemoveSnackbarOpen, setIsRemoveSnackbarOpen] = useState(false)
	const { isOpen, handleClose, handleOpen } = useModal()

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

	const handleOpenAddWordModal = (id: number) => {
		setSelectedWord(id)
		handleOpen()
	}

	return (
		<div className='u-page p-2'>
			<h1 className='text-5xl font-bold text-center mb-4'>
				Search words
			</h1>
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
								<>
									{auth.role === 'USER' && (
										<ButtonCommon
											onClick={() =>
												handleOpenAddWordModal(word.id)
											}
										>
											Add word to folder
										</ButtonCommon>
									)}
								</>
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
			<SaveWordToFolderModal
				isOpen={isOpen}
				onClose={handleClose}
				wordId={selectedWord}
			/>
		</div>
	)
}

export default SearchWordPage
