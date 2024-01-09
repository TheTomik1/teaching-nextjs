import { createDB } from '../../../lib/db'

import { NextResponse, NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const db = createDB()

  const products = await db.selectFrom('products').select(['id', 'name', 'price']).execute()

  await new Promise((resolve) => setTimeout(resolve, 1000))

  return NextResponse.json(products)
}
