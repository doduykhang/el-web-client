import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import classNames from 'classnames'
import { useState } from 'react'

import { Editor } from 'react-draft-wysiwyg'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { convertToRaw, EditorState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'

const schema = yup
	.object({
		name: yup.string().required('Name is required'),
		description: yup.string().required('Description is required'),
	})
	.required()

interface form {
	name: string
	description: string
	content: string
	image: string
}

interface props {
	onCreate: (data: form) => void
}

const CreateLessonForm = ({ onCreate }: props) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<form>({
		resolver: yupResolver(schema),
	})
	const [file, setFile] = useState<any>()
	const [editor, setEditor] = useState(() => EditorState.createEmpty())
	const [contentError, setContentError] = useState('')
	const [imageError, setImageError] = useState('')

	const onSubmit = (data: form) => {
		if (!file) {
			setImageError('Image is required')
			return
		}
		setImageError('')

		const rawContentState = convertToRaw(editor.getCurrentContent())
		const markup = draftToHtml(rawContentState)
		onCreate({ ...data, content: markup, image: file })
	}

	return (
		<form
			className='max-w-lg max-h-96 overflow-y-auto'
			onSubmit={handleSubmit(onSubmit)}
		>
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

			<label className='label-text text-xl text-error'>
				{contentError}
			</label>

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

				<label className='label-text text-xl text-error'>
					{imageError}
				</label>
			</div>
			<button className='btn btn-primary' type='submit'>
				Create Lesson
			</button>
		</form>
	)
}

export default CreateLessonForm
