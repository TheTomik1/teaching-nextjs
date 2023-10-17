import { createDB } from '../../src/lib/db'
import { faker } from '@faker-js/faker'

async function seedDB() {
  console.log('Seeding database...')

  const db = createDB()

  await db.deleteFrom('productsReviews').execute()
  await db.deleteFrom('products').execute()

  let newData = []

  for (let i = 0; i < 100; i++) {
    newData.push({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.number.int(1000),
    })
  }

  const createdProducts = await db.insertInto('products').values(newData).returning('id').execute()
  for (const createdProduct of createdProducts) {
    await db
      .insertInto('productsReviews')
      .values([
        {
          productId: createdProduct.id,
          rating: faker.number.int(5),
          content: faker.lorem.paragraph(),
        },
      ])
      .execute()
  }

  console.log('Done')
}

seedDB()
