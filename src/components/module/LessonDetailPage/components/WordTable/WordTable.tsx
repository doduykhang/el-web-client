import { word } from '../../../../../types/word'

interface props {
	words: word[]
}
const WordTable = ({ words }: props) => {
	return (
		<div>
			<h1 className='mb-2 text-2xl font-bold'>Vocabulary in lesson</h1>
			<table className='table w-full'>
				<thead>
					<tr>
						<th className='p-2'>#</th>
						<th>Word</th>
						<th>Definition</th>
					</tr>
				</thead>
				<tbody>
					{words.map((word, index) => {
						return (
							<tr key={word.id} className='text-center'>
								<td className='p-2'>{index + 1}</td>
								<td>{word.word}</td>
								<td>{word.definition}</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}

export default WordTable
