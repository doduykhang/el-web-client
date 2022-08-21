import { useCallback, useEffect, useState } from 'react'
import api from '../../../api/index.api'
import PaginationCommon from '../../common/PaginationCommon/PaginationCommon'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { firebaseApp } from '../../../firebase'
import useModal from '../../../utils/useModal'
import { Modal } from '@mui/material'
import { lesson } from '../../../types/lesson'
import CreateLessonForm from './CreateLessonForm/CreateLessonForm'
import UpdateLessonForm from './UpdateLessonForm/UpdateLessonForm'
import AddWordToLesson from './AddWordToLesson/AddWordToLesson'
import { Link } from 'react-router-dom'
import { message } from 'antd'

const PAGE_SIZE = 10

const LessonCRUD = () => {
	const [currentPage, setCurrentPage] = useState(1)
	const [total, setTotal] = useState(0)
	const [data, setData] = useState<lesson[]>([])
	const [selected, setSelected] = useState<lesson | undefined>()

	const find = useCallback(async () => {
		const res = await api.lessonApi.getLessons({
			pageSize: PAGE_SIZE,
			pageNum: currentPage - 1,
		})
		setTotal(res.total)
		setData(res.data || [])
	}, [currentPage])

	useEffect(() => {
		find()
	}, [find])

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

	const {
		isOpen: isWordFormOpen,
		handleOpen: openWordForm,
		handleClose: closeWordForm,
	} = useModal()

	const handleCreate = (data: any) => {
		const storage = getStorage(firebaseApp)

		const storageRef = ref(storage, `${Date.now() + data.image.name}`)

		uploadBytes(storageRef, data.image).then(async (snapshot) => {
			const url = await getDownloadURL(snapshot.ref)
			const res = await api.lessonApi.createLesson({
				...data,
				imageURL: url,
			})
			message.success('created')
			closeCreateForm()
			find()
		})
	}

	const handelOpenUpdateForm = (s: lesson) => {
		setSelected(s)
		openUpdateForm()
	}

	const handleUpdate = async (data: any) => {
		if (data.image) {
			const storage = getStorage(firebaseApp)
			const storageRef = ref(storage, `${Date.now() + data.image.name}`)

			uploadBytes(storageRef, data.pronounciation).then(
				async (snapshot) => {
					const url = await getDownloadURL(snapshot.ref)
					const res = await api.lessonApi.updateLesson({
						...data,
						imageURL: url,
					})

					message.success('updated')
					find()
					closeUpdateForm()
				}
			)
		} else {
			const res = await api.lessonApi.updateLesson({
				...data,
				imageURL: selected?.imageURL,
			})

			message.success('updated')
			find()
			closeUpdateForm()
		}
	}

	const handleOpenDeleteForm = (s: lesson) => {
		setSelected(s)
		openDeleteForm()
	}

	const handleDelete = async () => {
		try {
			const res = await api.lessonApi.deleteLesson(selected?.id ?? 0)

			message.success('deleted')
			find()
			closeDeleteForm()
		} catch (err: any) {
			if (err.message.includes('tests_ibfk_2')) {
				closeDeleteForm()
				message.error('This lesson already have tests')
			}
		}
	}
	const handleOpenWordForm = (s: lesson) => {
		setSelected(s)
		openWordForm()
	}

	return (
		<div className='u-page'>
			<h1 className='text-5xl font-bold text-center mb-4'>
				Manage lessons
			</h1>
			<Modal open={isWordFormOpen} onClose={closeWordForm}>
				<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-10 rounded-lg'>
					{selected && <AddWordToLesson lessonID={selected.id} />}
				</div>
			</Modal>
			<Modal open={isCreateFormOpen} onClose={closeCreateForm}>
				<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-10 rounded-lg'>
					<CreateLessonForm onCreate={handleCreate} />
				</div>
			</Modal>
			<Modal open={isUpdateFormOpen} onClose={closeUpdateForm}>
				<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-10 rounded-lg h-1/2'>
					<UpdateLessonForm
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
						<th>Name</th>
						<th>Description</th>
						<th>Image</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{data.map((d, index) => {
						return (
							<tr key={d.id} className='text-center'>
								<td className='p-2'>{index + 1}</td>
								<td>{d.lessonName}</td>
								<td>{d.description}</td>
								<td>
									<img
										src={d.imageURL}
										alt=''
										className='w-40'
									/>
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

											<button
												className='btn btn-success'
												onClick={() =>
													handleOpenWordForm(d)
												}
											>
												Words
											</button>

											<Link to={`/admin/test/${d.id}`}>
												<button className='btn btn-success'>
													Tests
												</button>
											</Link>
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
				pageSize={PAGE_SIZE}
			/>
		</div>
	)
}

export default LessonCRUD
