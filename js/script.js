// ----------------Carrito------------------

let carts = document.querySelectorAll('.add-cart');


let products = [
    {
        name: "Naruto Funko",
        tag: "narutofunko",
        price: 60,
        inCart: 0
    },
    
    {
        name: "Kurama Funko",
        tag: "kuramafunko",
        price: 30,
        inCart: 0
    },
    
    {
        name: "Sasuke Kid Funko",
        tag: "sasukekidfunko",
        price: 120,
        inCart: 0
    },

    {
        name: "Tobi Funko",
        tag: "tobifunko",
        price: 80,
        inCart: 0
    },

    {
        name: "Madara Funko",
        tag: "madarafunko",
        price: 80,
        inCart: 0
    },

    {
        name: "Itachi Funko",
        tag: "itachifunko",
        price: 80,
        inCart: 0
    },


    {
        name: "Jiraiya Funko",
        tag: "jiraiyafunko",
        price: 80,
        inCart: 0
    },

    {
        name: "Kaguya Funko",
        tag: "kaguyafunko",
        price: 100,
        inCart: 0
    },

    {
        name: "Kakashi Funko",
        tag: "kakashifunko",
        price: 50,
        inCart: 0
    },
    {
        name: "Tokyo Ghoul Tomo 1",
        tag: "tokyoghoul1",
        price: 20,
        inCart: 0
    },

    {
        name: "One Piece Tomo 1",
        tag: "onepiece1",
        price: 20,
        inCart: 0
    },

    {
        name: "Dragon Ball Super Tomo 1",
        tag: "dragonball1",
        price: 20,
        inCart: 0
    },
]


for (let i=0; i < carts.length; i++){
    carts[i].addEventListener('click', () =>{
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}



function onloadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}


function cartNumbers(product){
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers)
    if (productNumbers) {
       localStorage.setItem('cartNumbers', productNumbers + 1); 
       document.querySelector('.cart span').textContent = productNumbers + 1; 
    }
    else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product);
}


function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if (cartItems != null){
        
        if (cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart +=1;
    } 
    else{
        product.inCart = 1;   
        cartItems = {
            [product.tag]: product
        }
    }


    localStorage.setItem("productsInCart",  JSON.stringify (cartItems))
}

function totalCost(product){
    // console.log("precio de los productos", product.price);
    let cartCost = localStorage.getItem('totalCost');
    console.log('total cost', cartCost);
    console.log(typeof cartCost);

    if (cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    }
    else{
        localStorage.setItem('totalCost', product.price);
    }
   
}


function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');
    console.log(cartItems);
    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item =>{
                productContainer.innerHTML += `
                <div class="product">
                    <li class="close">
                    <i class="fa-solid fa-circle-xmark"></i> 
                    </li>
                    <img src="./assets/${item.tag}.png">
                    <span>${item.name}</span>
                </div> 
                <div class="precio">${item.price},00</div>
                <div class="cantidad">
                    <li class="increase"><i class="fa-solid fa-circle-arrow-left"></i></li>
                    <span>${item.inCart}</span>
                    <li class="decrease"><i class="fa-solid fa-circle-arrow-right"></i></li>
                </div>
                <div class="total">
                    $${item.inCart * item.price},00
                </div>
                `
                
        });


        productContainer.innerHTML += `
            <div class="totalCost">
            <h4 class="totalCostTitle">
                Total
            </h4>
            <h4 class="cartTotal">
                $${cartCost},00
            </h4>
            </div>
        `;    
      

    }
}


onloadCartNumbers();
displayCart();