'use client'

import { deleteImage } from '../app/actions/delete-photo'
import AddImage from './AddImage'

type Props = {
  imageDetails: {
    id: number
    productId: number
    url: string
  }[]
  productId: number
}

export function ListAndDeleteImages({ imageDetails }: Props) {
  return (
    <div className="flex flex-col bg-zinc-400 p-12 rounded-xl shadow-lg mt-12">
      {imageDetails.length === 0 ? (
        <div>
          <h1 className="text-xl text-black">This product does not have any images.</h1>
          <AddImage productId={productId} url="" />
        </div>
      ) : (
        <>
          {imageDetails.map((image, index) => (
            <div key={index}>
              <img src={image.url} className="rounded-xl m-4 shadow-lg w-96" />
              <button
                onClick={() => {
                  deleteImage({ id: image.id, productId: image.productId })
                }}
                className="bg-red-600 ml-4 p-4 rounded-xl text-white hover:scale-105 transition-transform"
              >
                Delete image
              </button>
            </div>
          ))}
          <AddImage productId={1} url="" />
        </>
      )}
    </div>
  )
}

export default ListAndDeleteImages
