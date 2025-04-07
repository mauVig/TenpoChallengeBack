import axios from 'axios'
import { bigList } from  '../utility/rizeArray.js'


const api = 'https://www.freetogame.com/api/games'


export const getDataLimit = async (req, res) => {
    axios.get(api)
        .then(response => {
            const { data } = response
            const myData = bigList(data)

            res.header('Access-Control-Allow-Origin', '*')
            res.status(200).send(myData)
        })
        .catch(error => {
            console.error('Error fetching data:', error)

            res.status(500).json({ error: 'Failed to fetch data' })
        })
}