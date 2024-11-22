import express, { NextFunction, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const router = express.Router()

const statusFlag = ['not started', 'in progress', 'done']

router.route('/cards').post(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, title, content, statusId, color } = req.body

    console.log(userId)

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    console.log(user)

    if (!user) {
      throw new Error('does not exist user')
    }

    await prisma.card.create({
      data: {
        title,
        content,
        userId,
        statusId,
        color,
      },
    })

    res.send({ message: 'success' })
  } catch (error) {
    next(error)
  }
})

router.get('/cards/:userId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = Number(req.params.userId)
    const result = []
    for (const statusId of [0, 1, 2]) {
      const cards = await prisma.card.findMany({
        where: {
          userId,
          statusId,
        },
      })
      result.push({ status: statusFlag[statusId], cards })
    }

    console.log(result)
    res.send(result)
  } catch (error) {
    next(error)
  }
})

router
  .route('/cards/:cardId')
  .delete(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cardId = Number(req.params.cardId)
      console.log('cardId', cardId)
      await prisma.card.delete({
        where: {
          id: cardId,
        },
      })

      res.send({ message: 'success' })
    } catch (error) {
      next(error)
    }
  })
  .put(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cardId = Number(req.params.cardId)
      const { userId, title, content, statusId } = req.body

      const card = await prisma.card.findUnique({
        where: {
          id: cardId,
        },
      })

      if (!card) {
        throw new Error('does not exist card')
      } else {
        if (card?.userId !== userId) {
          throw new Error('does not match user')
        }

        await prisma.card.update({
          where: {
            id: cardId,
          },
          data: {
            title,
            content,
            statusId,
          },
        })
  
        res.send({ message: 'success' })
      }
    } catch (error) {
      next(error)
    }
  })

router.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error.message)
  res.status(404).send(error.message ?? 'not found')
})

export default router
