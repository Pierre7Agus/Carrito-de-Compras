const templateCard = document.getElementById('template-card').content;
const cards = document.getElementById('cards');
const fragment = document.createDocumentFragment();

cards.addEventListener('click', (e)=>{
    addProducts(e)
})

const getInformation = async()=>{
    try{
        let data  = await fetch('./data/data.json')
        data = await data.json()
        paintCards(data)
    }catch(error){
        console.log(error)
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    getInformation()
})


const paintCards = (data) =>{
    data.forEach(element => {
        templateCard.querySelector('img').setAttribute('src',element.Url)
        templateCard.querySelector('img').setAttribute('alt',element.title)
        templateCard.querySelector('h5').textContent=element.title
        templateCard.querySelector('p').textContent=element.precio
        templateCard.querySelector('button').dataset.id=element.id

        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    });

    cards.appendChild(fragment)
}

const addProducts = (e)=>{
    const product = e.target
    if(product.classList.contains('btn-dark')){
        //setShoppingCar(product.parentElement)
    }
    e.stopPropagation()
}

