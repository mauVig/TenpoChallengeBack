import express from 'express'
import cors from 'cors'

import { getMore, getStart } from './controllers/getData.js'


const app = express()
const port = 3000   

app.use(cors())
app.use(express.json())

app.get('/start', getStart)

app.get('/more', getMore)


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})