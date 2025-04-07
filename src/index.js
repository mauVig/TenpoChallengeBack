import express from 'express'
import cors from 'cors'

import { getDataLimit } from './controllers/getData.js'


const app = express()
const port = 3000   

app.use(cors())
app.use(express.json())

app.get('/all', getDataLimit)


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})