import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../../api/index.api'
import { setCard } from '../../../redux/card/cardSlice'
import { word } from '../../../types/word'
import { WordCard } from '../../common'

const FolderDetailPage = () => {
	const { id } = useParams()
	const [words, setWords] = useState<word[]>([])
	const dispatch = useDispatch()
	const navigate = useNavigate()

	useEffect(() => {
		const getWordOfFolder = async () => {
			const res = await api.folderApi.getWordOfFolder(id ? +id : 0)
			setWords(res || [])
		}
		getWordOfFolder()
	}, [id])

	const handleLearnWithFlashcard = () => {
		dispatch(setCard(words))
		navigate('/flashcard')
	}

	const handleRemoveFromFolder = async (wordID: number) => {
		await api.folderApi.removeWord({ folderID: id ? +id : 0, wordID })
		setWords((old) => {
			return old.filter((word) => word.id !== wordID)
		})
	}

	return (
		<div className='u-page'>
			<h1 className='text-2xl font-bold text-center'>Folder {id}</h1>
			<div className='flex justify-end'>
				<button
					className='btn btn-primary mr-20'
					onClick={handleLearnWithFlashcard}
				>
					Learn with flash card
				</button>
			</div>
			<div className='flex justify-center'>
				<div className='grid grid-cols-3 gap-2'>
					{words.map((word) => (
						<WordCard key={word.id} word={word}>
							<button
								className='btn btn-error'
								onClick={() => handleRemoveFromFolder(word.id)}
							>
								Remove from folder
							</button>
						</WordCard>
					))}
				</div>
			</div>
		</div>
	)
}

export default FolderDetailPage
