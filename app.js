const getInformation = async()=>{
    let data  = await fetch('./data/data.json')
    data = await data.json()
    console.log(data)

}
