function formatPrice(price)
{
    return (price / 100 ).toString() + ',00' + '€';
}

function getBasketItems() 
{
    let basketItemsData = JSON.parse(localStorage.getItem('basketItems'));
    if (!basketItemsData) basketItemsData=[];
    return basketItemsData    
}


function addToBasket(id_num, color) 
{
    let item = {
        id:id_num,
        qty:1,
        color:color
    }

    let basketItemsData = getBasketItems();
    basketItemsData.push(item);
    localStorage.setItem('basketItems', JSON.stringify(basketItemsData))
    renderBasketBadge();
}

function fetchProduct(id){
    
    let apiProductListUrl = 'http://localhost:3000/api/teddies/' + id_num.toString();
    fetch(apiProductListUrl)
    .then(response => response.json())
    .then(data => {
        return data;
    })
}

function renderBasketBadge ()
{
    let basketItemsData = getBasketItems();
    console.log(basketItemsData);
    document.getElementById('badge').innerHTML = basketItemsData.length;
}

// localStorage.setItem('basketItems', null);

renderBasketBadge();