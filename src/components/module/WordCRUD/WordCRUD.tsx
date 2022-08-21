import { useCallback, useEffect, useState } from 'react'
import api from '../../../api/index.api'
import { word } from '../../../types/word'
import PaginationCommon from '../../common/PaginationCommon/PaginationCommon'
import CreateWordForm from './CreateWordForm/CreateWordForm'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { firebaseApp } from '../../../firebase'
import useModal from '../../../utils/useModal'
import { Modal } from '@mui/material'
import UpdateWordForm from './UpdateWordForm/UpdateWordForm'
import { message } from 'antd'

const WORD_PAGE_SIZE = 10

const WordCURD = () => {
	const [currentPage, setCurrentPage] = useState(1)
	const [total, setTotal] = useState(0)
	const [data, setData] = useState<word[]>([])
	const [selected, setSelected] = useState<word | undefined>()

	const find = useCallback(async () => {
		const res = await api.wordApi.getWords({
			pageSize: WORD_PAGE_SIZE,
			pageNum: currentPage - 1,
		})

		setTotal(res.total)
		setData(res.data || [])
	}, [currentPage])

	useEffect(() => {
		find()
	}, [currentPage, find])

	const {
		isOpen: isCreateFormOpen,
		handleOpen: openCreateForm,
		handleClose: closeCreateForm,
	} = useModal()

	const {
		isOpen: isUpdateFormOpen,
		handleOpen: openUpdateForm,
		handleClose: closeUpdateForm,
	} = useModal()

	const {
		isOpen: isDeleteFormOpen,
		handleOpen: openDeleteForm,
		handleClose: closeDeleteForm,
	} = useModal()

	const handleCreate = (data: any) => {
		const storage = getStorage(firebaseApp)
		const storageRef = ref(
			storage,
			`audio/${data.pronounciation.name + Date.now()}`
		)

		uploadBytes(storageRef, data.pronounciation).then(async (snapshot) => {
			const url = await getDownloadURL(snapshot.ref)
			const res = await api.wordApi.createWord({
				...data,
				pronounciation: url,
			})
			console.log(res)
			closeCreateForm()
			message.success('Created')
			find()
		})
	}

	const handelOpenUpdateForm = (word: word) => {
		setSelected(word)
		openUpdateForm()
	}

	const handleUpdate = (data: any) => {
		const storage = getStorage(firebaseApp)
		const storageRef = ref(
			storage,
			`audio/${data.pronounciation.name + Date.now()}`
		)

		uploadBytes(storageRef, data.pronounciation).then(async (snapshot) => {
			const url = await getDownloadURL(snapshot.ref)
			const res = await api.wordApi.updateWord({
				...data,
				pronounciation: url,
			})

			message.success('Updated')
			find()
			closeUpdateForm()
		})
	}

	const handleOpenDeleteForm = (word: word) => {
		setSelected(word)
		openDeleteForm()
	}

	const handleDelete = async () => {
		const res = await api.wordApi.deleteWord(selected?.id ?? 0)
		message.success('Deleted')
		find()
		closeDeleteForm()
	}

	return (
		<div className='u-page'>
			<h1 className='text-5xl font-bold text-center mb-4'>
				Manage words
			</h1>
			<Modal open={isCreateFormOpen} onClose={closeCreateForm}>
				<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-10 rounded-lg'>
					<CreateWordForm onCreate={handleCreate} />
				</div>
			</Modal>

			<Modal open={isUpdateFormOpen} onClose={closeUpdateForm}>
				<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-10 rounded-lg'>
					<UpdateWordForm
						onUpdate={handleUpdate}
						selected={selected}
					/>
				</div>
			</Modal>

			<Modal open={isDeleteFormOpen} onClose={closeDeleteForm}>
				<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-10 rounded-lg'>
					<span>Are you sure to delete</span>
					<div className='flex gap-2'>
						<button className='btn' onClick={closeDeleteForm}>
							No
						</button>
						<button
							className='btn btn-warning'
							onClick={handleDelete}
						>
							Yes
						</button>
					</div>
				</div>
			</Modal>

			<button className='btn btn-primary' onClick={openCreateForm}>
				Create
			</button>
			<table className='table w-full'>
				<thead>
					<tr>
						<th className='p-2'>#</th>
						<th>Word</th>
						<th>Definition</th>
						<th>Example</th>
						<th>Type</th>
						<th>Pronounciation</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{data.map((d, index) => {
						return (
							<tr key={d.id} className='text-center'>
								<td className='p-2'>{index + 1}</td>
								<td>{d.word}</td>
								<td>{d.definition}</td>
								<td>{d.example}</td>
								<td>{d.type}</td>
								<td>
									<audio
										src={d.pronounciation}
										controls
									></audio>
								</td>
								<td>
									{
										<div className='flex gap-2'>
											<button
												className='btn btn-warning'
												onClick={() =>
													handelOpenUpdateForm(d)
												}
											>
												Update
											</button>
											<button
												className='btn btn-error'
												onClick={() =>
													handleOpenDeleteForm(d)
												}
											>
												Delete
											</button>
										</div>
									}
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
			<PaginationCommon
				total={total}
				currentPage={currentPage}
				onChange={setCurrentPage}
				pageSize={WORD_PAGE_SIZE}
			/>
		</div>
	)
}

export default WordCURD
