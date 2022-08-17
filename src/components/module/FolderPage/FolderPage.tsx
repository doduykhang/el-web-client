import { Modal } from '@mui/material'
import { useEffect, useState } from 'react'
import api from '../../../api/index.api'
import { Folder } from '../../../types/folder'
import { word } from '../../../types/word'
import useModal from '../../../utils/useModal'
import { WordCard } from '../../common'
import CreateFolderForm from './components/CreateFolderForm'
import FolderCard from './components/FolderCard'
import UpdateFolderForm from './components/UpdateFolderForm'

const FOLDER_PAGE_SIZE = 10

const FolderPage = () => {
	const [value, setValue] = useState('All')
	const [words, setWords] = useState<word[]>([])
	const [folders, setFolders] = useState<Folder[]>([])
	const [total, setTotal] = useState(0)
	const [selectedFolder, setSelectedFolder] = useState<Folder | undefined>()

	const { isOpen, handleClose, handleOpen } = useModal()

	const {
		isOpen: isUpdateModalOpen,
		handleClose: handleCloseUpdateModal,
		handleOpen: handleOpenUpdateModal,
	} = useModal()

	const {
		isOpen: isDeleteModalOpen,
		handleClose: closeDeleteModal,
		handleOpen: openDeleteModal,
	} = useModal()
	useEffect(() => {
		const findWord = async () => {
			if (value === 'All') {
				const words = await api.wordApi.getWordOfUser()
				setWords(words)
			}
		}
		findWord()
	}, [value])

	useEffect(() => {
		const getFolder = async () => {
			const res = await api.folderApi.getFolder({
				pageNum: 0,
				pageSize: FOLDER_PAGE_SIZE,
			})
			setFolders(res.data || [])
			setTotal(res.total)
		}
		getFolder()
	}, [value])

	const handleCreateFolder = async ({ name }: { name: string }) => {
		const res = await api.folderApi.createFolder({ name })
		setFolders((old) => [...old, { ...res }])
		handleClose()
	}

	const handleUpdateFolder = async ({ name }: { name: string }) => {
		await api.folderApi.updateFolder({
			id: selectedFolder?.id,
			name,
		})
		setFolders((old) => {
			return old.map((folder) => {
				if (folder.id === selectedFolder?.id) {
					folder.name = name
				}
				return folder
			})
		})
		handleCloseUpdateModal()
	}

	const handleDeleteFolder = async () => {
		await api.folderApi.deleteFolder(selectedFolder?.id ?? 0)
		setFolders((old) => {
			return old.filter((folder) => {
				return folder.id !== selectedFolder?.id
			})
		})
		closeDeleteModal()
	}

	const onOpenUpdateModal = (folder: Folder) => {
		setSelectedFolder(folder)
		handleOpenUpdateModal()
	}

	const onOpenDeleteModal = (folder: Folder) => {
		setSelectedFolder(folder)
		openDeleteModal()
	}

	return (
		<div>
			<div className='flex justify-center'>
				<select
					className='select select-bordered w-full max-w-xs'
					value={value}
					onChange={(e) => {
						setValue(e.target.value)
					}}
				>
					<option disabled selected>
						Folder
					</option>
					<option value='All'>All</option>
				</select>
			</div>

			<button className='btn btn-primary' onClick={handleOpen}>
				Create folder
			</button>
			<div className='flex justify-center'>
				<div className='grid grid-cols-3 gap-2'>
					{folders.map((folder) => (
						<FolderCard key={folder.id} folder={folder}>
							<div className='flex gap-2'>
								<button
									className='btn btn-warning'
									onClick={() => onOpenUpdateModal(folder)}
								>
									Edit
								</button>
								<button
									className='btn btn-error'
									onClick={() => onOpenDeleteModal(folder)}
								>
									Delete
								</button>
							</div>
						</FolderCard>
					))}
				</div>
			</div>
			<Modal open={isOpen} onClose={handleClose}>
				<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-10 rounded-lg'>
					<CreateFolderForm onCreateFolder={handleCreateFolder} />
				</div>
			</Modal>

			<Modal open={isUpdateModalOpen} onClose={handleCloseUpdateModal}>
				<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-10 rounded-lg'>
					{selectedFolder && (
						<UpdateFolderForm
							onUpdateFolder={handleUpdateFolder}
							folder={selectedFolder}
						/>
					)}
				</div>
			</Modal>

			<Modal open={isDeleteModalOpen} onClose={closeDeleteModal}>
				<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-10 rounded-lg'>
					<div>Are you sure to delete this folder</div>
					<div>
						<button className='btn' onClick={closeDeleteModal}>
							No
						</button>
						<button
							className='btn btn-error'
							onClick={handleDeleteFolder}
						>
							Yes
						</button>
					</div>
				</div>
			</Modal>
		</div>
	)
}

export default FolderPage
