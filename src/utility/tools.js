

//Esta función solamente existe para que pueda generar una lista de 2000 elementos pese a que la api solamente me brinda 404 elementos. 
export const bigList = ( data ) => {
    // const limit = 2000
    const limit = 2000
    const myData = data.concat(data).concat(data).concat(data).concat(data)
    return myData.slice(0,limit)
}


// fake token
export const fakeToken = () => {
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    return token
}