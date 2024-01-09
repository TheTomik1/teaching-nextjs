'use client'

import { useForm } from 'react-hook-form'

import { editProduct } from '../app/actions/edit-product'

type FormData = {
  id: number
  name: string
  description: string
  price: number
}

export default function EditProduct({ id, name, description, price }: FormData) {
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: { name: name, description: description, price: price },
  })

  const onSubmit = handleSubmit((data) => {
    editProduct({ id: id, name: data.name, description: data.description, price: data.price })
  })

  return (
    <div className="flex flex-col bg-zinc-400 p-12 rounded-xl shadow-lg">
      <h1 className="text-3xl text-white mb-5">Edit product.</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>Name:</label>
        </div>
        <div className="mb-5">
          <input {...register('name')} className="p-1.5 rounded-xl bg-slate-200 focus:outline-none " />
        </div>

        <div>
          <label>Description:</label>
        </div>
        <div className="mb-5">
          <input {...register('description')} className="p-1.5 rounded-xl bg-slate-200 focus:outline-none" />
        </div>

        <div>
          <label>Price:</label>
        </div>
        <div className="mb-5">
          <input {...register('price')} className="p-1.5 rounded-xl bg-slate-200 focus:outline-none" />
        </div>

        <input
          type="submit"
          className="p-2 rounded-xl text-white bg-blue-600 hover:bg-blue-500 transition ease-in-out"
        />
      </form>
    </div>
  )
}
