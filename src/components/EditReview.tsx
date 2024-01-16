import { useForm } from 'react-hook-form'

import { editReview } from '../app/actions/edit-review'

type EditReviewProps = {
  id: number
  rating: number
  content: string | null
  username: string
}

export function EditReview({ id, rating, content, username }: EditReviewProps) {
  const { register, handleSubmit } = useForm<EditReviewProps>({
    defaultValues: { rating: rating, content: content, username: username },
  })

  const onSubmit = handleSubmit((data) => {
    editReview({
      id: id,
      rating: data.rating,
      content: data.content,
      username: data.username,
    })
  })

  return (
    <div className="flex flex-col bg-zinc-400 p-12 w-1/3 rounded-xl shadow-lg m-12">
      <h1 className="text-3xl text-white mb-5">Edit comment.</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>Rating:</label>
        </div>
        <div className="mb-5">
          <input {...register('rating')} className="p-1.5 rounded-xl bg-slate-200 focus:outline-none " />
        </div>

        <div>
          <label>Content:</label>
        </div>
        <div className="mb-5">
          <input {...register('content')} className="p-1.5 rounded-xl bg-slate-200 focus:outline-none" />
        </div>

        <div>
          <label>Username:</label>
        </div>
        <div className="mb-5">
          <input {...register('username')} className="p-1.5 rounded-xl bg-slate-200 focus:outline-none" />
        </div>

        <input
          type="submit"
          className="p-2 rounded-xl text-white bg-blue-600 hover:bg-blue-500 transition ease-in-out"
        />
      </form>
    </div>
  )
}

export default EditReview
