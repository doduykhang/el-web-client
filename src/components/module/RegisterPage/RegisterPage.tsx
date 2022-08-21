import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import classNames from 'classnames'
import api from '../../../api/index.api'

const schema = yup
	.object({
		email: yup.string().required('Email is required'),
		password: yup.string().required('Password is required'),
		firstName: yup.string().required('first name required'),
		lastName: yup.string().required('last name is required'),
		gender: yup.boolean().required('gender is required'),
		dateOFBirth: yup.date().required('birth date is required'),
	})
	.required()

interface form {
	email: string
	password: string
	firstName: string
	lastName: string
	gender: boolean
	dateOFBirth: Date
}

interface props {}

const RegisterPage = ({}: props) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<form>({
		resolver: yupResolver(schema),
	})

	const onSubmit = async (data: form) => {
		try {
			await api.authApi.register({
				...data,
				dateOfBirth: data.dateOFBirth.toISOString(),
			})
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<form
			className='u-page flex flex-col justify-center items-center'
			onSubmit={handleSubmit(onSubmit)}
		>
			<h1 className='text-2xl font-bold'>Login</h1>
			<div className='form-control'>
				<label className='label-text text-xl'>Email</label>
				<input
					className={classNames('input input-bordered', {
						'input-error': errors.email,
					})}
					type='text'
					{...register('email')}
				/>

				<label className='label-text text-xl text-error'>
					{errors.email?.message}
				</label>
			</div>

			<div className='form-control'>
				<label className='label-text text-xl'>Password</label>
				<input
					className={classNames('input input-bordered', {
						'input-error': errors.password,
					})}
					type='password'
					{...register('password')}
				/>

				<label className='label-text text-xl text-error'>
					{errors.password?.message}
				</label>
			</div>

			<div className='form-control'>
				<label className='label-text text-xl'>First name</label>
				<input
					className={classNames('input input-bordered', {
						'input-error': errors.firstName,
					})}
					type='text'
					{...register('firstName')}
				/>

				<label className='label-text text-xl text-error'>
					{errors.firstName?.message}
				</label>
			</div>

			<div className='form-control'>
				<label className='label-text text-xl'>Last name</label>
				<input
					className={classNames('input input-bordered', {
						'input-error': errors.lastName,
					})}
					type='text'
					{...register('lastName')}
				/>

				<label className='label-text text-xl text-error'>
					{errors.lastName?.message}
				</label>
			</div>

			<div className='form-control'>
				<label className='label-text text-xl'>
					Gender (check if male)
				</label>
				<input
					className={classNames('input input-bordered', {
						'input-error': errors.gender,
					})}
					type='checkbox'
					{...register('gender')}
				/>

				<label className='label-text text-xl text-error'>
					{errors.gender?.message}
				</label>
			</div>

			<div className='form-control'>
				<label className='label-text text-xl'>Birth date</label>
				<input
					className={classNames('input input-bordered', {
						'input-error': errors.dateOFBirth,
					})}
					type='date'
					{...register('dateOFBirth')}
				/>

				<label className='label-text text-xl text-error'>
					{errors.dateOFBirth?.message}
				</label>
			</div>

			<button className='btn btn-primary' type='submit'>
				Register
			</button>
		</form>
	)
}

export default RegisterPage
