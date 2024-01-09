'use client'

import { useForm } from 'react-hook-form'
import { createProductReview } from '../app/actions/create-product-review'

type FormData = {
  rating: number
  content: string
  username: string
}

type PageProps = {
  productId: number
}

export default function CreateProductReview(props: PageProps) {
  const { register, handleSubmit } = useForm<FormData>()

  const onSubmit = handleSubmit((data) => {
    createProductReview({ rating: data.rating, content: data.content, username: data.username }, props.productId)
  })

  return (
    <div className="flex flex-col bg-zinc-400 rounded-xl shadow-lg w-1/3 p-12 mt-12">
      <h1 className="text-3xl text-white mb-5">Create new review.</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>Rating:</label>
        </div>
        <div className="mb-5">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <div className={'flex items-center me-4'}>
                <label key={i} className={'ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'}>
                  <input
                    type="radio"
                    value={i + 1}
                    className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300"
                    {...register('rating')}
                    required={true}
                  />
                  {i + 1}
                </label>
              </div>
            ))}
          </div>
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
