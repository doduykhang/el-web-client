import React from 'react'
import classNames from 'classnames'

interface props {
	children: React.ReactNode
	variant?: 'error' | 'success'
	htmlType?: 'button' | 'submit'
	onClick?: () => void
	className?: string
}

const ButtonCommon: React.FC<props> = ({
	children,
	onClick,
	htmlType = 'button',
	className = '',
}) => {
	const handleClick = () => {
		onClick && onClick()
	}
	return (
		<button
			type={htmlType}
			onClick={handleClick}
			className={classNames('btn', className)}
		>
			{children}
		</button>
	)
}

export default ButtonCommon
