import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import classNames from 'classnames'

const schema = yup
	.object({
		content: yup.string().required('content is required'),
		position: yup.number().required('position is required'),
	})
	.required()

interface form {
	content: string
	position: number
}

interface props {
	onCreate: (data: form) => void
}

const CreateOptionForm = ({ onCreate }: props) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<form>({
		resolver: yupResolver(schema),
	})

	const onSubmit = (data: form) => {
		onCreate({ ...data })
	}

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
				Create option
			</button>
		</form>
	)
}

export default CreateOptionForm
