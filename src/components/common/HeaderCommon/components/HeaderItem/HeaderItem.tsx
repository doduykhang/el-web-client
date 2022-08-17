import React from 'react'
import { Link } from 'react-router-dom'

interface props {
	icon: React.ReactNode
	title: string
	link: string
}

const HeaderItem = ({ icon, title, link }: props) => {
	return (
		<Link to={link}>
			<li className='list-none flex items-center text-gray-400 group cursor-pointer'>
				<span>{icon}</span>
				<span className='font-bold text-2xl group-hover:text-black'>
					{title}
				</span>
			</li>
		</Link>
	)
}

export default HeaderItem
