import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import classNames from 'classnames'
import { useState } from 'react'

const schema = yup
	.object({
		word: yup.string().required('Name is required'),
		definition: yup.string().required('Definition is required'),
		example: yup.string().required('Example is required'),
		type: yup.string().required('word type is required'),
	})
	.required()

interface form {
	word: string
	definition: string
	example: string
	type: string
	pronounciation: string
}

interface props {
	onCreate: (data: form) => void
}

const CreateWordForm = ({ onCreate }: props) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<form>({
		resolver: yupResolver(schema),
	})
	const [file, setFile] = useState<any>()

	const onSubmit = (data: form) => {
		onCreate({ ...data, pronounciation: file })
	}

	return (
		<form className='max-w-lg' onSubmit={handleSubmit(onSubmit)}>
			<div className='form-control'>
				<label className='label-text text-xl'>Word</label>
				<input
					className={classNames('input input-bordered', {
						'input-error': errors.word,
					})}
					type='text'
					{...register('word')}
				/>

				<label className='label-text text-xl text-error'>
					{errors.word?.message}
				</label>
			</div>

			<div className='form-control'>
				<label className='label-text text-xl'>Definition</label>
				<input
					className={classNames('input input-bordered', {
						'input-error': errors.word,
					})}
					type='text'
					{...register('definition')}
				/>

				<label className='label-text text-xl text-error'>
					{errors.definition?.message}
				</label>
			</div>

			<div className='form-control'>
				<label className='label-text text-xl'>Example</label>
				<input
					className={classNames('input input-bordered', {
						'input-error': errors.word,
					})}
					type='text'
					{...register('example')}
				/>

				<label className='label-text text-xl text-error'>
					{errors.example?.message}
				</label>
			</div>

			<div className='form-control'>
				<label className='label-text text-xl'>Type</label>
				<select
					className={classNames('input input-bordered', {
						'input-error': errors.word,
					})}
					{...register('type')}
				>
					<option value='Adjective'>Abjective</option>
					<option value='Noun'>Noun</option>
					<option value='Verb'>Verb</option>
				</select>

				<label className='label-text text-xl text-error'>
					{errors.type?.message}
				</label>
			</div>

			<div className='form-control'>
				<label className='label-text text-xl'>Audio</label>
				<input
					className={classNames('input input-bordered', {
						'input-error': errors.word,
					})}
					type='file'
					onChange={(e) =>
						setFile(e.target?.files ? e.target.files[0] : null)
					}
				/>
			</div>
			<button className='btn btn-primary' type='submit'>
				Create word
			</button>
		</form>
	)
}

export default CreateWordForm
