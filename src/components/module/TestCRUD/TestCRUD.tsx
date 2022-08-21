import { useCallback, useEffect, useState } from 'react'
import api from '../../../api/index.api'
import useModal from '../../../utils/useModal'
import { Modal } from '@mui/material'
import { Test } from '../../../types/test'
import { Link, useParams } from 'react-router-dom'
import CreateTestForm from './CreateTestForm/CreateTestForm'
import UpdateTestForm from './UpdateTestForm/UpdateTestForm'
import { lesson } from '../../../types/lesson'
import { GobackButtonCommon } from '../../common'
import { message } from 'antd'

const TestCRUD = () => {
	const [data, setData] = useState<Test[]>([])
	const [selected, setSelected] = useState<Test | undefined>()
	const [lesson, setLesson] = useState<lesson | undefined>()
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

	useEffect(() => {
		const getLesson = async () => {
			if (id) {
				const response = await api.lessonApi.getLessonDetail(+id)
				setLesson(response.lesson)
			}
		}
		getLesson()
	}, [id])

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
		try {
			if (id) {
				const res = await api.testApi.createTest({
					...data,
					lessonID: +id,
				})
				find()
				closeCreateForm()
				message.success('Created')
			}
		} catch (err: any) {
			message.error(err.message)
		}
	}

	const handelOpenUpdateForm = (word: Test) => {
		setSelected(word)
		openUpdateForm()
	}

	const handleUpdate = async (data: any) => {
		try {
			if (id) {
				const res = await api.testApi.updateTest({
					...data,
					lessonID: +id,
				})
				find()
				closeUpdateForm()
				message.success('Updated')
			}
		} catch (err: any) {
			closeUpdateForm()
			message.error(err.message)
		}
	}

	const handleOpenDeleteForm = (word: Test) => {
		setSelected(word)
		openDeleteForm()
	}

	const handleDelete = async () => {
		try {
			const res = await api.testApi.deleteTest(selected?.id ?? 0)
			find()
			closeDeleteForm()
			message.success('Deleted')
		} catch (err: any) {
			message.error('some thing went wrong')
		}
	}

	const handlePublish = async (id: number) => {
		try {
			const res = await api.testApi.publishTest(id)
			message.success('Test published')
			find()
		} catch (err: any) {
			message.error(err.message)
		}
	}

	const handleUnpublish = async (id: number) => {
		try {
			const res = await api.testApi.unpublishTest(id)
			message.success('Test unpublished')
			find()
		} catch (err: any) {
			message.error(err.message)
		}
	}

	return (
		<div className='u-page'>
			<GobackButtonCommon title='Go back' />
			<h1 className='text-5xl font-bold text-center mb-4'>
				Manage tests of {lesson?.lessonName}
			</h1>
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
											{!d.published && (
												<>
													<button
														className='btn btn-warning'
														onClick={() =>
															handelOpenUpdateForm(
																d
															)
														}
													>
														Update
													</button>
													<button
														className='btn btn-error'
														onClick={() =>
															handleOpenDeleteForm(
																d
															)
														}
													>
														Delete
													</button>
												</>
											)}

											<Link
												to={`/admin/questions/${d.id}`}
											>
												<button className='btn btn-success'>
													Question
												</button>
											</Link>
											{d.published ? (
												<button
													className='btn btn-success'
													onClick={() =>
														handleUnpublish(d.id)
													}
												>
													Unpublish
												</button>
											) : (
												<button
													className='btn btn-success'
													onClick={() =>
														handlePublish(d.id)
													}
												>
													Publish
												</button>
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

export default TestCRUD
