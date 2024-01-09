import { createDB } from '../../../lib/db'

import { NextResponse, NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const db = createDB()
  const messages = await db.selectFrom('messages').select('content').execute()

  await new Promise((resolve) => setTimeout(resolve, 1000))

  return NextResponse.json(messages)
}
