import fs from 'node:fs/promises'
import * as path from 'node:path'
import { migrationFolder } from '../../db/db-config'

const newEmptyMigrationFileContent = `\
import { sql, Kysely } from 'kysely'

export async function up(db: Kysely<unknown>): Promise<void> {
  await sql\`
  
  \`.execute(db)
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await sql\`
  
  \`.execute(db)
}
` as const

async function createNewMigrationFile() {
  const currentDate = new Date()
<<<<<<< HEAD
  const fileName = `${currentDate
    .toISOString()
    .replace(
      /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.\d+Z$/g,
      '$1$2$3$4$5$6'
    )}__new_migration_change_name_please.ts`
=======
  const fileName = `${currentDate.getFullYear()}${
    currentDate.getMonth() + 1
  }${currentDate.getDate()}${currentDate.getHours()}${currentDate.getMinutes()}${currentDate.getSeconds()}__new_migration_change_name_please.ts`
>>>>>>> b204ba936b99884518cb914c884327e7a3074d0d

  await fs.writeFile(path.join(migrationFolder, fileName), newEmptyMigrationFileContent)
}

createNewMigrationFile()
