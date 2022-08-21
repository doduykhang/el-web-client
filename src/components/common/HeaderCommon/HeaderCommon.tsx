import { useContext, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../../api/index.api'
import { AuthContext } from '../../../context/AuthContext'
import {
	BookIcon,
	FolderIcon,
	TranslateIcon,
	PresentationChartIcon,
} from '../../../icons'
import HeaderItem from './components/HeaderItem/HeaderItem'

const HeaderCommon = () => {
	const { auth, update } = useContext(AuthContext)
	const navigate = useNavigate()

	const handleLogout = async () => {
		await api.authApi.logout()
		update({ lastName: '', firstName: '', role: '' })
		navigate('/')
	}

	const headerItems = useMemo(
		() => [
			{
				icon: <BookIcon className='header-icon' />,
				title: 'Lesson',
				link: '/',
				visible: auth.role !== 'ADMIN',
			},

			{
				icon: <TranslateIcon className='header-icon' />,
				title: 'Word',
				link: '/search-word',
				visible: auth.role !== 'ADMIN',
			},
			{
				icon: <FolderIcon className='header-icon' />,
				title: 'Folder',
				link: '/folder',
				visible: auth.role === 'USER',
			},
			{
				icon: <PresentationChartIcon className='header-icon' />,
				title: 'Statistic',
				link: '/history',
				visible: auth.role === 'USER',
			},

			{
				icon: <TranslateIcon className='header-icon' />,
				title: 'Words',
				link: '/admin/word',
				visible: auth.role === 'ADMIN',
			},

			{
				icon: <BookIcon className='header-icon' />,
				title: 'Lessons',
				link: '/admin/lesson',
				visible: auth.role === 'ADMIN',
			},
		],
		[auth]
	)
	return (
		<nav className='sticky w-screen h-20 border-b-2 top-0 bg-white flex justify-center z-20 items-center'>
			<ul className=' flex gap-2 items-center h-full w-1/2 justify-around ml-auto'>
				{headerItems.map((item, index) => (
					<HeaderItem
						key={index}
						icon={item.icon}
						title={item.title}
						link={item.link}
						visible={item.visible}
					/>
				))}
			</ul>
			{auth.role !== '' ? (
				<>
					<div className='avatar placeholder ml-auto'>
						<div className='bg-neutral-focus text-neutral-content rounded-full w-16 h-16'>
							<span className='text-3xl capitalize'>
								{auth.firstName.charAt(0)}
							</span>
						</div>
					</div>

					<button className='btn btn-primary' onClick={handleLogout}>
						Logout
					</button>
				</>
			) : (
				<div className='ml-auto flex gap-2'>
					<Link to='/register'>
						<button className='btn btn-primary'>Register</button>
					</Link>
					<Link to='/login'>
						<button className='btn btn-primary'>Login</button>
					</Link>
				</div>
			)}
		</nav>
	)
}

export default HeaderCommon
