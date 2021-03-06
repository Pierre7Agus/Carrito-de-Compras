const templateCard = document.getElementById('template-card').content;
const templateCarrito = document.getElementById('template-carrito').content;
const templateFooter=document.getElementById('template-footer').content;
const items=document.getElementById('items');
const footer=document.getElementById('footer');
const cards = document.getElementById('cards');
const fragment = document.createDocumentFragment();

let carrito={};

cards.addEventListener('click', (e)=>{
    addProducts(e)
})
items.addEventListener('click',(e)=>{
  btnAction(e)
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
        setShopCar(product.parentElement)
    }
    e.stopPropagation()
}

const setShopCar=(parent)=>{
    const product={
        id:parent.querySelector('button').dataset.id,
        title:parent.querySelector('h5').textContent,
        precio:parent.querySelector('p').textContent,
        cantidad:1
    }
    if(carrito.hasOwnProperty(product.id)){
        product.cantidad=carrito[product.id].cantidad + 1;
    }
    carrito[product.id]={...product}
    showShopCar()
    showFooter()
}

const showShopCar=()=>{
  items.innerHTML=''
  Object.values(carrito).forEach(({id,title,cantidad,precio})=>{
    templateCarrito.querySelector('th').textContent=id
    templateCarrito.querySelectorAll('td')[0].textContent=title
    templateCarrito.querySelectorAll('td')[1].textContent=cantidad
    templateCarrito.querySelector('span').textContent=cantidad*precio
    templateCarrito.querySelector('.btn-info').dataset.id=id
    templateCarrito.querySelector('.btn-danger').dataset.id=id

    const clone=templateCarrito.cloneNode(true)
    fragment.appendChild(clone)
  })
  items.appendChild(fragment)
}

const btnAction=(e)=>{
  if(e.target.classList.contains('btn-info')){
    carrito[e.target.dataset.id].cantidad++
    carrito[e.target.dataset.id]=carrito[e.target.dataset.id]
  }
  if(e.target.classList.contains('btn-danger')){
    carrito[e.target.dataset.id].cantidad--
    carrito[e.target.dataset.id]=carrito[e.target.dataset.id]
    if(carrito[e.target.dataset.id].cantidad===0){
      delete carrito[e.target.dataset.id]
    }
  }
  showShopCar()
  showFooter()
  e.stopPropagation()
}

const showFooter=()=>{
  footer.innerHTML=''
  if(Object.values(carrito).length<=0){
    return footer.innerHTML=`<th scope="row" colspan="5">Carrito vac??o - comience a comprar!</th>`
  }
  const nCantidad=Object.values(carrito).reduce((acc,{cantidad})=>{
    return acc+cantidad
  },0)

  const nPrecio=Object.values(carrito).reduce((acc,{cantidad,precio})=>{
    return acc+(cantidad*precio)
  },0)

  templateFooter.querySelector('td').textContent=nCantidad
  templateFooter.querySelector('span').textContent=nPrecio

  const clone=templateFooter.cloneNode(true)
  fragment.appendChild(clone)
  footer.appendChild(fragment)

  const vaciarCarrito=document.getElementById('vaciar-carrito');
  vaciarCarrito.addEventListener('click',()=>{
    carrito={}
    showShopCar()
    showFooter()
  })
}
