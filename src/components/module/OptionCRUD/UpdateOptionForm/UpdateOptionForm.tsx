import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import classNames from 'classnames'
import { useEffect } from 'react'

const schema = yup
	.object({
		content: yup.string().required('content is required'),
		position: yup.number().required('position is required'),
	})
	.required()

interface form {
	id: number
	content: string
	position: number
}

interface props {
	onUpdate: (data: form) => void
	selected?: form
}

const UpdateOptionForm = ({ onUpdate, selected }: props) => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<form>({
		resolver: yupResolver(schema),
	})

	const onSubmit = (data: form) => {
		onUpdate({ ...data })
	}

	useEffect(() => {
		if (selected) {
			setValue('content', selected.content)
			setValue('id', selected.id)
			setValue('position', selected.position)
		}
	}, [selected])

	return (
		<form className='max-w-lg' onSubmit={handleSubmit(onSubmit)}>
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

			<div className='form-control'>
				<label className='label-text text-xl'>Position</label>
				<input
					className={classNames('input input-bordered', {
						'input-error': errors.position,
					})}
					type='text'
					{...register('position')}
				/>

				<label className='label-text text-xl text-error'>
					{errors.position?.message}
				</label>
			</div>

			<button className='btn btn-primary' type='submit'>
				Update option
			</button>
		</form>
	)
}

export default UpdateOptionForm
