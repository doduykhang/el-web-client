import { Modal } from '@mui/material'
import { useEffect, useState } from 'react'
import api from '../../../api/index.api'
import FolderCard from '../../module/FolderPage/components/FolderCard'
import ButtonCommon from '../ButtonCommon/ButtonCommon'

interface props {
	wordId: number
	isOpen: boolean
	onClose: () => void
}

interface FolderWithSave {
	id: number
	name: string
	saved: boolean
}

const SaveWordToFolderModal = ({ wordId, isOpen, onClose }: props) => {
	const [folders, setFolders] = useState<FolderWithSave[]>([])

	useEffect(() => {
		if (!isOpen || wordId === 0) return
		const findFolderithSave = async () => {
			const response = await api.folderApi.getFolderWithSave(wordId)
			setFolders(response || [])
		}
		findFolderithSave()
	}, [isOpen, wordId])

	const handleSaveWord = async (folderId: number) => {
		await api.folderApi.addWord({ folderID: +folderId, wordID: wordId })
		setFolders((old) => {
			return old.map((folder) => {
				if (folder.id === folderId) folder.saved = true
				return folder
			})
		})
	}

	const handleRemoveWord = async (folderId: number) => {
		await api.folderApi.removeWord({ folderID: folderId, wordID: wordId })
		setFolders((old) => {
			return old.map((folder) => {
				if (folder.id === folderId) folder.saved = false
				return folder
			})
		})
	}

	return (
		<>
			<Modal open={isOpen} onClose={onClose}>
				<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-10 rounded-lg'>
					{folders.map((folder) => (
						<FolderCard key={folder.id} folder={folder}>
							{!folder.saved ? (
								<ButtonCommon
									className='btn-success'
									onClick={() => handleSaveWord(folder.id)}
								>
									Save word
								</ButtonCommon>
							) : (
								<ButtonCommon
									className='btn-error'
									onClick={() => handleRemoveWord(folder.id)}
								>
									Remove word
								</ButtonCommon>
							)}
						</FolderCard>
					))}
				</div>
			</Modal>
		</>
	)
}
export default SaveWordToFolderModal
