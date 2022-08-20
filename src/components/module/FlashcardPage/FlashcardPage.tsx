import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	onAnswerRight,
	onAnswerWrong,
	onLearnAgain,
} from '../../../redux/card/cardSlice'
import { useAppDispatch, useAppSelector } from '../../../redux/hook'
import { ButtonCommon, GobackButtonCommon, ProgressCommon } from '../../common'
import Flashcard from './components/Flashcard/Flashcard'

const FlashcardPage = () => {
	const {
		cards,
		wrongAnswersCount,
		rightAnswerCount,
		isCompleted,
		currentWordIndex,
	} = useAppSelector((state) => state.card)

	const dispatch = useAppDispatch()

	const navigate = useNavigate()

	useEffect(() => {
		if (cards.length === 0) navigate('/')
	}, [])

	const getPercentage = () => {
		return ((rightAnswerCount + wrongAnswersCount) / cards.length) * 100
	}

	const currentWord = useMemo(
		() => cards[currentWordIndex],
		[cards, currentWordIndex]
	)

	const handleAnswerWrong = () => {
		dispatch(onAnswerWrong())
	}

	const handleAnswerRight = () => {
		dispatch(onAnswerRight())
	}

	const goBack = () => {
		navigate(-1)
	}

	const learnAgain = () => {
		dispatch(onLearnAgain())
	}

	return (
		<div className='u-page ring flex flex-col'>
			<div className='px-4 mt-2'>
				<GobackButtonCommon title='Go back' link='/' />
			</div>
			<div className='flex justify-center pt-5 px-5'>
				<ProgressCommon progress={getPercentage()} />
			</div>
			<div className='flex justify-center items-center flex-1 '>
				{isCompleted && (
					<div className='text-2xl font-bold'>
						<span>
							Congratulation, you've just leanrned {cards.length}{' '}
							words
						</span>
						<div className='flex gap-2 mt-2 justify-center'>
							<ButtonCommon onClick={goBack}>Return</ButtonCommon>
							<ButtonCommon
								onClick={learnAgain}
								className='btn-primary'
							>
								Learn again
							</ButtonCommon>
						</div>
					</div>
				)}
				{!isCompleted && currentWord && (
					<div className='w-80 flex flex-col gap-5'>
						<Flashcard
							word={currentWord.word}
							definition={currentWord.definition}
						/>
						<div className='flex gap-2 mt-2 justify-center'>
							<ButtonCommon
								onClick={handleAnswerWrong}
								className='btn-error'
							>
								I dont't know
							</ButtonCommon>
							<ButtonCommon
								onClick={handleAnswerRight}
								className='btn-success'
							>
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
