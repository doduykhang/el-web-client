import classNames from 'classnames'
import React from 'react'

interface props {
	progress: number
	variant?: 'success' | 'error' | 'neutral'
}

const ProgressCommon: React.FC<props> = ({ progress, variant = 'success' }) => {
	return (
		<div className='w-full h-5 bg-gray-200 rounded-full'>
			<div
				className={classNames(
					'w-1/2 h-5 rounded-full px-2 transition-all duration-200',
					{
						'bg-orange-500': variant === 'neutral',
						'bg-green-500': variant === 'success',
						'bg-red-500': variant === 'error',
					}
				)}
				style={{
					width: `${Math.min(progress, 100)}%`,
				}}
			></div>
		</div>
	)
}

export default ProgressCommon
