import { useContext, useMemo } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import {
	BookIcon,
	FolderIcon,
	TranslateIcon,
	PresentationChartIcon,
} from '../../../icons'
import HeaderItem from './components/HeaderItem/HeaderItem'

const HeaderCommon = () => {
	const { auth } = useContext(AuthContext)

	const headerItems = useMemo(
		() => [
			{
				icon: <BookIcon className='header-icon' />,
				title: 'Lesson',
				link: '/',
			},

			{
				icon: <TranslateIcon className='header-icon' />,
				title: 'Word',
				link: '/search-word',
			},
			{
				icon: <FolderIcon className='header-icon' />,
				title: 'Folder',
				link: 'temp',
			},
			{
				icon: <PresentationChartIcon className='header-icon' />,
				title: 'Statistic',
				link: 'temp',
			},
		],
		[]
	)
	return (
		<nav className='sticky w-screen h-20 border-b-2 top-0 bg-white flex justify-center z-20 items-center'>
			<ul className=' flex gap-2 items-center h-full w-1/2 justify-between ml-auto'>
				{headerItems.map((item, index) => (
					<HeaderItem
						key={index}
						icon={item.icon}
						title={item.title}
						link={item.link}
					/>
				))}
			</ul>
			{auth.role === 'USER' && (
				<div className='avatar placeholder ml-auto'>
					<div className='bg-neutral-focus text-neutral-content rounded-full w-16 h-16'>
						<span className='text-3xl capitalize'>
							{auth.firstName.charAt(0)}
						</span>
					</div>
				</div>
			)}
		</nav>
	)
}

export default HeaderCommon
