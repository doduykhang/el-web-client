import React from 'react'
import classNames from 'classnames'

interface props {
	children: React.ReactNode
	variant?: 'error' | 'success'
	onClick?: () => void
}

const ButtonCommon: React.FC<props> = ({
	children,
	variant = 'success',
	onClick,
}) => {
	const handleClick = () => {
		onClick && onClick()
	}
	return (
		<button
			onClick={handleClick}
			className={classNames(
				'bg-green-500 rounded-full w-full border-b-4 border-green-600 px-2 h-10 text-white text-lg hover:brightness-90 active:border-b-0',
				{
					'bg-green-500 border-green-600': variant === 'success',
					'bg-red-500 border-red-600': variant === 'error',
				}
			)}
		>
			{children}
		</button>
	)
}

export default ButtonCommon
