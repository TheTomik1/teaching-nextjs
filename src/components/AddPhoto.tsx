'use client'

import { useForm } from 'react-hook-form'

import { addPhoto } from '../app/actions/add-photo'
import { Button } from './ui/Button'

type AddPhotoProps = {
  productId: number
  url: string
}

export function AddPhoto({ productId }: { productId: number }) {
  const { register, handleSubmit } = useForm<AddPhotoProps>()

  const onSubmit = handleSubmit((data) => {
    addPhoto({ productId: productId, url: data.url })
  })

  return (
    <form onSubmit={onSubmit} className="mt-8 pl-4">
      <div>
        <label>Image url:</label>
      </div>
      <div className="mb-5">
        <input {...register('url')} className="p-1.5 rounded-xl bg-slate-200 focus:outline-none" />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white font-bold p-4 rounded-xl hover:scale-105 transition-transform"
      >
        Add Photo
      </button>
    </form>
  )
}

export default AddPhoto
