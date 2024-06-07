// prisma/seed.ts

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Create users
  const user1 = await prisma.user.create({
    data: {
      email: 'user1@example.com',
      profile: {
        create: {
          bio: 'Bio for user 1',
        },
      },
      workouts: {
        create: [
          {
            name: 'Workout 1',
            date: new Date(),
            duration: 60,
            calories: 300,
            exercises: {
              create: [
                { name: 'Exercise 1', sets: 3, reps: 10, weight: 50 },
                { name: 'Exercise 2', sets: 3, reps: 15, weight: 40 },
              ],
            },
            logs: {
              create: [
                {
                  content: 'Log content 1',
                  date: new Date(),
                  loggableType: '',
                },
              ],
            },
          },
          {
            name: 'Workout 2',
            date: new Date(),
            duration: 45,
            calories: 250,
            exercises: {
              create: [
                { name: 'Exercise 3', sets: 4, reps: 12, weight: 45 },
                { name: 'Exercise 4', sets: 2, reps: 20, weight: 30 },
              ],
            },
            logs: {
              create: [
                {
                  content: 'Log content 2',
                  date: new Date(),
                  loggableType: '',
                },
              ],
            },
          },
        ],
      },
      achievements: {
        create: [
          { title: 'Achievement 1', date: new Date() },
          { title: 'Achievement 2', date: new Date() },
        ],
      },
    },
  })

  const user2 = await prisma.user.create({
    data: {
      email: 'user2@example.com',
      profile: {
        create: {
          bio: 'Bio for user 2',
        },
      },
      workouts: {
        create: [
          {
            name: 'Workout 3',
            date: new Date(),
            duration: 30,
            calories: 200,
            exercises: {
              create: [
                { name: 'Exercise 5', sets: 5, reps: 8, weight: 60 },
                { name: 'Exercise 6', sets: 3, reps: 12, weight: 50 },
              ],
            },
            logs: {
              create: [
                {
                  content: 'Log content 3',
                  date: new Date(),
                  loggableType: '',
                },
              ],
            },
          },
        ],
      },
      achievements: {
        create: [{ title: 'Achievement 3', date: new Date() }],
      },
    },
  })

  console.log({ user1, user2 })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
