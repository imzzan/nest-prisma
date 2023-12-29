/* eslint-disable prettier/prettier */
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    await prisma.listString.upsert({
        create: ['Muzani', 'Idra', 'Deni'],
        where: undefined,
        update: undefined
    })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })