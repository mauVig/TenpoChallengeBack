import axios from 'axios'
import { bigList, fakeToken } from  '../utility/tools.js'

const api = 'https://www.freetogame.com/api/games'

let homeData = []

let myIndex = 0

// Esta función se encarga de traer los datos de la api y guardarlos en una variable global
export const getApidataAll = async () => {
    axios.get(api)
        .then(response => {
            const { data } = response

            //La función bigLis es para multiplicar a 2000 elementos, teniendo en cuenta que la api de freetogame solamente trae 404 elementos
            const myData = bigList(data)
            
            // La función reduce es para transformar el array de objetos en un array de objetos con solo los datos que necesitamos
            homeData = myData.reduce((acc, item) => {
                const { id, title, thumbnail, freetogame_profile_url } = item;
                acc.push({ id, title, thumbnail, freetogame_profile_url });
                return acc;
              }, []);
        })
        .catch(error => {
            console.error('Error fetching data:', error)

            res.status(500).json({ error: 'Failed to fetch data' })
        })
}

export const getStart = async (req, res) => {
    getApidataAll()
    .then(() => {
        // Acá se genera un token falso y se envía como header en la respuesta
        const token = fakeToken()
        res.header('token', token)
        // Acá lo que se hace es extraer los primeros 20 elementos de la lista 
        homeData = homeData.length >= 20 ? homeData.slice(0, 20) : homeData
        // Acá se guarda el último índice de los datos que se están enviando al front end
        myIndex = homeData.length - 1

        res.status(200).json({homeData, myIndex })
    })
    .catch(error => {
        console.error('Error fetching data:', error)
        res.status(500).json({ error: 'Failed to fetch data' })
    })
}

export const getMore = async (req, res) => {
    // Acá se genera un token falso y se envía como header en la respuesta
    const token = fakeToken()
    res.header('token', token)

    // Acá obtenemos el último índice a través de una query string, que se envía desde el front end
    const { lastIndex } = req.query

    // Y acá se hace el cálculo para ir extrayendo de a 10 elementos sobre el array global  de homeData  
    const start = parseInt(lastIndex) + 1
    const end = start + 10
    const data = homeData.slice(start, end)
    myIndex = end - 1

    res.status(200).json({homeData: data, myIndex })
}