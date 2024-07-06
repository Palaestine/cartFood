let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})


// لكل عنصر اوبجكت // وحطمناه ف اريي  //
let products = [
    {
        id: 1,
        name: 'PRODUCT1',
        image: '1.PNG',
        price: 220000
    },
    {
        id: 2,
        name: 'PRODUCT2',
        image: '2.PNG',
        price: 210000
    },
    {
        id: 3,
        name: 'PRODUCT3',
        image: '3.PNG',
        price: 240000
    },
    {
        id: 4,
        name: 'PRODUCT4',
        image: '4.PNG',
        price: 100000
    },
    {
        id: 5,
        name: 'PRODUCT5',
        image: '5.PNG',
        price: 130000
    },
    {
        id: 6,
        name: 'PRODUCT6',
        image: '6.PNG',
        price: 180000
    }
];



function initApp(){

    // عملنا دييف اسمها نيوو وحطينا جواها ايتم وهنحط كله جوه الايتم

    products.forEach((value, key) =>{ // هيمر علي كل اوبجكت
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="./img/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv); // هنضيف كله ف ليست
    })
}
initApp();

let listCards  = [];
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;

        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="./img/${value.image}"/></div>
                <div class="namee">${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
        
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}

