import { message } from 'antd'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../../api/index.api'
import { AuthContext } from '../../../context/AuthContext'
import { ButtonCommon, InputCommon } from '../../common'

const ChangePasswordPage = () => {
	const [password, setPassword] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [confirmNewPassword, setConfirmNewPassword] = useState('')
	const { update } = useContext(AuthContext)

	let navigate = useNavigate()

	const changePassword = async (e: React.SyntheticEvent) => {
		e.preventDefault()
		if (newPassword !== confirmNewPassword) {
			message.error('Password does not match')
			return
		}
		try {
			await api.authApi.changePassword({
				oldPassword: password,
				newPassword,
			})
			const res = await api.authApi.getProfile()
			console.log(res)
			update({
				firstName: res.firstName,
				lastName: res.lastName,
				role: res.role,
			})
			navigate('/')
		} catch (err: any) {
			message.error('Wrong username or password')
		}
	}

	return (
		<div className='u-page flex flex-col justify-center items-center'>
			<h1 className='text-2xl font-bold'>Change password</h1>
			<form onSubmit={changePassword}>
				<div className='form-control'>
					<label>Old Password</label>
					<InputCommon
						type='password'
						value={password}
						onChange={setPassword}
					/>
				</div>

				<div className='form-control'>
					<label>New Password</label>
					<InputCommon
						type='password'
						value={newPassword}
						onChange={setNewPassword}
					/>
				</div>

				<div className='form-control'>
					<label>Confirm new password</label>
					<InputCommon
						type='password'
						value={confirmNewPassword}
						onChange={setConfirmNewPassword}
					/>
				</div>
				<div className='p-2' />
				<ButtonCommon htmlType='submit' className='btn-primary'>
					Change password
				</ButtonCommon>
			</form>
		</div>
	)
}

export default ChangePasswordPage
