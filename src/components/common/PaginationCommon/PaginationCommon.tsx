import { Pagination } from '@mui/material'
import { ChangeEvent, useMemo } from 'react'

interface props {
	total: number
	pageSize: number
	currentPage: number
	onChange: (page: number) => void
}

const PaginationCommon = ({
	total,
	pageSize,
	currentPage,
	onChange,
}: props) => {
	const onPageChange = (_: ChangeEvent<unknown>, page: number) => {
		onChange(page)
	}

	const totalPage = useMemo(() => {
		if (total <= 0) return 0
		return Math.ceil(total / pageSize)
	}, [total, pageSize])

	return (
		<Pagination
			count={totalPage}
			page={currentPage}
			onChange={onPageChange}
			shape='rounded'
		/>
	)
}

export default PaginationCommon
