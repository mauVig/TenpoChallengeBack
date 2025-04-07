import axios from 'axios'
import { bigList, fakeToken } from  '../utility/tools.js'

const api = 'https://www.freetogame.com/api/games'

let allData = []

let homeData = []

let myIndex = 0

export const getApidataAll = async () => {
    axios.get(api)
        .then(response => {
            const { data } = response
            const myData = bigList(data)
            allData = myData
            homeData = myData.reduce((acc, item) => {
                const { id, title, thumbnail } = item;
                acc.push({ id, title, thumbnail });
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
        const token = fakeToken()

        res.header('token', token)

        homeData = homeData.length >= 20 ? homeData.slice(0, 20) : homeData
        myIndex = homeData.length - 1

        res.status(200).json({homeData, myIndex })
    })
    .catch(error => {
        console.error('Error fetching data:', error)
        res.status(500).json({ error: 'Failed to fetch data' })
    })
}

export const getMore = async (req, res) => {
    const token = fakeToken()
    res.header('token', token)

    const { lastIndex } = req.query
    const start = parseInt(lastIndex) + 1
    const end = start + 10
    const data = allData.slice(start, end)
    myIndex = end - 1

    res.status(200).json({homeData: data, myIndex })
}