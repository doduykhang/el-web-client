import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import classNames from 'classnames'
import { useState } from 'react'

const schema = yup
	.object({
		content: yup.string(),
		quesitonType: yup.string(),
		answer: yup.string(),
	})
	.required()

interface form {
	content: string
	questionType: string
	answer: string
	audio: any
}

interface props {
	onCreate: (data: form) => void
}

const CreateQuestionForm = ({ onCreate }: props) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<form>({
		resolver: yupResolver(schema),
	})

	const [file, setFile] = useState<any>()
	const [type, setType] = useState('FILL')

	const onSubmit = (data: form) => {
		onCreate({ ...data, audio: file })
	}

	return (
		<form className='max-w-lg' onSubmit={handleSubmit(onSubmit)}>
			{type === 'AUDIO' ? (
				<div className='form-control'>
					<label className='label-text text-xl'>Name</label>
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
					<label className='label-text text-xl'>Name</label>
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
				Create quesiton
			</button>
		</form>
	)
}

export default CreateQuestionForm
