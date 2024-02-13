'use client'

import { useState } from 'react'
import EditReview from './EditReview'
import { Button } from './ui/Button'

type ProductReviewProps = {
  id: number
  productId: number
  rating: number
  content: string | null
  username: string
}

export function ProductReview(props: ProductReviewProps) {
  const [editOpen, setEditOpen] = useState<boolean>(true)

  return (
    <div
      className="bg-gray-300 p-4 rounded-xl mt-12 cursor-pointer hover:scale-105 transition-transform"
      key={props.id}
    >
      {props.username} has commented "{props.content}" with {props.rating}/5 rating.
      <br />
      {editOpen ? (
        <Button
          children={'Edit'}
          className={'btn btn-info p-4 hover:scale-105 transition-transform'}
          onClick={() => {
            setEditOpen(!editOpen)
          }}
        ></Button>
      ) : (
        <>
          <EditReview id={props.id} rating={props.rating} content={props.content} username={props.username} />

          <Button
            children={'Create'}
            className={'btn btn-success p-4 hover:scale-105 transition-transform'}
            onClick={() => {
              setEditOpen(!editOpen)
            }}
          ></Button>
        </>
      )}
    </div>
  )
}
