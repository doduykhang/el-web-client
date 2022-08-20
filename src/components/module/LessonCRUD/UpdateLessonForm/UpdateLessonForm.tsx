import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import classNames from 'classnames'
import { useEffect, useState } from 'react'

import { Editor } from 'react-draft-wysiwyg'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import {
	ContentState,
	convertFromHTML,
	convertToRaw,
	EditorState,
} from 'draft-js'
import draftToHtml from 'draftjs-to-html'

const schema = yup
	.object({
		name: yup.string().required('Name is required'),
		description: yup.string().required('Description is required'),
	})
	.required()

interface form {
	id: number
	name: string
	description: string
	content: string
	image: string
}

interface selected {
	id: number
	lessonName: string
	description: string
	content: string
	imageURL: string
}

interface props {
	onUpdate: (data: form) => void
	selected?: selected
}

const UpdateLessonForm = ({ onUpdate, selected }: props) => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<form>({
		resolver: yupResolver(schema),
	})
	const [file, setFile] = useState<any>()
	const [editor, setEditor] = useState(() => EditorState.createEmpty())

	const onSubmit = (data: form) => {
		const rawContentState = convertToRaw(editor.getCurrentContent())
		const markup = draftToHtml(rawContentState)
		console.log(data)

		onUpdate({ ...data, content: markup, image: file })
	}

	useEffect(() => {
		if (selected) {
			setValue('id', selected.id)
			setValue('name', selected.lessonName)
			setValue('description', selected.description)

			const blocksFromHTML = convertFromHTML(selected.content)
			const state = ContentState.createFromBlockArray(
				blocksFromHTML.contentBlocks,
				blocksFromHTML.entityMap
			)
			setEditor(EditorState.createWithContent(state))
		}
	}, [selected])

	return (
		<form className='max-w-lg' onSubmit={handleSubmit(onSubmit)}>
			<div className='form-control'>
				<label className='label-text text-xl'>Name</label>
				<input
					className={classNames('input input-bordered', {
						'input-error': errors.name,
					})}
					type='text'
					{...register('name')}
				/>

				<label className='label-text text-xl text-error'>
					{errors.name?.message}
				</label>
			</div>

			<div className='form-control'>
				<label className='label-text text-xl'>Description</label>
				<input
					className={classNames('input input-bordered', {
						'input-error': errors.description,
					})}
					type='text'
					{...register('description')}
				/>

				<label className='label-text text-xl text-error'>
					{errors.description?.message}
				</label>
			</div>
			<Editor editorState={editor} onEditorStateChange={setEditor} />

			<div className='form-control'>
				<label className='label-text text-xl'>Image</label>
				<input
					className={classNames('input input-bordered', {
						'input-error': errors.image,
					})}
					type='file'
					onChange={(e) =>
						setFile(e.target?.files ? e.target.files[0] : null)
					}
				/>
			</div>
			<button className='btn btn-primary' type='submit'>
				Update Lesson
			</button>
		</form>
	)
}

export default UpdateLessonForm
