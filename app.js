const getInformation = async()=>{
    try{
        let data  = await fetch('./data/data.json')
        data = await data.json()
        console.log(data)
    }catch(error){
        console.log(error)
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    getInformation()
})

