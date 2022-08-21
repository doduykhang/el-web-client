import { useCallback, useEffect, useState } from 'react'
import api from '../../../api/index.api'
import useModal from '../../../utils/useModal'
import { Modal } from '@mui/material'
import { useParams } from 'react-router-dom'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { firebaseApp } from '../../../firebase'
import { Option } from '../../../types/option'
import CreateOptionForm from './CreateOptionForm/CreateOptionForm'
import UpdateOptionForm from './UpdateOptionForm/UpdateOptionForm'

const OptionCRUD = () => {
	const [data, setData] = useState<Option[]>([])
	const [selected, setSelected] = useState<Option | undefined>()
	const { id } = useParams()

	const find = useCallback(async () => {
		if (id) {
			const res = await api.questionApi.getOptions(+id)
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

		const res = await api.optionApi.createOption({
			...data,
			questionID: +id,
		})
		find()
		closeCreateForm()
	}

	const handelOpenUpdateForm = (word: Option) => {
		setSelected(word)
		openUpdateForm()
	}

	const handleUpdate = async (data: any) => {
		if (id) {
			const res = await api.optionApi.updateOption({
				...data,
				questionID: +id,
			})
			find()
			closeUpdateForm()
		}
	}

	const handleOpenDeleteForm = (word: Option) => {
		setSelected(word)
		openDeleteForm()
	}

	const handleDelete = async () => {
		const res = await api.optionApi.deleteOption(selected?.id ?? 0)

		find()
		closeDeleteForm()
	}

	return (
		<div className='u-page'>
			<Modal open={isCreateFormOpen} onClose={closeCreateForm}>
				<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-10 rounded-lg'>
					<CreateOptionForm onCreate={handleCreate} />
				</div>
			</Modal>

			<Modal open={isUpdateFormOpen} onClose={closeUpdateForm}>
				<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-10 rounded-lg'>
					<UpdateOptionForm
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
						<th>Content</th>
						<th>Position</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{data.map((d, index) => {
						return (
							<tr key={d.id} className='text-center'>
								<td className='p-2'>{index + 1}</td>
								<td>{d.content}</td>
								<td>{d.position}</td>
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

export default OptionCRUD
