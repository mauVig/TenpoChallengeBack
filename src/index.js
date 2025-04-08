import express from 'express'
import cors from 'cors'
import { getMore, getStart } from './controllers/getData.js'


const app = express()
const port = 3000   

app.use(cors())
app.use(express.json())

// Este endpoint sirve para empezar a traer datos  de la api, al iniciar por primera vez el front end  
app.get('/start', getStart)

// Este endpoint sirve para ir trayendo de a poco datos, para no saturar el servidor y la api de datos.
// Se usa para ir cargando más datos a medida que el usuario va bajando por la página
app.get('/more', getMore)


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})