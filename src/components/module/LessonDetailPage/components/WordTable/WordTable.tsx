import { word } from '../../../../../types/word'

interface props {
	words: word[]
}
const WordTable = ({ words }: props) => {
	return (
		<table className='w-full rounded-md table-auto shadow-md'>
			<tr className='bg-green-400 text-white rounded-md'>
				<th className='p-2'>#</th>
				<th>Word</th>
				<th>Definition</th>
			</tr>
			{words.map((word, index) => {
				return (
					<tr key={word.id} className='text-center'>
						<td className='p-2'>{index + 1}</td>
						<td>{word.word}</td>
						<td>{word.definition}</td>
					</tr>
				)
			})}
		</table>
	)
}

export default WordTable
