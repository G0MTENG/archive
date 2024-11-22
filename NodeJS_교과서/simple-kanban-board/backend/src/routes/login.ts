import express, { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const router = express.Router()

router
  .route('/login')
  .get(async (_, res: Response) => {
    const users = await prisma.user.findMany()
    res.send(users)
  })
  .post(async (req: Request, res: Response) => {
    console.log('/login logging')
    console.log('req.body', req.body)
    // 유저 정보가 있다면 로그인
    // 유저 정보가 없다면 회원가입
    try {
      const { username, password } = req.body
      if (!(username && password)) {
        throw new Error('invalid request')
      }

      const user = await prisma.user.findUnique({
        where: {
          username,
        },
      })

      // console.log(user)

      if (!user) {
        // 유저가 없다면 => 회원가입
        const user = await prisma.user.create({
          data: {
            username,
            password,
          },
        })
        res.send({ status: 'register', userId: user.id })
      } else {
        // 유저가 있다면 => 로그인 성공
        res.send({ status: 'login', userId: user.id })
      }
    } catch (error: any) {
      console.error(error.message)
      res.status(404).send('404 not found')
    }
  })

export default router
