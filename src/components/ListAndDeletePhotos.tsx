'use client'

import { deletePhoto } from '../app/actions/delete-photo'
import AddImage from './AddPhoto'
import { Button } from './ui/Button'

type Props = {
  productId: number
  photoDetails: {
    id: number
    productId: number
    url: string
  }[]
}

export function ListAndDeletePhotos({ productId, photoDetails }: Props) {
  return (
    <div className="flex flex-col bg-zinc-400 p-12 rounded-xl shadow-lg mt-12">
      {photoDetails.length === 0 ? (
        <div>
          <h1 className="text-xl text-black">This product does not have any images.</h1>
          <AddImage productId={productId} />
        </div>
      ) : (
        <>
          {photoDetails.map((image, index) => (
            <div key={index}>
              <img src={image.url} className="rounded-xl m-4 shadow-lg w-96" />
              <div className="ml-4">
                <Button
                  children={'Delete image'}
                  className={'btn btn-error p-4 hover:scale-105 transition-transform'}
                  onClick={() => {
                    deletePhoto({ id: image.id, productId: image.productId })
                  }}
                ></Button>
              </div>
            </div>
          ))}
          <AddImage productId={productId} />
        </>
      )}
    </div>
  )
}

export default ListAndDeletePhotos
