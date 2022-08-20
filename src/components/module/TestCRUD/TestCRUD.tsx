import { useCallback, useEffect, useState } from 'react'
import api from '../../../api/index.api'
import PaginationCommon from '../../common/PaginationCommon/PaginationCommon'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { firebaseApp } from '../../../firebase'
import useModal from '../../../utils/useModal'
import { Modal } from '@mui/material'
import { Test } from '../../../types/test'
import { useParams } from 'react-router-dom'
import CreateTestForm from './CreateTestForm/CreateTestForm'
import UpdateTestForm from './UpdateTestForm/UpdateTestForm'

const WORD_PAGE_SIZE = 10

const TestCRUD = () => {
	const [data, setData] = useState<Test[]>([])
	const [selected, setSelected] = useState<Test | undefined>()
	const { id } = useParams()

	const find = useCallback(async () => {
		if (id) {
			const res = await api.lessonApi.getTest(id ? +id : 0)
			setData(res || [])
		}
	}, [id])

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

	const handleCreate = async (data: any) => {
		if (!id) return
		const res = await api.testApi.createTest({ ...data, lessonID: +id })
		find()
		closeCreateForm()
	}

	const handelOpenUpdateForm = (word: Test) => {
		setSelected(word)
		openUpdateForm()
	}

	const handleUpdate = async (data: any) => {
		if (id) {
			const res = await api.testApi.updateTest({ ...data, lessonID: +id })
			find()
			closeUpdateForm()
		}
	}

	const handleOpenDeleteForm = (word: Test) => {
		setSelected(word)
		openDeleteForm()
	}

	const handleDelete = async () => {
		const res = await api.testApi.deleteTest(selected?.id ?? 0)

		find()
		closeDeleteForm()
	}

	return (
		<div className='u-page'>
			<Modal open={isCreateFormOpen} onClose={closeCreateForm}>
				<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-10 rounded-lg'>
					<CreateTestForm onCreate={handleCreate} />
				</div>
			</Modal>

			<Modal open={isUpdateFormOpen} onClose={closeUpdateForm}>
				<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-10 rounded-lg'>
					<UpdateTestForm
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
						<th>Level</th>
						<th>Time</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{data.map((d, index) => {
						return (
							<tr key={d.id} className='text-center'>
								<td className='p-2'>{index + 1}</td>
								<td>{d.testName}</td>
								<td>{d.level}</td>
								<td>{d.time}</td>
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
		</div>
	)
}

export default TestCRUD
