import { useCallback, useEffect, useState } from 'react'
import api from '../../../api/index.api'
import useModal from '../../../utils/useModal'
import { Modal } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { Question } from '../../../types/questions'
import CreateQuestionForm from './CreateQuestionForm/CreateQuestionForm'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { firebaseApp } from '../../../firebase'
import UpdateQuestionForm from './UpdateQuestionForm/UpdateQuestionForm'

const QuestionCRUD = () => {
	const [data, setData] = useState<Question[]>([])
	const [selected, setSelected] = useState<Question | undefined>()
	const { id } = useParams()

	const find = useCallback(async () => {
		if (id) {
			const res = await api.testApi.getQuestions(id ? +id : 0)
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

		if (data.questionType === 'AUDIO') {
			const storage = getStorage(firebaseApp)
			const storageRef = ref(
				storage,
				`audio/${Date.now() + data.audio.name}`
			)

			uploadBytes(storageRef, data.audio).then(async (snapshot) => {
				const url = await getDownloadURL(snapshot.ref)
				const res = await api.questionApi.createQuestion({
					...data,
					content: url,
					testID: +id,
				})
				console.log(res)
				closeCreateForm()
				find()
			})
		} else {
			const res = await api.questionApi.createQuestion({
				...data,
				testID: +id,
			})
			find()
			closeCreateForm()
		}
	}

	const handelOpenUpdateForm = (word: Question) => {
		setSelected(word)
		openUpdateForm()
	}

	const handleUpdate = async (data: any) => {
		if (id) {
			const res = await api.questionApi.updateQuestion({
				...data,
				testID: +id,
			})
			find()
			closeUpdateForm()
		}
	}

	const handleOpenDeleteForm = (word: Question) => {
		setSelected(word)
		openDeleteForm()
	}

	const handleDelete = async () => {
		const res = await api.questionApi.deleteQuestion(selected?.id ?? 0)

		find()
		closeDeleteForm()
	}

	return (
		<div className='u-page'>
			<Modal open={isCreateFormOpen} onClose={closeCreateForm}>
				<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-10 rounded-lg'>
					<CreateQuestionForm onCreate={handleCreate} />
				</div>
			</Modal>

			<Modal open={isUpdateFormOpen} onClose={closeUpdateForm}>
				<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-10 rounded-lg'>
					<UpdateQuestionForm
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
						<th>Answer</th>
						<th>QuestionType</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{data.map((d, index) => {
						return (
							<tr key={d.id} className='text-center'>
								<td className='p-2'>{index + 1}</td>
								<td>
									{d.questionType === 'AUDIO' ? (
										<audio src={d.content} controls></audio>
									) : (
										d.content
									)}
								</td>
								<td>{d.answer}</td>
								<td>{d.questionType}</td>
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
											{d.questionType === 'CHOICE' && (
												<Link
													to={`/admin/options/${d.id}`}
												>
													<button className='btn btn-success'>
														Option
													</button>
												</Link>
											)}
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

export default QuestionCRUD
