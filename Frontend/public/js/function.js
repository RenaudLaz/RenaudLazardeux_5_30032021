//prix divisé par 100
function formatPrice(price)
{
    return (price / 100 ).toString() + ',00' + '€';
}

//récupération liste ourson en JSON
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

function fetchProduct(id)
{
    console.log('start fetchProduct');
    let apiProductListUrl = 'http://localhost:3000/api/teddies/' + id.toString();
    console.log('let fetchProduct');
    return fetch(apiProductListUrl)
    .then(response => response.json())
    .then(data =>
        {
            return data
        }
    )
    .catch(error => console.warn(error));
}

function renderBasketBadge ()
{
    let basketItemsData = getBasketItems();
    console.log(basketItemsData);
    document.getElementById('badge').innerHTML = basketItemsData.length;
}

//affiche le nombre dans le panier
renderBasketBadge();

//réinitialiser ourson localStorage
// localStorage.setItem('basketItems', null);
