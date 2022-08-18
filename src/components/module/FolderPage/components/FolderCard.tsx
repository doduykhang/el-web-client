import { Link } from 'react-router-dom'
import { Folder } from '../../../../types/folder'

const FolderCard: React.FC<{ folder: Folder; children?: React.ReactNode }> = ({
	children,
	folder: { name, id },
}) => {
	return (
		<div className='card w-96 bg-base-100 shadow-xl'>
			<div className='card-body'>
				<h2 className='card-title'>{name}</h2>
				<div className='flex justify-between'>
					<Link to={`/folder-detail/${id}`}>
						<button className='btn'>Detail</button>
					</Link>
					{children}
				</div>
			</div>
		</div>
	)
}
export default FolderCard
