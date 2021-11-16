const templateCard = document.getElementById('template-card').content;
const templateCarrito = document.getElementById('template-carrito');
const templateFooter=document.getElementById('template-footer');
const items=document.getElementById('items');
const footer=document.getElementById('footer');
const cards = document.getElementById('cards');
const fragment = document.createDocumentFragment();

let carrito={};

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

const setShopCar=(parent)=>{
    const product={
        id:parent.querySelector('button').dataset.id,
        title:parent.querySelector('p').textContent,
        precio:parent.querySelector('p').textContent,
        cantidad:1
    }
    if(carrito.hasOwnProperty(product.id)){
        product.cantidad=carrito[product.id].cantidad + 1;
    }
    carrito[product.id]={...product}
}
