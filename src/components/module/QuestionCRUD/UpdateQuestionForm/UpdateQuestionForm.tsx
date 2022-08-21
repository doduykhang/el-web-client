import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import classNames from 'classnames'
import { useEffect, useState } from 'react'

const schema = yup
	.object({
		content: yup.string(),
		quesitonType: yup.string(),
		answer: yup.string(),
	})
	.required()

interface selected {
	id: number
	content: string
	questionType: string
	answer: string
}

interface form {
	id: number
	content: string
	questionType: string
	answer: string
	audio: any
}

interface props {
	onUpdate: (data: form) => void
	selected?: selected
}

const UpdateQuestionForm = ({ onUpdate, selected }: props) => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<form>({
		resolver: yupResolver(schema),
	})

	const [file, setFile] = useState<any>()
	const [type, setType] = useState('FILL')

	const onSubmit = (data: form) => {
		onUpdate({ ...data, audio: file })
	}

	useEffect(() => {
		if (selected) {
			setValue('id', selected.id)
			setValue('content', selected.content)
			setValue('questionType', selected.questionType)
			setValue('answer', selected.answer)
			setType(selected.questionType)
		}
	}, [selected])

	return (
		<form className='max-w-lg' onSubmit={handleSubmit(onSubmit)}>
			{type === 'AUDIO' ? (
				<div className='form-control'>
					<label className='label-text text-xl'>Content</label>
					<input
						className={classNames('input input-bordered', {
							'input-error': errors.content,
						})}
						type='file'
						onChange={(e) =>
							setFile(e.target?.files ? e.target.files[0] : null)
						}
					/>

					<label className='label-text text-xl text-error'>
						{errors.content?.message}
					</label>
				</div>
			) : (
				<div className='form-control'>
					<label className='label-text text-xl'>Content</label>
					<input
						className={classNames('input input-bordered', {
							'input-error': errors.content,
						})}
						type='text'
						{...register('content')}
					/>

					<label className='label-text text-xl text-error'>
						{errors.content?.message}
					</label>
				</div>
			)}

			<div className='form-control'>
				<label className='label-text text-xl'>Question type</label>
				<select
					className={classNames('input input-bordered', {
						'input-error': errors.questionType,
					})}
					{...register('questionType')}
					onChange={(e) => setType(e.target.value)}
					disabled
				>
					<option value='FILL'>Fill</option>
					<option value='CHOICE'>Choice</option>
					<option value='AUDIO'>Audio</option>
				</select>

				<label className='label-text text-xl text-error'>
					{errors.questionType?.message}
				</label>
			</div>

			<div className='form-control'>
				<label className='label-text text-xl'>Answer</label>
				<input
					className={classNames('input input-bordered', {
						'input-error': errors.answer,
					})}
					type='text'
					{...register('answer')}
				/>

				<label className='label-text text-xl text-error'>
					{errors.answer?.message}
				</label>
			</div>

			<button className='btn btn-primary' type='submit'>
				Update quesiton
			</button>
		</form>
	)
}

export default UpdateQuestionForm
