import express, { Express, Request, Response } from 'express'
import morgan from 'morgan'
import indexRouter from './routes'
import loginRouter from './routes/login'
import cardsRouter from './routes/cards'
import cors from 'cors'

const app: Express = express()
const port = 8080

app.use(
  cors({
    origin: 'http://localhost:5173',
  }),
)

app.use(morgan('dev'))
app.use(express.static('public'))
app.use(express.json())
app.use(indexRouter)
app.use(loginRouter)
app.use(cardsRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Typescript + Node.js + Express Server')
})

app.listen(port, async () => {
  console.log(`[server]: Server is running at <https://localhost>:${port}`)
})
