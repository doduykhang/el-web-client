import { useAppDispatch, useAppSelector } from '../../../redux/hook'
import { onAnswer } from '../../../redux/test/testSlice'
import { ProgressCommon } from '../../common'
import Option from './components/Option'

const TestPage = () => {
	const {
		cards,
		currentWordIndex,
		options,
		rightAnswerCount,
		wrongAnswerCount,
		isCompleted,
	} = useAppSelector((state) => state.test)

	const dispatch = useAppDispatch()

	const handleSelectOption = (option: string) => {
		dispatch(onAnswer(option))
	}

	const getPercentage = () => {
		return ((rightAnswerCount + wrongAnswerCount) / cards.length) * 100
	}

	return (
		<div>
			<div className='flex justify-center pt-5 px-5'>
				<ProgressCommon progress={getPercentage()} />
			</div>
			{cards[currentWordIndex].definition}
			<ul>
				{options.map((option, index) => (
					<Option
						key={index}
						option={option}
						onSelect={handleSelectOption}
					/>
				))}
			</ul>
			{isCompleted && (
				<div>
					Completed: {rightAnswerCount} right, {wrongAnswerCount}{' '}
					wrong
				</div>
			)}
		</div>
	)
}

export default TestPage
