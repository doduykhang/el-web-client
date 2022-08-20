import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import classNames from 'classnames'
import { useState } from 'react'

const schema = yup
	.object({
		testName: yup.string().required('Name is required'),
		level: yup.number().required('level is required'),
		time: yup.number().required('time is required'),
	})
	.required()

interface form {
	testName: string
	level: number
	time: number
}

interface props {
	onCreate: (data: form) => void
}

const CreateTestForm = ({ onCreate }: props) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<form>({
		resolver: yupResolver(schema),
	})

	const onSubmit = (data: form) => {
		onCreate(data)
	}

	return (
		<form className='max-w-lg' onSubmit={handleSubmit(onSubmit)}>
			<div className='form-control'>
				<label className='label-text text-xl'>Name</label>
				<input
					className={classNames('input input-bordered', {
						'input-error': errors.testName,
					})}
					type='text'
					{...register('testName')}
				/>

				<label className='label-text text-xl text-error'>
					{errors.testName?.message}
				</label>
			</div>

			<div className='form-control'>
				<label className='label-text text-xl'>Time</label>
				<input
					className={classNames('input input-bordered', {
						'input-error': errors.time,
					})}
					type='text'
					{...register('time')}
				/>

				<label className='label-text text-xl text-error'>
					{errors.time?.message}
				</label>
			</div>

			<div className='form-control'>
				<label className='label-text text-xl'>Level</label>
				<input
					className={classNames('input input-bordered', {
						'input-error': errors.level,
					})}
					type='text'
					{...register('level')}
				/>

				<label className='label-text text-xl text-error'>
					{errors.level?.message}
				</label>
			</div>

			<button className='btn btn-primary' type='submit'>
				Create test
			</button>
		</form>
	)
}

export default CreateTestForm
