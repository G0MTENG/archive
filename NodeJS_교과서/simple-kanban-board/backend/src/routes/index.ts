import express, { Request, Response } from 'express'

const router = express.Router()

router.route('/').get((req: Request, res: Response) => {
  res.redirect('http://localhost:5173')
})

export default router
