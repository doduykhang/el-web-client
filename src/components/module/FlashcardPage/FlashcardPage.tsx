import { useEffect, useMemo, useState } from 'react'
import { word1, word2 } from '../../../data/words.data'
import { word } from '../../../types/word'
import { ButtonCommon, GobackButtonCommon, ProgressCommon } from '../../common'
import Flashcard from './components/Flashcard/Flashcard'

const FlashcardPage = () => {
	const [words, setWords] = useState<word[]>([])
	const [currentWordIndex, setCurrentWordIndex] = useState(-1)

	const [rightAnswerCount, setRightAnswerCount] = useState(0)
	const [wrongAnswersCount, setWrongAnswersCount] = useState(0)

	const [isCompleted, setIsCompleted] = useState(false)

	const getPercentage = () => {
		return ((rightAnswerCount + wrongAnswersCount) / words.length) * 100
	}

	useEffect(() => {
		setWords([word1, word2])
		setCurrentWordIndex(0)
	}, [])

	const handleAnswerRight = () => {
		if (currentWordIndex === words.length) return
		setRightAnswerCount((old) => old + 1)
		if (currentWordIndex === words.length - 1) {
			setIsCompleted(true)
			return
		}
		setCurrentWordIndex((old) => old + 1)
	}

	const handleAnswerWrong = () => {
		if (currentWordIndex === words.length) return
		setWrongAnswersCount((old) => old + 1)
		if (currentWordIndex === words.length - 1) {
			setIsCompleted(true)
			return
		}
		setCurrentWordIndex((old) => old + 1)
	}

	const currentWord = useMemo(
		() => words[currentWordIndex],
		[words, currentWordIndex]
	)

	return (
		<div className='u-page ring flex flex-col'>
			<div>
				<GobackButtonCommon title='Go back' link='link' />
			</div>
			<div className='flex justify-center pt-5 px-5'>
				<ProgressCommon progress={getPercentage()} />
			</div>
			<div className='flex justify-center items-center flex-1 '>
				{isCompleted && (
					<div className='text-2xl font-bold'>
						<span>
							Congratulation, you've just leanrned {words.length}{' '}
							words
						</span>
						<div className='flex gap-2 mt-2'>
							<ButtonCommon>Return to folder</ButtonCommon>
							<ButtonCommon>Learn again</ButtonCommon>
						</div>
					</div>
				)}
				{!isCompleted && currentWord && (
					<div className='w-80 flex flex-col gap-5'>
						<Flashcard
							word={currentWord.word}
							definition={currentWord.definition}
						/>
						<div className='flex gap-1 '>
							<ButtonCommon
								variant='error'
								onClick={handleAnswerWrong}
							>
								I dont't know
							</ButtonCommon>
							<ButtonCommon onClick={handleAnswerRight}>
								I know this
							</ButtonCommon>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default FlashcardPage
