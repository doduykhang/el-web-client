import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import classNames from 'classnames'

const schema = yup
	.object({
		name: yup.string().required('Name is required'),
	})
	.required()

interface props {
	onCreateFolder: (data: { name: string }) => void
}

const CreateFolderForm = ({ onCreateFolder }: props) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<{ name: string }>({
		resolver: yupResolver(schema),
	})
	const onSubmit = (data: { name: string }) => {
		onCreateFolder(data)
	}
	return (
		<form className='max-w-lg' onSubmit={handleSubmit(onSubmit)}>
			<div className='form-control'>
				<label className='label-text text-xl'>Name</label>
				<input
					className={classNames('input input-bordered', {
						'input-error': errors.name,
					})}
					type='text'
					{...register('name', { required: true })}
				/>

				<label className='label-text text-xl text-error'>
					{errors.name?.message}
				</label>
			</div>
			<button className='btn btn-primary'>Create folder</button>
		</form>
	)
}

export default CreateFolderForm
