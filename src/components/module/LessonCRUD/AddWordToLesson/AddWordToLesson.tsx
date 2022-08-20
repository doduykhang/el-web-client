import { useCallback, useEffect, useState } from 'react'
import api from '../../../../api/index.api'
import { word } from '../../../../types/word'
import { SearchInputCommon } from '../../../common'

interface props {
	lessonID: number
}
const AddWordToLesson = ({ lessonID }: props) => {
	const [savedWords, setSavedWords] = useState<word[]>([])
	const [searchInput, setSearchInput] = useState('')
	const [query, setQuery] = useState('')
	const [words, setWords] = useState<word[]>([])

	const findWord = useCallback(async () => {
		const reponse = await api.lessonApi.getWords(lessonID)
		setSavedWords(reponse || [])
	}, [lessonID])

	const handleSearch = () => {
		setQuery(searchInput)
	}

	useEffect(() => {
		findWord()
	}, [findWord])

	useEffect(() => {
		const getWord = async () => {
			const response = await api.wordApi.getWords({
				pageSize: 1000,
				pageNum: 0,
				word: query,
			})
			setWords(response.data || [])
		}
		if (query === '') return
		getWord()
	}, [query])

	const handleAddWord = async (wordID: number) => {
		const response = await api.lessonApi.addWord({ wordID, lessonID })
		findWord()
	}

	const handleRemoveWord = async (wordID: number) => {
		const response = await api.lessonApi.removeWord({ wordID, lessonID })
		findWord()
	}

	return (
		<div className='flex gap-4 w-[1000px]'>
			<table className='table flex-1'>
				<thead>
					<tr>
						<th className='p-2'>#</th>
						<th>Word</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{savedWords.map((d, index) => {
						return (
							<tr key={d.id} className='text-center'>
								<td className='p-2'>{index + 1}</td>
								<td>{d.word}</td>
								<td>
									{
										<div className='flex gap-2'>
											<button
												className='btn btn-warning'
												onClick={() =>
													handleRemoveWord(d.id)
												}
											>
												Remove
											</button>
										</div>
									}
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>

			<div className='h-[500px] overflow-y-auto'>
				<SearchInputCommon
					value={searchInput}
					onChange={setSearchInput}
					onSubmit={handleSearch}
				/>
				<table className='table w-full h-96'>
					<thead>
						<tr>
							<th className='p-2'>#</th>
							<th>Word</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{words.map((d, index) => {
							return (
								<tr key={d.id} className='text-center'>
									<td className='p-2'>{index + 1}</td>
									<td>{d.word}</td>
									<td>
										{
											<div className='flex gap-2'>
												<button
													disabled={
														savedWords.find(
															(sw) =>
																sw.id === d.id
														) !== undefined
													}
													className='btn btn-success'
													onClick={() =>
														handleAddWord(d.id)
													}
												>
													Add
												</button>
											</div>
										}
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		</div>
	)
}
export default AddWordToLesson
