'use client'

import { useState } from 'react'
import EditReview from './EditReview'

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
        <button
          className="bg-green-500 rounded-xl p-2 text-white"
          onClick={() => {
            setEditOpen(!editOpen)
          }}
        >
          Edit
        </button>
      ) : (
        <>
          <EditReview id={props.id} rating={props.rating} content={props.content} username={props.username} />
          <button
            className="bg-red-500 rounded-xl p-2 text-white"
            onClick={() => {
              setEditOpen(!editOpen)
            }}
          >
            Cancel
          </button>
        </>
      )}
    </div>
  )
}
